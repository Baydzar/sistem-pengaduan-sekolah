import { NavLink, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaClipboardList,
  FaList,
  FaSearch,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

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

    ...(user?.role === "admin"
      ? [
          {
            name: "Kategori",
            icon: <FaList />,
            path: "/kategori",
          },

          {
            name: "Pengguna",
            icon: <FaUsers />,
            path: "/users",
          },
        ]
      : []),

    {
      name: "Tracking",
      icon: <FaSearch />,
      path: "/tracking",
    },
  ];

  const handleLogout = () => {
    const yakin = window.confirm(
      "Yakin ingin logout?"
    );

    if (!yakin) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <aside className="w-64 bg-white shadow min-h-screen flex flex-col">

      {/* Logo */}
      <div className="p-5 font-bold text-blue-600 text-xl border-b">
        SIP Sekolah
      </div>

      {/* User Info */}
      <div className="p-4 border-b">
        <p className="font-semibold">
          {user?.nama}
        </p>

        <p className="text-sm text-gray-500 capitalize">
          {user?.role}
        </p>
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