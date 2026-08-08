import {
  FaHome,
  FaUpload,
  FaHistory,
  FaComments,
  FaChartPie,
  FaCog,
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { useState } from "react";

function Sidebar({
  active,
  setActive,
  darkMode,
  profile,
}) {
  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      id: "dashboard",
      icon: <FaHome />,
      label: "Dashboard",
    },
    {
      id: "upload",
      icon: <FaUpload />,
      label: "Upload Notes",
    },
    {
      id: "history",
      icon: <FaHistory />,
      label: "History",
    },
    {
      id: "chat",
      icon: <FaComments />,
      label: "AI Chat",
    },
    {
      id: "analytics",
      icon: <FaChartPie />,
      label: "Analytics",
    },
    {
      id: "settings",
      icon: <FaCog />,
      label: "Settings",
    },
  ];

  const handleMenuClick = (id) => {
    setActive(id);
    setOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-[60] bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl shadow-lg"
          aria-label="Open menu"
        >
          <FaBars size={20} />
        </button>
      )}

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky lg:top-0
          top-0 left-0
          h-screen
          w-72
          z-50
          transform
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          transition-transform duration-300
          shadow-xl
          flex flex-col
          justify-between
          flex-shrink-0
          ${
            darkMode
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-800"
          }
        `}
      >
        {/* Top Section */}
        <div className="overflow-y-auto">
          {/* Close Button */}
          <button
            className="lg:hidden absolute top-5 right-5 text-xl text-gray-500 hover:text-red-500"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>

          {/* Logo */}
          <div className="p-6 sm:p-8 border-b">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">
              StudyGen AI
            </h1>

            <p className="text-sm mt-2 text-gray-500">
              Intelligent Study Assistant
            </p>
          </div>

          {/* Menu */}
          <div className="mt-6 px-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl mb-3 transition-all duration-300 ${
                  active === item.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : darkMode
                    ? "hover:bg-gray-800"
                    : "hover:bg-blue-50"
                }`}
              >
                <span className="text-lg flex-shrink-0">
                  {item.icon}
                </span>

                <span className="font-medium">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* User */}
        <div
          className={`m-4 sm:m-5 rounded-2xl p-4 sm:p-5 ${
            darkMode ? "bg-gray-800" : "bg-blue-50"
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <FaUserCircle
              size={42}
              className="text-blue-600 flex-shrink-0"
            />

            <div className="min-w-0">
              <h3 className="font-semibold truncate">
                {profile?.fullName}
              </h3>

              <p className="text-sm text-gray-500 break-all">
                {profile?.email}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;