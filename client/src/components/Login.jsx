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
        "http://localhost:5000/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      onLogin({
        ...res.data.user,
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
        Login
      </h1>

      <div className="relative mt-8 mb-5">
        <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-xl py-3 pl-12"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="relative mb-6">
        <FaLock className="absolute left-4 top-4 text-gray-400" />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-xl py-3 pl-12"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white py-3 rounded-xl"
      >
        Login
      </button>

      <p className="text-center mt-5">
        Don't have an account?{" "}
        <button
          onClick={goToRegister}
          className="text-blue-600 font-semibold"
        >
          Register
        </button>
      </p>
    </div>
  );
}

export default Login;