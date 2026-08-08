import { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";

function Login({ onLogin, goToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "https://ai-notes-summarizer-backend-hih1.onrender.com/auth/login",
        {
          email,
          password,
        }
      );

      // Save token
      localStorage.setItem("token", res.data.token);

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      // Send user data to App
      onLogin({
        ...res.data.user,
        token: res.data.token,
      });
    } catch (error) {
      console.error("Login Error:", error);

      if (error.response) {
        alert(
          error.response.data.message ||
            "Login failed."
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
        Login
      </h1>

      {/* Email */}
      <div className="relative mt-8 mb-5">
        <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className="relative mb-6">
        <FaLock className="absolute left-4 top-4 text-gray-400" />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Login Button */}
      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
      >
        Login
      </button>

      {/* Register */}
      <p className="text-center mt-5 text-gray-600">
        Don't have an account?{" "}

        <button
          onClick={goToRegister}
          className="text-blue-600 font-semibold hover:underline"
        >
          Register
        </button>
      </p>

    </div>
  );
}

export default Login;