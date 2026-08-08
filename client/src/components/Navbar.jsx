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
      className={`w-full flex flex-col md:flex-row md:justify-between md:items-center gap-4 px-4 sm:px-6 py-4 sm:py-5 rounded-2xl shadow-lg mb-6 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      {/* Left */}
      <div className="text-center md:text-left w-full md:w-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">
          AI Notes Summarizer
        </h1>

        <p
          className={`text-xs sm:text-sm mt-1 ${
            darkMode ? "text-gray-300" : "text-gray-500"
          }`}
        >
          AI Powered Smart Learning Assistant
        </p>
      </div>

      {/* Right */}
      <div className="flex flex-wrap justify-center md:justify-end items-center gap-3 sm:gap-4 w-full md:w-auto">
        {/* User */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <FaUserCircle
            className="text-blue-600 flex-shrink-0"
            size={35}
          />

          <div className="min-w-0">
            <h3 className="font-semibold text-sm sm:text-base truncate max-w-[130px] sm:max-w-none">
              {profile?.fullName}
            </h3>

            <p
              className={`text-xs truncate max-w-[130px] sm:max-w-none ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {profile?.email}
            </p>
          </div>
        </div>

        {/* Theme */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-xl transition flex-shrink-0 ${
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
          className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-5 py-2 rounded-xl flex items-center gap-2 text-sm sm:text-base"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;