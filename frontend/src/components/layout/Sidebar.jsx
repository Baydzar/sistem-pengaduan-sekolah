import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaClipboardList,
  FaList,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
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

  return (
    <aside className="w-64 bg-white shadow min-h-screen">

      <div className="p-5 font-bold text-blue-600 text-lg border-b">
        MENU
      </div>

      <ul>

        {menu.map((item) => (
          <li key={item.name}>

            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-4 hover:bg-blue-100 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700"
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>

          </li>
        ))}

      </ul>

      <div className="absolute bottom-0 w-64">

        <button className="w-full flex items-center gap-3 px-5 py-4 text-red-500 hover:bg-red-100">

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </aside>
  );
};

export default Sidebar;