import React from "react";
import DateDisplay from "./DateDisplay";
import { Link } from "react-router";
import {  FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
;

const Header = () => {
  return (
    <div className="flex items-center justify-between ">
      <div className="p-1 font-semibold">
        <DateDisplay></DateDisplay>
      </div>
      <div className="flex items-center gap-4 pr-3">
        <div className="flex items-center justify-center gap-2 ">
          <Link to="/login" className="font-semibold">
            Login
          </Link>

          <div className="h-8 w-px bg-gray-300"></div>

          <Link to="/register" className="font-semibold">
            Register
          </Link>
        </div>
        <div className="flex items-center text-white gap-2">
          <div className="p-2 text-white bg-[#3188FD] rounded-full">
            <FaFacebookF />
          </div>
          <div className="p-2 text-white bg-[#55C6F6] rounded-full">
            <FaTwitter />
          </div>
          <div className="p-2 text-white bg-[#C84B91] rounded-full">
            <RiInstagramFill />
          </div>
          <div className="p-2 text-white bg-[#F16155] rounded-full">
            <FaYoutube />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Header;
