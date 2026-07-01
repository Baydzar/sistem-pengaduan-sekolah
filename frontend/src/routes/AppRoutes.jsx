import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "../components/common/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;