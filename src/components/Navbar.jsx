import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-gray-900 border-b border-gray-800">
      <div
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-blue-500 text-xl font-bold cursor-pointer"
      >
        <ShieldCheck />
        SecureScan
      </div>

      <div className="flex gap-4">
        <button onClick={() => navigate("/scan")} className="hover:text-blue-400">
          Scan
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          className="bg-red-600 px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
