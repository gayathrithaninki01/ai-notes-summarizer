import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  /* ---------------- PROFILE ---------------- */
const [showLogin, setShowLogin] = useState(true);
  const [profile, setProfile] = useState(() => {
  const saved = localStorage.getItem("user");
  return saved ? JSON.parse(saved) : null;
});

  /* ---------------- STATES ---------------- */

  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mode, setMode] = useState("summary");

  const [history, setHistory] = useState([]);

useEffect(() => {
  fetchHistory();
}, []);

  /* ---------------- UPLOAD ---------------- */
const fetchHistory = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/summary",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("History Response:", res.data);

    setHistory(res.data);
  } catch (error) {
    console.error(error);
  }
};
  const handleUpload = async () => {
  if (!file) {
    alert("Please select a PDF file.");
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("mode", mode);

    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:5000/upload",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

   
      const generatedSummary =
        res.data.summary || res.data.text || "";

      setSummary(generatedSummary);
      // Save summary to MongoDB
  // Save summary to MongoDB
  console.log("Saving summary...");
console.log(localStorage.getItem("token"));
await axios.post(
  "http://localhost:5000/summary",
  {
    fileName: file.name,
    originalText: "",
    summary: generatedSummary,
    mode: mode,
    wordCount: generatedSummary.split(" ").length,
    readingTime: Math.ceil(
      generatedSummary.split(" ").length / 200
    ),
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
console.log("Summary Saved Successfully");
await fetchHistory();

    } catch (err) {
      console.error(err);
      alert("Failed to generate summary.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- COPY ---------------- */

  const handleCopy = async () => {
    if (!summary) return;

    await navigator.clipboard.writeText(summary);

    alert("Summary copied.");
  };

  /* ---------------- DOWNLOAD ---------------- */

  const handleDownload = () => {
    if (!summary) return;

    const pdf = new jsPDF();

    pdf.setFontSize(18);

    pdf.text("StudyGen AI Summary", 20, 20);

    pdf.setFontSize(12);

    const lines = pdf.splitTextToSize(summary, 170);

    pdf.text(lines, 20, 35);

    pdf.save("StudyGen_AI_Summary.pdf");
  };

  /* ---------------- DELETE HISTORY ---------------- */

 const deleteHistory = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/summary/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const res = await axios.get(
      "http://localhost:5000/summary",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setHistory(res.data);

  } catch (error) {
    console.error(error);
  }
};

  /* ---------------- PROFILE ---------------- */

   if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {showLogin ? (
          <Login
            onLogin={(user) => setProfile(user)}
            goToRegister={() => setShowLogin(false)}
          />
        ) : (
          <Register
            onRegister={(user) => setProfile(user)}
            goToLogin={() => setShowLogin(true)}
          />
        )}
      </div>
    );
  }

  return (
    <Dashboard
      profile={profile}
      file={file}
      setFile={setFile}
      mode={mode}
      setMode={setMode}
      handleUpload={handleUpload}
      loading={loading}
      summary={summary}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      handleCopy={handleCopy}
      handleDownload={handleDownload}
      history={history}
      deleteHistory={deleteHistory}
      setHistory={setHistory}
    />
  );
}

export default App;