import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Auth from "./pages/Auth";
import Scan from "./pages/Scan";
import History from "./pages/History";
import DashboardHome from "./pages/DashboardHome";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" />

      <Routes>
        {/* Auth */}
        <Route path="/" element={<Auth />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* DEFAULT DASHBOARD PAGE */}
          <Route index element={<DashboardHome />} />

          <Route path="scan" element={<Scan />} />
          <Route path="history" element={<History />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
