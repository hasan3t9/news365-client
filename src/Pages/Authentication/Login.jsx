import React from "react";
import { motion } from "framer-motion";
import { FaLock, FaUser } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

const Login = () => {
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

        <form className="space-y-5">
          {/* Username */}
          <div className="relative">
            <BiLogoGmail className="absolute top-4 left-3 text-gray-500" />
            
            <input
              type="email"
              placeholder="Email"
              className="w-full py-3 pl-10 pr-4 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-4 left-3 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              className="w-full py-3 pl-10 pr-4 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
          >
            Sign In
          </motion.button>
        </form>

        <p className="text-gray-600 text-center mt-6 ">
          Don't have an account?{" "}
          <a
            href="#"
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
