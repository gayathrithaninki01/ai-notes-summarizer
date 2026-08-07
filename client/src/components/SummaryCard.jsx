import {
  FaCopy,
  FaDownload,
  FaSearch,
  FaChartBar,
} from "react-icons/fa";

function SummaryCard({
  darkMode,
  summary,
  searchTerm,
  setSearchTerm,
  handleCopy,
  handleDownload,
}) {
  const wordCount = summary
    ? summary.split(/\s+/).filter(Boolean).length
    : 0;

  const readingTime = Math.max(
    1,
    Math.ceil(wordCount / 200)
  );

  const filteredSummary = summary
    .split("\n")
    .filter((line) =>
      line
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .join("\n");

  return (
    <div
      className={`rounded-2xl shadow-lg p-6 md:p-8 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      {/* Heading */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

        <h2 className="text-2xl font-bold text-blue-600">
          Generated Summary
        </h2>

        <div className="flex flex-wrap gap-3">

          <button
            onClick={handleCopy}
            className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl flex justify-center items-center gap-2"
          >
            <FaCopy />
            Copy
          </button>

          <button
            onClick={handleDownload}
            className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex justify-center items-center gap-2"
          >
            <FaDownload />
            Download
          </button>

        </div>

      </div>

      {/* Search */}

      <div className="relative mb-6">

        <FaSearch className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search in summary..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="w-full border rounded-xl py-3 pl-12 pr-4 text-black"
        />

      </div>

      {/* Summary */}

      <div
        className={`rounded-xl p-5 min-h-[300px] max-h-[500px] overflow-y-auto whitespace-pre-wrap leading-8 ${
          darkMode
            ? "bg-gray-700"
            : "bg-gray-100"
        }`}
      >
        {filteredSummary ||
          "No summary generated yet."}
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">

        <div
          className={`rounded-xl p-5 ${
            darkMode
              ? "bg-gray-700"
              : "bg-blue-50"
          }`}
        >
          <div className="flex items-center gap-3">

            <FaChartBar className="text-blue-600 text-2xl" />

            <div>

              <h3 className="font-semibold">
                Word Count
              </h3>

              <p className="text-2xl font-bold">
                {wordCount}
              </p>

            </div>

          </div>

        </div>

        <div
          className={`rounded-xl p-5 ${
            darkMode
              ? "bg-gray-700"
              : "bg-green-50"
          }`}
        >
          <div className="flex items-center gap-3">

            <FaChartBar className="text-green-600 text-2xl" />

            <div>

              <h3 className="font-semibold">
                Reading Time
              </h3>

              <p className="text-2xl font-bold">
                {readingTime} min
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SummaryCard;