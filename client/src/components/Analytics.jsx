import {
  FaFileAlt,
  FaBrain,
  FaClock,
  FaChartLine,
} from "react-icons/fa";

function Analytics({
  darkMode,
  history,
}) {

  const totalUploads = history.length;

  const totalWords = history.reduce((total, item) => {
    return (
      total +
      item.summary.split(/\s+/).filter(Boolean).length
    );
  }, 0);

  const readingTime = Math.max(
    1,
    Math.ceil(totalWords / 200)
  );

  const cards = [
    {
      title: "Files Uploaded",
      value: totalUploads,
      icon: <FaFileAlt />,
      color: "bg-blue-600",
    },
    {
      title: "AI Summaries",
      value: totalUploads,
      icon: <FaBrain />,
      color: "bg-green-600",
    },
    {
      title: "Words Generated",
      value: totalWords,
      icon: <FaChartLine />,
      color: "bg-purple-600",
    },
    {
      title: "Reading Time",
      value: `${readingTime} min`,
      icon: <FaClock />,
      color: "bg-orange-500",
    },
  ];

  return (
    <div
      className={`rounded-2xl shadow-lg p-6 md:p-8 ${
        darkMode
          ? "bg-gray-800"
          : "bg-white"
      }`}
    >

      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        Analytics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {cards.map((card, index) => (
          <div
            key={index}
            className={`${card.color} text-white rounded-2xl p-6 shadow-lg`}
          >

            <div className="flex justify-between items-center">

              <div>

                <h3 className="text-base font-semibold">
                  {card.title}
                </h3>

                <p className="text-3xl font-bold mt-3">
                  {card.value}
                </p>

              </div>

              <div className="text-5xl opacity-80">
                {card.icon}
              </div>

            </div>

          </div>
        ))}

      </div>

      <div
        className={`mt-8 rounded-2xl p-6 ${
          darkMode
            ? "bg-gray-700"
            : "bg-blue-50"
        }`}
      >

        <h3 className="text-xl font-bold mb-3">
          AI Productivity
        </h3>

        <p className="leading-7">
          Your AI assistant has generated
          <strong> {totalWords} </strong>
          words from
          <strong> {totalUploads} </strong>
          uploaded PDFs.
        </p>

        <div className="w-full bg-gray-300 rounded-full h-3 mt-6 overflow-hidden">

          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-700"
            style={{
              width: `${Math.min(
                totalUploads * 10,
                100
              )}%`,
            }}
          ></div>

        </div>

        <p className="mt-3 text-sm text-gray-500">
          Learning Progress
        </p>

      </div>

    </div>
  );
}

export default Analytics;