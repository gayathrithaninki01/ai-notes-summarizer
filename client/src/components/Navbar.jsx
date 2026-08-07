import {
  FaMoon,
  FaSun,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

function Navbar({
  darkMode,
  setDarkMode,
  profile,
  onLogout,
}) {
  return (
    <nav
      className={`flex flex-col md:flex-row md:justify-between md:items-center gap-5 px-6 py-5 rounded-2xl shadow-lg mb-8 ${
        darkMode
          ? "bg-gray-800"
          : "bg-white"
      }`}
    >
      {/* Left */}

      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
          AI Notes Summarizer
        </h1>

        <p
          className={`text-sm mt-1 ${
            darkMode
              ? "text-gray-300"
              : "text-gray-500"
          }`}
        >
          AI Powered Smart Learning Assistant
        </p>
      </div>

      {/* Right */}

      <div className="flex flex-wrap justify-center md:justify-end items-center gap-4">

        {/* User */}

        <div className="flex items-center gap-3">

          <FaUserCircle
            className="text-blue-600"
            size={40}
          />

          <div>

            <h3 className="font-semibold">
              {profile?.fullName}
            </h3>

            <p
              className={`text-xs ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              {profile?.email}
            </p>

          </div>

        </div>

        {/* Theme */}

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className={`p-3 rounded-xl transition ${
            darkMode
              ? "bg-yellow-400 text-black"
              : "bg-gray-800 text-white"
          }`}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* Logout */}

        <button
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl flex items-center gap-2"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;