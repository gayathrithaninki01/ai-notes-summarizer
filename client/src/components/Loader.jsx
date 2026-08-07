function Loader({ darkMode }) {
  return (
    <div className="flex flex-col justify-center items-center py-12">

      <div
        className={`w-16 h-16 border-4 border-t-blue-600 rounded-full animate-spin ${
          darkMode
            ? "border-gray-600"
            : "border-gray-300"
        }`}
      ></div>

      <p
        className={`mt-5 text-lg font-medium ${
          darkMode
            ? "text-gray-300"
            : "text-gray-600"
        }`}
      >
        AI is generating your notes...
      </p>

    </div>
  );
}

export default Loader;