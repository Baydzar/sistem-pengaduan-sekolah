import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Pengaduan from "../pages/pengaduan/Pengaduan";
import TambahPengaduan from "../pages/pengaduan/TambahPengaduan";
import EditPengaduan from "../pages/pengaduan/EditPengaduan";
import NotFound from "../pages/NotFound";
import DetailPengaduan from "../pages/pengaduan/DetailPengaduan";
import Tracking from "../pages/tracking/Tracking";
import Kategori from "../pages/kategori/Kategori";
import TambahKategori from "../pages/kategori/TambahKategori";
import EditKategori from "../pages/kategori/EditKategori";
import User from "../pages/user/User";
import AdminRoute from "../components/common/AdminRoute";


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
      
        {/* Kategori */}
        <Route
        path="/kategori"
        element={
            <ProtectedRoute>
            <Kategori />
            </ProtectedRoute>
        }
        />

        <Route
        path="/kategori/tambah"
        element={
            <ProtectedRoute>
            <TambahKategori />
            </ProtectedRoute>
        }
        />

        <Route
        path="/kategori/edit/:id"
        element={
            <ProtectedRoute>
            <EditKategori />
            </ProtectedRoute>
        }
        />

      {/* Detail Pengaduan */}
      <Route
        path="/pengaduan/detail/:id"
        element={
          <ProtectedRoute>
            <DetailPengaduan />
          </ProtectedRoute>
        }
      />
      {/* Tracking */}
      <Route
        path="/tracking"
        element={
          <ProtectedRoute>
            <Tracking />
          </ProtectedRoute>
        }
      />
      
      {/* User (Admin Only) */}
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <User />
            </AdminRoute>
          </ProtectedRoute>
        }
      />

      {/* Jika URL tidak ditemukan */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;