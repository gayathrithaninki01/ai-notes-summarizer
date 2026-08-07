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

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-5 left-5 z-50 bg-blue-600 text-white p-3 rounded-lg shadow-lg"
      >
        <FaBars />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static
        top-0 left-0
        h-screen
        w-72
        z-50
        transform
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        transition-transform duration-300
        shadow-xl
        flex flex-col
        justify-between
        ${
          darkMode
            ? "bg-gray-900 text-white"
            : "bg-white text-gray-800"
        }
      `}
      >
        {/* Close Button */}
        <button
          className="lg:hidden absolute top-5 right-5 text-2xl"
          onClick={() => setOpen(false)}
        >
          <FaTimes />
        </button>

        <div>
          {/* Logo */}

          <div className="p-8 border-b">
            <h1 className="text-3xl font-bold text-blue-600">
              StudyGen AI
            </h1>

            <p className="text-sm mt-2 text-gray-500">
              Intelligent Study Assistant
            </p>
          </div>

          {/* Menu */}

          <div className="mt-8 px-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActive(item.id);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl mb-3 transition-all duration-300 ${
                  active === item.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : darkMode
                    ? "hover:bg-gray-800"
                    : "hover:bg-blue-50"
                }`}
              >
                <span className="text-lg">
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
          className={`m-5 rounded-2xl p-5 ${
            darkMode
              ? "bg-gray-800"
              : "bg-blue-50"
          }`}
        >
          <div className="flex items-center gap-3">
            <FaUserCircle
              size={45}
              className="text-blue-600"
            />

            <div>
              <h3 className="font-semibold">
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