import { useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUniversity,
} from "react-icons/fa";

function Register({ onRegister, goToLogin }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const res = await axios.post(
        "https://ai-notes-summarizer-backend-hih1.onrender.com/auth/register",
        {
          fullName,
          email,
          password,
        }
      );

      // Save token
      localStorage.setItem("token", res.data.token);

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...res.data.user,
          college,
        })
      );

      // Send user data to App
      onRegister({
        ...res.data.user,
        college,
        token: res.data.token,
      });
    } catch (error) {
      console.error("Registration Error:", error);

      if (error.response) {
        alert(
          error.response.data.message ||
            "Registration failed."
        );
      } else {
        alert("Server Error. Please try again.");
      }
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-blue-700">
        Register
      </h1>

      {/* Full Name */}
      <div className="relative mt-8 mb-4">
        <FaUser className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      {/* Email */}
      <div className="relative mb-4">
        <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

        <input
          type="email"
          className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* College */}
      <div className="relative mb-4">
        <FaUniversity className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="College (Optional)"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className="relative mb-6">
        <FaLock className="absolute left-4 top-4 text-gray-400" />

        <input
          type="password"
          className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Register Button */}
      <button
        onClick={handleRegister}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
      >
        Register
      </button>

      {/* Login */}
      <p className="text-center mt-5 text-gray-600">
        Already have an account?{" "}

        <button
          onClick={goToLogin}
          className="text-blue-600 font-semibold hover:underline"
        >
          Login
        </button>
      </p>

    </div>
  );
}

export default Register;