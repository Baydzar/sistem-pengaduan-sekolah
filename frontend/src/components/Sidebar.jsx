import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Sidebar({ open, onClose }) {
  const { getUser } = useAuth();
  const user = getUser();

  const linkClass = ({ isActive }) =>
    `nav-link ${isActive ? "is-active" : ""}`;

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div onClick={onClose} className="fixed inset-0 bg-black/30 z-20 md:hidden" />
      )}
      {/* Sidebar: always visible on md+, togglable on mobile */}
      <aside
        className={`sidebar-panel
          fixed md:sticky top-0 left-0
          h-screen md:h-[calc(100vh-0px)]
          w-56 shrink-0 p-4 z-30
          transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="sidebar-brand">
          <span className="brand-mark">LS</span>
          <div>
            <p className="sidebar-title">LaporSekolah</p>
            <span className="sidebar-subtitle">{user?.role || "user"}</span>
          </div>
        </div>
        <nav className="flex flex-col gap-2" onClick={onClose}>
          <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
          <NavLink to="/pengaduan" end className={linkClass}>Daftar Pengaduan</NavLink>
          {user?.role === "siswa" && (
            <NavLink to="/pengaduan/tambah" className={linkClass}>Buat Pengaduan</NavLink>
          )}
          {(user?.role === "admin") && (
            <>
              <NavLink to="/pengguna" className={linkClass}>Kelola Pengguna</NavLink>
              <NavLink to="/kategori" className={linkClass}>Kelola Kategori</NavLink>
            </>
          )}
        </nav>
      </aside>
    </>
  );
}
