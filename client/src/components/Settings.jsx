import {
  FaMoon,
  FaSun,
  FaTrash,
  FaDownload,
  FaInfoCircle,
} from "react-icons/fa";

function Settings({
  darkMode,
  setDarkMode,
  history,
  setHistory,
}) {
  const clearHistory = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all history?"
      )
    ) {
      setHistory([]);
      localStorage.removeItem("history");
    }
  };

  const exportHistory = () => {
    if (history.length === 0) {
      alert("No history available.");
      return;
    }

    const data = JSON.stringify(history, null, 2);

    const blob = new Blob([data], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "history.json";

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`rounded-2xl shadow-lg p-6 ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-white"
      }`}
    >
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        Settings
      </h2>

      {/* Theme */}

      <div className="flex justify-between items-center border-b pb-5">

        <div>
          <h3 className="font-semibold">
            Theme
          </h3>

          <p className="text-sm text-gray-500">
            Switch between Light and Dark Mode
          </p>
        </div>

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className={`px-5 py-2 rounded-xl text-white ${
            darkMode
              ? "bg-yellow-500"
              : "bg-gray-800"
          }`}
        >
          {darkMode ? (
            <>
              <FaSun className="inline mr-2" />
              Light
            </>
          ) : (
            <>
              <FaMoon className="inline mr-2" />
              Dark
            </>
          )}
        </button>

      </div>

      {/* Export */}

      <div className="flex justify-between items-center border-b py-5">

        <div>
          <h3 className="font-semibold">
            Export History
          </h3>

          <p className="text-sm text-gray-500">
            Download all generated summaries.
          </p>
        </div>

        <button
          onClick={exportHistory}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl"
        >
          <FaDownload className="inline mr-2" />
          Export
        </button>

      </div>

      {/* Clear */}

      <div className="flex justify-between items-center border-b py-5">

        <div>
          <h3 className="font-semibold">
            Clear History
          </h3>

          <p className="text-sm text-gray-500">
            Remove all stored summaries.
          </p>
        </div>

        <button
          onClick={clearHistory}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl"
        >
          <FaTrash className="inline mr-2" />
          Clear
        </button>

      </div>

      {/* About */}

      <div className="pt-5">

        <h3 className="font-semibold mb-3">
          About
        </h3>

        <div
          className={`rounded-xl p-4 ${
            darkMode
              ? "bg-gray-700"
              : "bg-blue-50"
          }`}
        >
          <FaInfoCircle className="inline text-blue-600 mr-2" />

          <strong>StudyGen AI</strong>

          <p className="mt-2 text-sm">
            Version 1.0.0
          </p>

          <p className="text-sm mt-2">
            AI-powered study assistant built
            using React, Node.js, Express,
            MongoDB and Groq AI.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Settings;