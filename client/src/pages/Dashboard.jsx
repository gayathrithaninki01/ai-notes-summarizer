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
  const [selectedFile, setSelectedFile] = useState(null);
  const [active, setActive] = useState("dashboard");

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div
      className={`min-h-screen flex ${
        darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Sidebar */}
      <Sidebar
        active={active}
        setActive={setActive}
        darkMode={darkMode}
        profile={profile}
      />

      {/* Main Area */}
      <div className="flex-1 min-w-0">
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          profile={profile}
          onLogout={handleLogout}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          {/* DASHBOARD */}
          {active === "dashboard" && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upload */}
                <div className="min-w-0">
                  <UploadBox
                    darkMode={darkMode}
                    file={file}
                    setFile={setFile}
                    mode={mode}
                    setMode={setMode}
                    handleUpload={handleUpload}
                    loading={loading}
                  />
                </div>

                {/* Summary */}
                <div className="min-w-0">
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
              </div>

              {/* Analytics */}
              <div className="mt-6 sm:mt-8">
                <Analytics
                  darkMode={darkMode}
                  history={history}
                  summary={summary}
                />
              </div>
            </>
          )}

          {/* UPLOAD */}
          {active === "upload" && (
            <div className="max-w-3xl mx-auto">
              <UploadBox
                darkMode={darkMode}
                file={file}
                setFile={setFile}
                mode={mode}
                setMode={setMode}
                handleUpload={handleUpload}
                loading={loading}
              />
            </div>
          )}

          {/* HISTORY */}
          {active === "history" && (
            <HistoryCard
              darkMode={darkMode}
              history={history}
              deleteHistory={deleteHistory}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              setActive={setActive}
            />
          )}

          {/* CHAT */}
          {active === "chat" && (
            <ChatBox
              darkMode={darkMode}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              history={history}
            />
          )}

          {/* ANALYTICS */}
          {active === "analytics" && (
            <Analytics
              darkMode={darkMode}
              history={history}
              summary={summary}
            />
          )}

          {/* SETTINGS */}
          {active === "settings" && (
            <Settings
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              history={history}
              setHistory={setHistory}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;