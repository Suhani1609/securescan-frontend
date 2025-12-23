import { Outlet, useNavigate } from "react-router-dom";

export default function AppLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">
      
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-6 text-2xl font-bold text-blue-500">
          SecureScan
        </div>

        <button
          onClick={() => navigate("/app/scan")}
          className="px-6 py-3 text-left hover:bg-gray-800"
        >
          🛡 Scan File
        </button>

        <button
          onClick={() => navigate("/app/history")}
          className="px-6 py-3 text-left hover:bg-gray-800"
        >
          📜 Scan History
        </button>

        <div className="mt-auto p-6">
          <button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <Outlet />
      </div>
    </div>
  );
}
