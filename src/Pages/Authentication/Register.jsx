import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaImage } from "react-icons/fa";

import { useNavigate } from "react-router";
import Swal from "sweetalert2";

import axiosInstance from "../../Hook/useAxios";
import { toast } from "react-toastify";
import AuthContext from "../../Provider/AuthContext";

const Register = () => {
  const { createUser, updateUser, verifyUser, LogOutUser } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_num: "",
    password: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle image input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setImage(null);
      setImagePreview("");
      return;
    }
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Register handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      Swal.fire("Error", "Please fill in all required fields", "error");
      return;
    }

    setLoading(true);

    try {
      // 1. Upload image if present
      let imageUrl = "";
      if (image) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "my_preset");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dwsj0yzda/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        const imgData = await res.json();

        if (imgData.secure_url) {
          imageUrl = imgData.secure_url;
        } else {
          throw new Error("Failed to upload image.");
        }
      }

      // 2. Create user with Firebase Auth
      await createUser(formData.email, formData.password);

      // 3. Update user profile
      await updateUser({
        displayName: formData.name,
        photoURL: imageUrl || "",
      });

      // 4. Send verification email
      await verifyUser();

      // 5. Add user info to your backend/database
      const newUser = {
        name: formData.name,
        email: formData.email,
        photo: imageUrl || "",
        phone_num: formData.phone_num || "",
        role: "user",
      };

      // Use axios or fetch to post to your backend
      const response = await axiosInstance.post("/users", newUser);

      if (response.data.insertedId) {
        toast.success("User data saved to database!");
      } else {
        throw new Error("Failed to save user data.");
      }

      await LogOutUser();

      Swal.fire({
        icon: "success",
        title: "Account created!",
        text: "Verification email sent. Please verify before login.",
      });

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire("Error", error.message || "Registration failed", "error");
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
          Create Account !!
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="relative">
            <FaUser className="absolute top-4 left-3 text-gray-500" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              className="w-full py-3 pl-10 pr-4 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute top-4 left-3 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className="w-full py-3 pl-10 pr-4 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <FaPhone className="absolute top-4 left-3 text-gray-500" />
            <input
              type="tel"
              name="phone_num"
              placeholder="Phone Number"
              value={formData.phone_num}
              onChange={handleChange}
              disabled={loading}
              className="w-full py-3 pl-10 pr-4 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-4 left-3 text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              className="w-full py-3 pl-10 pr-4 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* Image Upload */}
          <div className="relative">
            <FaImage className="absolute top-6 left-3 text-gray-500" />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              disabled={loading}
              className="w-full py-3 pl-10 pr-4 bg-gray-100 rounded-lg text-gray-800 file:bg-indigo-600 file:text-white file:font-semibold file:px-4 file:py-2 file:border-none file:rounded-lg"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 w-24 h-24 rounded-full object-cover border"
              />
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </form>

        <p className="text-gray-600 text-center mt-6 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 underline hover:text-indigo-800"
          >
            Sign in
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
