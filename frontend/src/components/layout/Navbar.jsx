import { FaBell, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white h-16 flex items-center justify-between px-6 shadow">

      <h1 className="font-bold text-xl">
        Sistem Pengaduan Sekolah
      </h1>

      <div className="flex items-center gap-5">

        <FaBell size={20} />

        <FaUserCircle size={28} />

      </div>

    </nav>
  );
};

export default Navbar;