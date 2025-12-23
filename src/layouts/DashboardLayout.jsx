// import { useState } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import { ShieldCheck, History, Scan, LogOut, Menu } from "lucide-react";

// export default function DashboardLayout() {
//   const [collapsed, setCollapsed] = useState(false);
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <div className="flex h-screen bg-gray-950 text-gray-100">

//       {/* SIDEBAR */}
//       <div
//         className={`${
//           collapsed ? "w-20" : "w-64"
//         } bg-gray-900 border-r border-gray-800 transition-all duration-300 flex flex-col`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-4">
//           <div className="flex items-center gap-2 text-blue-500 font-bold">
//             <ShieldCheck />
//             {!collapsed && <span>SecureScan</span>}
//           </div>
//           <Menu
//             className="cursor-pointer"
//             onClick={() => setCollapsed(!collapsed)}
//           />
//         </div>

//         {/* Menu */}
//         <nav className="flex-1 mt-6 space-y-2 px-3">
//           <button
//             onClick={() => navigate("/dashboard/scan")}
//             className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-800"
//           >
//             <Scan />
//             {!collapsed && "Scan File"}
//           </button>

//           <button
//             onClick={() => navigate("/dashboard/history")}
//             className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-800"
//           >
//             <History />
//             {!collapsed && "Scan History"}
//           </button>
//         </nav>

//         {/* Logout */}
//         <button
//           onClick={logout}
//           className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-800"
//         >
//           <LogOut />
//           {!collapsed && "Logout"}
//         </button>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="flex-1 overflow-y-auto p-8">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-950 min-h-screen p-8">
        <Outlet />
      </div>
    </div>
  );
}

