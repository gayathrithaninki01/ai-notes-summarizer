import { useState, useEffect } from "react";
import axios from "axios";
import { FaFilePdf } from "react-icons/fa";
import { jsPDF } from "jspdf";
import { useDropzone } from "react-dropzone";

function App() {
  // Theme
  const [darkMode, setDarkMode] = useState(false);

  // File & AI
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  // Study Mode
  const [mode, setMode] = useState("summary");

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // History
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem("history")) || [];
    setHistory(savedHistory);
  }, []);

  // Drag & Drop
  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
      }
    },
  });

  // Upload PDF
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("mode", mode);

    try {
      setLoading(true);

      const res = await axios.post(
        "https://ai-notes-summarizer-backend-hih1.onrender.com",
        formData
      );

      setSummary(res.data.summary);

      const newHistory = [
        {
          fileName: file.name,
          summary: res.data.summary,
          date: new Date().toLocaleString(),
        },
        ...history,
      ].slice(0, 5);

      setHistory(newHistory);
      localStorage.setItem(
        "history",
        JSON.stringify(newHistory)
      );
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    } finally {
      setLoading(false);
    }
  };
    // Copy Summary
  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    alert("Summary copied!");
  };

  // Download PDF
  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("AI Notes Summary", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    const lines = doc.splitTextToSize(summary, 170);
    doc.text(lines, 20, 35);

    doc.save("AI_Notes_Summary.pdf");
  };

  // Reset
  const handleReset = () => {
    setFile(null);
    setSummary("");
    setSearchTerm("");
  };

  // Statistics
  const wordCount = summary
    ? summary.split(/\s+/).filter(Boolean).length
    : 0;

  const readingTime = Math.max(
    1,
    Math.ceil(wordCount / 200)
  );

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <div className="max-w-5xl mx-auto p-6">

        {/* Dark Mode Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-5 py-2 rounded-xl font-semibold transition ${
              darkMode
                ? "bg-yellow-400 text-black"
                : "bg-gray-800 text-white"
            }`}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-600 mb-10">
          📚 AI Notes Summarizer
        </h1>

        {/* Upload Box */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 shadow-lg ${
            darkMode
              ? isDragActive
                ? "border-blue-500 bg-gray-700"
                : "border-gray-600 bg-gray-800"
              : isDragActive
              ? "border-blue-600 bg-blue-100"
              : "border-gray-300 bg-white"
          }`}
        >
          <input {...getInputProps()} />

          <FaFilePdf className="text-red-500 text-6xl mx-auto mb-5" />

          {file ? (
            <>
              <p className="text-green-500 font-semibold text-lg">
                ✅ {file.name}
              </p>

              <p
                className={`mt-2 ${
                  darkMode
                    ? "text-gray-300"
                    : "text-gray-500"
                }`}
              >
                Click or drag another PDF to replace it
              </p>
            </>
          ) : isDragActive ? (
            <p className="text-blue-500 text-lg font-semibold">
              Drop your PDF here...
            </p>
          ) : (
            <>
              <p className="text-lg font-semibold">
                Drag & Drop your PDF here
              </p>

              <p
                className={`mt-2 ${
                  darkMode
                    ? "text-gray-300"
                    : "text-gray-500"
                }`}
              >
                or click to browse
              </p>
            </>
          )}
        </div>
                {/* Study Mode */}
        <div className="text-center mt-8">

          <label className="font-semibold text-lg">
            📖 Choose Study Mode
          </label>

          <br />

          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className={`mt-4 px-5 py-3 rounded-xl border shadow-md ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
          >
            <option value="summary">📖 Summary</option>
            <option value="exam">📝 Exam Preparation</option>
            <option value="viva">🎤 Viva Questions</option>
            <option value="mcq">✅ MCQ Generator</option>
            <option value="flashcards">🧠 Flashcards</option>
          </select>

          <br />

          <button
            onClick={handleUpload}
            disabled={loading}
            className={`mt-6 px-8 py-3 rounded-xl text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Generating..." : "🚀 Generate"}
          </button>

        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center mt-8">
            <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-blue-600 mx-auto"></div>

            <p className="mt-4 text-lg font-semibold">
              🤖 AI is analyzing your notes...
            </p>
          </div>
        )}

        {/* Summary */}
        {summary && (
          <div
            className={`mt-10 rounded-2xl p-6 shadow-xl ${
              darkMode
                ? "bg-gray-800"
                : "bg-white"
            }`}
          >

            <h2 className="text-3xl font-bold mb-6">
              🤖 AI Summary
            </h2>

            {/* Search */}
            <input
              type="text"
              placeholder="🔍 Search in summary..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className={`w-full p-3 rounded-xl border mb-5 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300"
              }`}
            />

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mb-5">

              <button
                onClick={handleCopy}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl"
              >
                📋 Copy
              </button>

              <button
                onClick={handleDownload}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl"
              >
                📥 Download PDF
              </button>

              <button
                onClick={handleReset}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl"
              >
                🔄 Reset
              </button>

            </div>

            {/* Statistics */}
            <div className="flex flex-wrap gap-6 mb-6 font-semibold">
              <span>📊 Words: {wordCount}</span>
              <span>⏱ Reading Time: {readingTime} min</span>
            </div>
                        {/* Summary Text */}
            <div
              className={`rounded-xl p-5 whitespace-pre-wrap leading-8 ${
                darkMode
                  ? "bg-gray-900"
                  : "bg-gray-100"
              }`}
            >
              {searchTerm ? (
                summary
                  .split(
                    new RegExp(`(${searchTerm})`, "gi")
                  )
                  .map((part, index) =>
                    part.toLowerCase() ===
                    searchTerm.toLowerCase() ? (
                      <mark
                        key={index}
                        className="bg-yellow-300 text-black px-1 rounded"
                      >
                        {part}
                      </mark>
                    ) : (
                      part
                    )
                  )
              ) : (
                summary
              )}
            </div>

          </div>
        )}

        {/* Recent History */}
        {history.length > 0 && (
          <div
            className={`mt-10 rounded-2xl p-6 shadow-xl ${
              darkMode
                ? "bg-gray-800"
                : "bg-white"
            }`}
          >
            <h2 className="text-2xl font-bold mb-5">
              🕘 Recent History
            </h2>

            <div className="space-y-4">
              {history.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl ${
                    darkMode
                      ? "bg-gray-700"
                      : "bg-gray-100"
                  }`}
                >
                  <p className="font-bold">
                    📄 {item.fileName}
                  </p>

                  <p className="text-sm text-gray-500">
                    {item.date}
                  </p>

                  <p className="mt-2 line-clamp-3">
                    {item.summary.substring(0, 200)}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;