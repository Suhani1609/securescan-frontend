import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

export default function Login({ navigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.access_token);
      toast.success("Login successful");
      navigate("/scan");
    } catch (err) {
        console.log(err.response?.data);
        toast.error(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="container">
      <h2>SecureScan Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
