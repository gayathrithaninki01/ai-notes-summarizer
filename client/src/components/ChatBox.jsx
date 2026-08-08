import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaPaperPlane,
  FaRobot,
  FaUser,
  FaTrash,
  FaFileAlt,
} from "react-icons/fa";

function ChatBox({
  darkMode,
  selectedFile,
  setSelectedFile,
  history,
}) {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text:
        "Hi! 👋 I'm your AI Study Assistant. Select a file and ask me anything about your notes.",
    },
  ]);

  const [question, setQuestion] = useState("");
  const [sending, setSending] = useState(false);

  // Select latest file by default
  useEffect(() => {
    if (history && history.length > 0 && !selectedFile) {
      setSelectedFile(history[0]);
    }
  }, [history, selectedFile, setSelectedFile]);

  // Clean unwanted AI formatting
  const cleanAIResponse = (text) => {
    if (!text) {
      return "Unable to generate an answer.";
    }

    let cleaned = text;

    // Remove common model special tokens / markup
    cleaned = cleaned
      .replace(/<start_header_id>/gi, "")
      .replace(/<end_header_id>/gi, "")
      .replace(/<eot_id>/gi, "")
      .replace(/<\|start_header_id\|>/gi, "")
      .replace(/<\|end_header_id\|>/gi, "")
      .replace(/<\|eot_id\|>/gi, "");

    // Remove unwanted role prefixes
    cleaned = cleaned.replace(
      /^(assistant|user|system)\s*[:|]?\s*/i,
      ""
    );

    return cleaned.trim();
  };

  // Select file
  const handleFileChange = (e) => {
    const fileId = e.target.value;

    const file = history.find(
      (item) => item._id === fileId
    );

    if (!file) return;

    setSelectedFile(file);

    // Clear old chat when changing file
    setMessages([
      {
        sender: "ai",
        text: `Now chatting with ${file.fileName}. Ask me anything about this file.`,
      },
    ]);
  };

  // Send question
  const handleSend = async () => {
    if (!question.trim() || sending) return;

    if (!selectedFile) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Please select a file first.",
        },
      ]);
      return;
    }

    const currentQuestion = question.trim();

    const userMessage = {
      sender: "user",
      text: currentQuestion,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setQuestion("");
    setSending(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://ai-notes-summarizer-backend-hih1.onrender.com/chat",
        {
          notes: selectedFile.summary,
          question: currentQuestion,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const answer = cleanAIResponse(
        res.data.answer
      );

      const aiMessage = {
        sender: "ai",
        text: answer,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);
    } catch (error) {
      console.error("Chat Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            "Unable to connect to AI. Please try again.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  // Clear chat
  const clearChat = () => {
    setMessages([
      {
        sender: "ai",
        text: selectedFile
          ? `Chat cleared. Ask me anything about ${selectedFile.fileName}.`
          : "Chat cleared. Select a file and ask me anything!",
      },
    ]);
  };

  return (
    <div
      className={`rounded-2xl shadow-lg p-4 sm:p-6 w-full max-w-full overflow-hidden ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-white"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-5">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold text-blue-600">
            AI Study Assistant
          </h2>

          {selectedFile && (
            <div
              className={`mt-2 flex items-start gap-2 min-w-0 ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-600"
              }`}
            >
              <FaFileAlt className="text-blue-600 mt-1 flex-shrink-0" />

              <p className="break-words min-w-0">
                Chatting with:{" "}
                <strong className="break-all">
                  {selectedFile.fileName}
                </strong>
              </p>
            </div>
          )}
        </div>

        <button
          onClick={clearChat}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 flex-shrink-0"
        >
          <FaTrash />
          Clear
        </button>
      </div>

      {/* File Selector */}
      <div
        className={`rounded-xl p-4 mb-5 w-full ${
          darkMode
            ? "bg-gray-700"
            : "bg-blue-50"
        }`}
      >
        <label className="font-semibold block">
          Select Notes to Chat
        </label>

        <select
          value={
            selectedFile
              ? selectedFile._id
              : ""
          }
          onChange={handleFileChange}
          className="w-full max-w-full mt-2 border rounded-xl p-3 text-black"
        >
          <option value="">
            Select a file
          </option>

          {history.map((item) => (
            <option
              key={item._id}
              value={item._id}
            >
              {item.fileName}
            </option>
          ))}
        </select>

        {selectedFile && (
          <p className="text-sm text-gray-500 mt-2 break-words">
            Currently using this file for AI answers.
          </p>
        )}
      </div>

      {/* Messages */}
      <div
        className={`rounded-xl p-3 sm:p-4 h-[400px] sm:h-[450px] overflow-y-auto overflow-x-hidden w-full ${
          darkMode
            ? "bg-gray-700"
            : "bg-gray-100"
        }`}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-4 w-full ${
              msg.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[90%] sm:max-w-[80%] rounded-xl px-4 py-3 flex gap-3 min-w-0 ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : darkMode
                  ? "bg-gray-600 text-white"
                  : "bg-white"
              }`}
            >
              <div className="mt-1 flex-shrink-0">
                {msg.sender === "user" ? (
                  <FaUser />
                ) : (
                  <FaRobot className="text-blue-500" />
                )}
              </div>

              <div className="break-words whitespace-pre-wrap overflow-wrap-anywhere min-w-0">
                {msg.text}
              </div>
            </div>
          </div>
        ))}

        {sending && (
          <div className="flex justify-start mb-4">
            <div
              className={`rounded-xl px-4 py-3 flex items-center gap-3 ${
                darkMode
                  ? "bg-gray-600"
                  : "bg-white"
              }`}
            >
              <FaRobot className="text-blue-500" />
              <span className="text-gray-500">
                Thinking...
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex flex-col sm:flex-row gap-3 mt-5 w-full">
        <input
          type="text"
          placeholder={
            selectedFile
              ? "Ask about your notes..."
              : "Select a file first..."
          }
          value={question}
          disabled={!selectedFile || sending}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          className="w-full min-w-0 flex-1 border rounded-xl px-4 py-3 text-black outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey
            ) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        <button
          onClick={handleSend}
          disabled={
            !selectedFile ||
            !question.trim() ||
            sending
          }
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2"
        >
          <FaPaperPlane />

          <span className="sm:hidden">
            Send
          </span>
        </button>
      </div>
    </div>
  );
}

export default ChatBox;