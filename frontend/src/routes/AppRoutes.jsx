import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Pengaduan from "../pages/pengaduan/Pengaduan";
import TambahPengaduan from "../pages/pengaduan/TambahPengaduan";
import EditPengaduan from "../pages/pengaduan/EditPengaduan";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect awal */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Pengaduan */}
      <Route
        path="/pengaduan"
        element={
          <ProtectedRoute>
            <Pengaduan />
          </ProtectedRoute>
        }
      />

      {/* Tambah Pengaduan */}
      <Route
        path="/pengaduan/tambah"
        element={
          <ProtectedRoute>
            <TambahPengaduan />
          </ProtectedRoute>
        }
      />

      {/* Edit Pengaduan */}
      <Route
        path="/pengaduan/edit/:id"
        element={
          <ProtectedRoute>
            <EditPengaduan />
          </ProtectedRoute>
        }
      />

      {/* Jika URL tidak ditemukan */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;