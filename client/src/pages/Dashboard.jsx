import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import UploadBox from "../components/UploadBox";
import SummaryCard from "../components/SummaryCard";
import HistoryCard from "../components/HistoryCard";
import Analytics from "../components/Analytics";
import ChatBox from "../components/ChatBox";
import Settings from "../components/Settings";
import Loader from "../components/Loader";

function Dashboard({
  profile,
  file,
  setFile,
  mode,
  setMode,
  handleUpload,
  loading,
  summary,
  searchTerm,
  setSearchTerm,
  handleCopy,
  handleDownload,
  history,
  deleteHistory,
  setHistory,
}) {

  const [darkMode, setDarkMode] = useState(false);

  const [active, setActive] =
    useState("dashboard");

  const handleLogout = () => {
   localStorage.removeItem("user");
localStorage.removeItem("token");
    window.location.reload();
  };
  return (
  <div
    className={`min-h-screen ${
      darkMode
        ? "bg-gray-900 text-white"
        : "bg-gray-100 text-black"
    }`}
  >
    <div className="flex">

      {/* Sidebar */}

      <Sidebar
        active={active}
        setActive={setActive}
        darkMode={darkMode}
        profile={profile}
      />

      {/* Main */}

      <div className="flex-1">

        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          profile={profile}
          onLogout={handleLogout}
        />

        <div className="p-8">

          {active === "dashboard" && (

            <>
              <div className="grid lg:grid-cols-2 gap-6">

                <UploadBox
                  darkMode={darkMode}
                  file={file}
                  setFile={setFile}
                  mode={mode}
                  setMode={setMode}
                  handleUpload={handleUpload}
                  loading={loading}
                />

                {loading ? (
                  <Loader darkMode={darkMode} />
                ) : (
                  <SummaryCard
                    darkMode={darkMode}
                    summary={summary}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleCopy={handleCopy}
                    handleDownload={handleDownload}
                  />
                )}

              </div>

              <div className="mt-8">

                <Analytics
                  darkMode={darkMode}
                  history={history}
                  summary={summary}
                />

              </div>

            </>

          )}

          {active === "upload" && (

            <UploadBox
              darkMode={darkMode}
              file={file}
              setFile={setFile}
              mode={mode}
              setMode={setMode}
              handleUpload={handleUpload}
              loading={loading}
            />

          )}

          {active === "history" && (

            <HistoryCard
              darkMode={darkMode}
              history={history}
              deleteHistory={deleteHistory}
            />

          )}

          {active === "chat" && (

            <ChatBox
              darkMode={darkMode}
            />

          )}

          {active === "analytics" && (

            <Analytics
              darkMode={darkMode}
              history={history}
              summary={summary}
            />

          )}

          {active === "settings" && (

            <Settings
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              history={history}
              setHistory={setHistory}
            />

          )}

        </div>

      </div>

    </div>
  </div>
);
}

export default Dashboard;