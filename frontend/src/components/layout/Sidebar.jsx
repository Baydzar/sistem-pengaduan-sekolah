import { NavLink, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaClipboardList,
  FaList,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  const menu = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },
    {
      name: "Pengaduan",
      icon: <FaClipboardList />,
      path: "/pengaduan",
    },
    {
      name: "Kategori",
      icon: <FaList />,
      path: "/kategori",
    },
    {
      name: "Tracking",
      icon: <FaSearch />,
      path: "/tracking",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-white shadow min-h-screen flex flex-col">

      {/* Logo */}
      <div className="p-5 font-bold text-blue-600 text-xl border-b">
        SIP Sekolah
      </div>

      {/* Menu */}
      <ul className="flex-1">

        {menu.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-4 transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-100"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}

      </ul>

      {/* Logout */}
      <div className="border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-5 py-4 text-red-500 hover:bg-red-100"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;