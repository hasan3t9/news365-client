import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0e1324] text-white px-6 lg:px-20 py-10">
      {/* Top Section */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-gray-700 pb-8">
        {/* Column 1 - About */}
        <div>
          <h2 className="text-3xl font-extrabold mb-2">
            News<span className="text-red-500">365.</span>
          </h2>
          <p className="text-sm mt-2 mb-4">
            BDTASK © 2022. All Rights Reserved.
          </p>
          <p className="text-sm leading-relaxed">
            الشارع مع شارع النخيل، مبنى رقم 12، الطابق الثالث
          </p>
          <p className="text-sm mt-2">📞 0-144444425</p>
          <p className="text-sm mt-1">📧 Demo@demo.com</p>
        </div>

        {/* Column 2 - Categories */}
        <div>
          <h3 className="font-bold text-lg mb-3">Categories</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span>Crime</span>
            <span>Food</span>
            <span>Travel</span>
            <span>Fashion</span>
            <span>Business</span>
            <span>Life Style</span>
            <span>Health</span>
            <span>Politics</span>
            <span>Agriculture</span>
            <span>Sports</span>
          </div>
        </div>

        {/* Column 3 - Company */}
        <div>
          <h3 className="font-bold text-lg mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>Social Media</li>
            <li>Stock Market</li>
            <li>Social Issues</li>
            <li>Promotion</li>
            <li>Archive</li>
          </ul>
        </div>

        {/* Column 4 - Newsletter */}
        <div>
          <h3 className="font-bold text-lg mb-3">Sign Up For Our Newsletter</h3>
          <p className="text-sm mb-4">
            Subscribe to our newsletter to get our newest articles instantly!
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Email"
              className="p-2 rounded-l-md bg-white text-black w-full outline-none"
            />
            <button className="bg-blue-600 px-4 text-white rounded-r-md hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between mt-6 text-sm text-gray-400 gap-4">
        {/* Social Icons */}
        <div className="flex space-x-5">
          <FaFacebookF className="hover:text-white cursor-pointer" />
          <FaTwitter className="hover:text-white cursor-pointer" />
          <FaInstagram className="hover:text-white cursor-pointer" />
          <FaYoutube className="hover:text-white cursor-pointer" />
        </div>

        {/* Links */}
        <div className="space-x-6">
          <a href="#" className="hover:text-white transition">
            Terms & Condition
          </a>
          <a href="#" className="hover:text-white transition">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
