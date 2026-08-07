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
        "http://localhost:5000/auth/register",
        {
          fullName,
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...res.data.user,
          college,
        })
      );

      onRegister({
        ...res.data.user,
        college,
        token: res.data.token,
      });

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server Error");
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-10">

      <h1 className="text-4xl font-bold text-center text-blue-700">
        Register
      </h1>

      <div className="relative mt-8 mb-4">
        <FaUser className="absolute left-4 top-4 text-gray-400" />
        <input
          className="w-full border rounded-xl py-3 pl-12"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      <div className="relative mb-4">
        <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
        <input
          type="email"
          className="w-full border rounded-xl py-3 pl-12"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="relative mb-4">
        <FaUniversity className="absolute left-4 top-4 text-gray-400" />
        <input
          className="w-full border rounded-xl py-3 pl-12"
          placeholder="College (Optional)"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
        />
      </div>

      <div className="relative mb-6">
        <FaLock className="absolute left-4 top-4 text-gray-400" />
        <input
          type="password"
          className="w-full border rounded-xl py-3 pl-12"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        onClick={handleRegister}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
      >
        Register
      </button>

      <p className="text-center mt-5">
        Already have an account?{" "}
        <button
          onClick={goToLogin}
          className="text-blue-600 font-semibold"
        >
          Login
        </button>
      </p>

    </div>
  );
}

export default Register;