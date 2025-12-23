import { NavLink, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  LayoutDashboard,
  Scan,
  Clock,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition
     ${isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"}`;

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } h-screen bg-gray-900 border-r border-gray-800 flex flex-col transition-all duration-300`}
    >
      {/* LOGO + COLLAPSE */}
      <div className="flex items-center justify-between px-4 py-5">
        <div className="flex items-center gap-2 text-blue-500 text-xl font-bold">
          <ShieldCheck />
          {!collapsed && "SecureScan"}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* NAV LINKS */}
      <nav className="flex flex-col gap-2 px-3 mt-2">
        <NavLink to="/dashboard" end className={linkClass}>
          <LayoutDashboard size={18} />
          {!collapsed && "Dashboard"}
        </NavLink>

        <NavLink to="/dashboard/scan" className={linkClass}>
          <Scan size={18} />
          {!collapsed && "Scan File"}
        </NavLink>

        <NavLink to="/dashboard/history" className={linkClass}>
          <Clock size={18} />
          {!collapsed && "Scan History"}
        </NavLink>
      </nav>

      {/* LOGOUT – ALWAYS AT BOTTOM */}
      <button
        onClick={logout}
        className="mt-auto flex items-center gap-3 px-6 py-4 text-red-400 hover:bg-gray-800"
      >
        <LogOut size={18} />
        {!collapsed && "Logout"}
      </button>
    </div>
  );
}
