import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const res = await API.post("/auth/login", { email, password });
        localStorage.setItem("token", res.data.access_token);
        toast.success("Welcome to SecureScan");
        navigate("/dashboard/scan");
      } else {
        await API.post("/auth/signup", { email, password });
        toast.success("Account created. Please login");
        setIsLogin(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.detail || "Action failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-[420px] p-8">
        
        <h1 className="text-3xl font-bold text-center mb-2 text-blue-500">
          SecureScan
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Malware Detection
        </p>

        <input
          className="w-full mb-3 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold"
        >
          {isLogin ? "Login" : "Create Account"}
        </button>

        <p className="text-center mt-5 text-gray-400">
          {isLogin ? "New user?" : "Already registered?"}
          <span
            className="text-blue-500 ml-1 cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
