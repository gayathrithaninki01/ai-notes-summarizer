import {
  FaTrash,
  FaFileAlt,
  FaComments,
} from "react-icons/fa";

function HistoryCard({
  darkMode,
  history,
  deleteHistory,
  selectedFile,
  setSelectedFile,
  setActive,
}) {
  const handleChatWithFile = (item) => {
    setSelectedFile(item);
    setActive("chat");
  };

  return (
    <div
      className={`rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-600">
          Recent History
        </h2>

        <p className="text-sm text-gray-500">
          {history.length} file{history.length !== 1 ? "s" : ""}
        </p>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-10">
          <FaFileAlt
            size={50}
            className="mx-auto text-gray-400 mb-4"
          />

          <p className="text-gray-500">
            No summaries generated yet.
          </p>
        </div>
      ) : (
        <div className="space-y-5 max-h-[600px] overflow-y-auto">
          {history.map((item) => (
            <div
              key={item._id}
              className={`rounded-xl border p-4 sm:p-5 ${
                darkMode
                  ? "border-gray-600 bg-gray-700"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              {/* File information */}
              <div className="flex items-start gap-3">
                <div className="mt-1 shrink-0">
                  <FaFileAlt className="text-blue-600 text-xl" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-base sm:text-lg break-words">
                    {item.fileName}
                  </h3>

                  <p className="text-blue-600 font-medium mt-2 text-sm">
                    {item.mode?.toUpperCase()}
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-5">
                <button
                  onClick={() => handleChatWithFile(item)}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition"
                >
                  <FaComments />
                  Chat with this file
                </button>

                <button
                  onClick={() => deleteHistory(item._id)}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition"
                >
                  <FaTrash />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HistoryCard;