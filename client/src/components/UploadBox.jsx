import { FaFileUpload } from "react-icons/fa";

function UploadBox({
  darkMode,
  file,
  setFile,
  mode,
  setMode,
  handleUpload,
  loading,
}) {
  return (
    <div
      className={`rounded-2xl shadow-lg p-6 md:p-8 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        Upload Notes
      </h2>

      {/* Upload Area */}

      <label
        className={`border-2 border-dashed rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 ${
          darkMode
            ? "border-gray-600 hover:bg-gray-700"
            : "border-gray-300"
        }`}
      >
        <FaFileUpload
          size={55}
          className="text-blue-600 mb-4"
        />

        <h3 className="text-lg font-semibold text-center">
          Click to Upload PDF
        </h3>

        <p className="text-gray-500 text-sm mt-2 text-center">
          PDF Files Only (Maximum 10 MB)
        </p>

        <input
          type="file"
          accept=".pdf"
          hidden
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />
      </label>

      {/* Selected File */}

      {file && (
        <div
          className={`mt-5 rounded-xl p-4 ${
            darkMode
              ? "bg-gray-700"
              : "bg-green-50"
          }`}
        >
          <p className="text-green-600 font-semibold">
            Selected File
          </p>

          <p className="break-all mt-1">
            {file.name}
          </p>
        </div>
      )}

      {/* Study Mode */}

      <div className="mt-6">

        <label className="font-semibold block mb-2">
          Study Mode
        </label>

        <select
          value={mode}
          onChange={(e) =>
            setMode(e.target.value)
          }
          className="w-full border rounded-xl p-3 text-black"
        >
          <option value="summary">
            📖 Summary
          </option>

          <option value="exam">
            📝 Exam Preparation
          </option>

          <option value="viva">
            🎤 Viva Questions
          </option>

          <option value="mcq">
            ✅ MCQ Generator
          </option>

          <option value="flashcards">
            📚 Flashcards
          </option>

        </select>

      </div>

      {/* Upload Button */}

      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition disabled:opacity-50"
      >
        {loading
          ? "Generating AI Notes..."
          : "Generate AI Notes"}
      </button>

    </div>
  );
}

export default UploadBox;