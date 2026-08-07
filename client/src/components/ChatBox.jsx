import { useState } from "react";
import axios from "axios";
import {
  FaPaperPlane,
  FaRobot,
  FaUser,
  FaTrash,
} from "react-icons/fa";

function ChatBox({ darkMode }) {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! 👋 I'm your AI Study Assistant. Ask me anything about your uploaded notes.",
    },
  ]);

  const [question, setQuestion] = useState("");

  const handleSend = async () => {
    if (!question.trim()) return;

    const userMessage = {
      sender: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const token = localStorage.getItem("token");

      // Get latest summary
      const summaryRes = await axios.get(
        "http://localhost:5000/summary",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (summaryRes.data.length === 0) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: "Please upload a PDF and generate a summary first.",
          },
        ]);
        setQuestion("");
        return;
      }

      const latestSummary = summaryRes.data[0].summary;

      // Ask chatbot
      const res = await axios.post(
        "http://localhost:5000/chat",
        {
          notes: latestSummary,
          question: question,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const aiMessage = {
        sender: "ai",
        text: res.data.answer,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Unable to connect to AI.",
        },
      ]);
    }

    setQuestion("");
  };

  const clearChat = () => {
    setMessages([
      {
        sender: "ai",
        text: "Chat cleared. Ask me anything!",
      },
    ]);
  };

  return (
    <div
      className={`rounded-2xl shadow-lg p-6 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-blue-600">
          AI Study Assistant
        </h2>

        <button
          onClick={clearChat}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaTrash />
          Clear
        </button>
      </div>

      <div
        className={`rounded-xl p-4 h-[450px] overflow-y-auto ${
          darkMode ? "bg-gray-700" : "bg-gray-100"
        }`}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-4 ${
              msg.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-xl px-4 py-3 flex gap-3 ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : darkMode
                  ? "bg-gray-600 text-white"
                  : "bg-white"
              }`}
            >
              <div className="mt-1">
                {msg.sender === "user" ? (
                  <FaUser />
                ) : (
                  <FaRobot className="text-blue-500" />
                )}
              </div>

              <div>{msg.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-5">
        <input
          type="text"
          placeholder="Ask anything about your notes..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 border rounded-xl px-4 py-3 text-black"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

export default ChatBox;