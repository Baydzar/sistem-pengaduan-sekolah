import { LogOut, Menu, Moon, Sun } from "lucide-react";
import { useDarkMode } from "../hooks/useDarkMode";

export default function Navbar({ user, onLogout, onMenuClick }) {
  const { dark, toggleDark } = useDarkMode();

  return (
    <nav className="topbar">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="icon-btn md:hidden"
          aria-label="Buka navigasi"
        >
          <Menu size={18} />
        </button>
        <span className="brand-mark">LS</span>
        <h1 className="topbar-title truncate">LaporSekolah</h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleDark}
          className="icon-btn"
          aria-label="Ganti tema"
          title={dark ? "Tema terang" : "Tema gelap"}
        >
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <span className="topbar-user truncate">
          {user?.name} ({user?.role})
        </span>
        <button onClick={onLogout} className="btn btn-danger" title="Keluar">
          <LogOut size={16} />
          <span className="hidden sm:inline">Keluar</span>
        </button>
      </div>
    </nav>
  );
}
