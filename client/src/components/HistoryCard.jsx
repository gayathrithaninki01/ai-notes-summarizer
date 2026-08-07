import { FaTrash, FaFileAlt } from "react-icons/fa";

function HistoryCard({
  darkMode,
  history,
  deleteHistory,
}) {
  return (
    <div
      className={`rounded-2xl shadow-lg p-6 md:p-8 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        Recent History
      </h2>

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
              className={`rounded-xl border p-5 ${
                darkMode
                  ? "border-gray-600 bg-gray-700"
                  : "border-gray-200 bg-gray-50"
              }`}
            >

              <h3 className="font-bold text-lg break-all">
                {item.fileName}
              </h3>

              <p className="text-blue-600 font-medium mt-2">
                {item.mode.toUpperCase()}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                {new Date(item.createdAt).toLocaleString()}
              </p>

              <div className="flex justify-end mt-4">

                <button
                  onClick={() =>
                    deleteHistory(item._id)
                  }
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
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