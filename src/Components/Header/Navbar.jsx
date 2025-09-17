import React from "react";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router";

const Navbar = () => {

  const navLink = (
    <>
      <li>
        <NavLink
          to={`/`}
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-white text-lg uppercase font-semibold transition duration-200"
              : "text-lg uppercase font-semibold hover:border-b-2 hover:border-white transition duration-200"
          }
        >
          All-News
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/category/breaking-news`}
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-white text-lg uppercase font-semibold transition duration-200"
              : "text-lg uppercase font-semibold hover:border-b-2 hover:border-white transition duration-200"
          }
        >
          Breaking News
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/category/business-news`}
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-white text-lg uppercase font-semibold transition duration-200"
              : "text-lg uppercase font-semibold hover:border-b-2 hover:border-white transition duration-200"
          }
        >
          Business
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/category/technology-news`}
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-white text-lg uppercase font-semibold transition duration-200"
              : "text-lg uppercase font-semibold hover:border-b-2 hover:border-white transition duration-200"
          }
        >
          Technology
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/category/health-news`}
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-white text-lg uppercase font-semibold transition duration-200"
              : "text-lg uppercase font-semibold hover:border-b-2 hover:border-white transition duration-200"
          }
        >
          Health
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/category/sport-news`}
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-white text-lg uppercase font-semibold transition duration-200"
              : "text-lg uppercase font-semibold hover:border-b-2 hover:border-white transition duration-200"
          }
        >
         Sports
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/category/entertainment-news`}
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-white text-lg uppercase font-semibold transition duration-200"
              : "text-lg uppercase font-semibold hover:border-b-2 hover:border-white transition duration-200"
          }
        >
          Entertainment
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/category/science-news`}
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-white text-lg uppercase font-semibold transition duration-200"
              : "text-lg uppercase font-semibold hover:border-b-2 hover:border-white transition duration-200"
          }
        >
          Science
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/category/politics-news`}
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-white text-lg uppercase font-semibold transition duration-200"
              : "text-lg uppercase font-semibold hover:border-b-2 hover:border-white transition duration-200"
          }
        >
          Politics
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/category/lifestyle-news`}
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-white text-lg uppercase font-semibold transition duration-200"
              : "text-lg uppercase font-semibold hover:border-b-2 hover:border-white transition duration-200"
          }
        >
          Lifestyle
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/dashboard`}
          className={({ isActive }) =>
            isActive
              ? "border-b-2 border-white text-lg uppercase font-semibold transition duration-200"
              : "text-lg uppercase font-semibold hover:border-b-2 hover:border-white transition duration-200"
          }
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="">
      <div className="navbar ">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn text-white btn-ghost lg:hidden"
            >
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
              className="menu menu-sm dropdown-content bg-base-100  rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navLink}
            </ul>
          </div>
          <h1 className=" text-3xl text-white font-extrabold ">
            News<span className="text-orange-700">365.</span>
          </h1>
        </div>
        <div className="navbar-center text-white hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLink}</ul>
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
