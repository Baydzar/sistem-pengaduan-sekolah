import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Pengaduan from "../pages/pengaduan/Pengaduan";
import TambahPengaduan from "../pages/pengaduan/TambahPengaduan";
import EditPengaduan from "../pages/pengaduan/EditPengaduan";
import DetailPengaduan from "../pages/pengaduan/DetailPengaduan";
import Tracking from "../pages/tracking/Tracking";
import Kategori from "../pages/kategori/Kategori";
import TambahKategori from "../pages/kategori/TambahKategori";
import EditKategori from "../pages/kategori/EditKategori";


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
    </Routes>
  );
};

export default AppRoutes;