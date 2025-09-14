import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import AuthContext from "../../Provider/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const {
    logInUser,
    loading: authLoading,
    logOutUser,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // for local loading
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const userCredential = await logInUser(email, password);
      const currentUser = userCredential.user;

      if (currentUser.emailVerified) {
        toast.success("Login successful.");
        navigate("/");
      } else {
        setMessage("Please verify your email before logging in.");
        // Sign out user if email not verified
        await logOutUser();
      }
    } catch (err) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white border border-gray-300 rounded-xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6 tracking-wide">
          Welcome Back !!
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="relative">
            <BiLogoGmail className="absolute top-4 left-3 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading || authLoading}
              className="w-full py-3 pl-10 pr-4 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-4 left-3 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading || authLoading}
              className="w-full py-3 pl-10 pr-4 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading || authLoading}
            className={`w-full py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg transition duration-300 ${
              loading || authLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-indigo-700"
            }`}
          >
            {loading || authLoading ? "Signing In..." : "Sign In"}
          </motion.button>
        </form>

        {/* Error & Success messages */}
        {error && <p className="mt-4 text-center text-red-600">{error}</p>}
        {message && (
          <p className="mt-4 text-center text-green-600">{message}</p>
        )}

        <p className="text-gray-600 text-center mt-6">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-indigo-600 underline hover:text-indigo-800"
          >
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
