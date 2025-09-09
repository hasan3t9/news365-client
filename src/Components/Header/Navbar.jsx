import React from "react";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router";

const Navbar = () => {
  const navLink = (
    <>
      <li className="text-xl font-semibold uppercase">
        <NavLink>Phone</NavLink>
      </li>
      <li className="text-xl font-semibold uppercase">
        <NavLink>Software</NavLink>
      </li>
      <li className="text-xl font-semibold uppercase">
        <NavLink>Crypto</NavLink>
      </li>
      <li className="text-xl font-semibold uppercase">
        <NavLink>Gadget</NavLink>
      </li>
      <li className="text-xl font-semibold uppercase">
        <NavLink>Robotics</NavLink>
      </li>
      <li className="text-xl font-semibold uppercase">
        <NavLink>AI News</NavLink>
      </li>
      <li className="text-xl font-semibold uppercase">
        <NavLink>Business</NavLink>
      </li>
      <li className="text-xl font-semibold uppercase">
        <NavLink>Rss News</NavLink>
      </li>
      <li className="text-xl font-semibold uppercase">
        <NavLink>Video</NavLink>
      </li>
      <li className="text-xl font-semibold uppercase">
        <NavLink>More</NavLink>
      </li>
      
      
    </>
  );
  return (
    <div className="">
      <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 text-white rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navLink}
          </ul>
        </div>
        <h1 className=" text-3xl text-white font-extrabold ">
          News<span className="text-orange-700">365.</span>
        </h1>
      </div>
      <div className="navbar-center text-white hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLink}
        </ul>
      </div>
      <div className="navbar-end">
        <div className="p-4 text-white bg-[#1D4ED8] rounded-full">
          <FaSearch />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Navbar;
