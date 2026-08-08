import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";

const API_URL = "https://ai-notes-summarizer-backend-hih1.onrender.com";

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

  /* ---------------- FETCH HISTORY ---------------- */

  useEffect(() => {
    if (profile) {
      fetchHistory();
    }
  }, [profile]);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        return;
      }

      const res = await axios.get(`${API_URL}/summary`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("History Response:", res.data);

      setHistory(res.data);
    } catch (error) {
      console.error(
        "Fetch History Error:",
        error.response?.data || error.message
      );
    }
  };

  /* ---------------- UPLOAD ---------------- */

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

      if (!token) {
        alert("Please login first.");
        return;
      }

      /* Generate Summary */

      const res = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const generatedSummary =
        res.data.summary || res.data.text || "";

      setSummary(generatedSummary);

      /* Save Summary to MongoDB */

      console.log("Saving summary...");

      await axios.post(
        `${API_URL}/summary`,
        {
          fileName: file.name,
          originalText: "",
          summary: generatedSummary,
          mode: mode,
          wordCount: generatedSummary
            .split(/\s+/)
            .filter(Boolean).length,
          readingTime: Math.ceil(
            generatedSummary
              .split(/\s+/)
              .filter(Boolean).length / 200
          ),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Summary Saved Successfully");

      /* Refresh History */

      await fetchHistory();

      alert("Summary generated and saved successfully!");
    } catch (err) {
      console.error(
        "Upload Error:",
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.message ||
          "Failed to generate summary."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- COPY ---------------- */

  const handleCopy = async () => {
    if (!summary) return;

    try {
      await navigator.clipboard.writeText(summary);

      alert("Summary copied.");
    } catch (error) {
      console.error(error);
      alert("Failed to copy summary.");
    }
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

      if (!token) {
        alert("Please login first.");
        return;
      }

      await axios.delete(`${API_URL}/summary/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Summary deleted successfully");

      await fetchHistory();
    } catch (error) {
      console.error(
        "Delete History Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete summary."
      );
    }
  };

  /* ---------------- PROFILE ---------------- */

  const handleLogin = (user) => {
    localStorage.setItem("user", JSON.stringify(user));

    setProfile(user);
  };

  const handleRegister = (user) => {
    localStorage.setItem("user", JSON.stringify(user));

    setProfile(user);
  };

  /* ---------------- LOGIN / REGISTER ---------------- */

  if (!profile) {
    return showLogin ? (
      <Login
        onLogin={handleLogin}
        goToRegister={() => setShowLogin(false)}
      />
    ) : (
      <Register
        onRegister={handleRegister}
        goToLogin={() => setShowLogin(true)}
      />
    );
  }

  /* ---------------- DASHBOARD ---------------- */

  return (
    <div className="min-h-screen flex">
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
    </div>
  );
}

export default App;