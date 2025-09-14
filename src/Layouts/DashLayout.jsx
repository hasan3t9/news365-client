import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
// import useUserRole from "../hooks/useUserRole";
import { AiFillHome } from "react-icons/ai";
import { BsFileEarmarkText } from "react-icons/bs";
import { FaListAlt, FaMoneyCheckAlt, FaRegListAlt } from "react-icons/fa";

import useUserRole from "../Hook/useUserRole";

const DashLayout = () => {
  const navigate = useNavigate();
  const { role, roleLoading } = useUserRole();

  const [openSection, setOpenSection] = useState("post");

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  if (roleLoading || !role) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  console.log("Role from DB:", role);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 font-semibold">Dashboard</div>
        </div>

        {/* Routed Page Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-1">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 mb-4 cursor-pointer"
          >
            <h1 className=" text-3xl text-blue-500 font-extrabold ">
              News<span className="text-orange-700">365.</span>
            </h1>
          </div>

          {/* Universal Dashboard Home */}
          <li className="font-bold">
            <NavLink
              className={({ isActive }) => (isActive ? "text-blue-500 " : "")}
              to="/dashboard"
              end
            >
              <AiFillHome size={20} /> Dashboard Home
            </NavLink>
          </li>

          {/* Role-based Sidebar */}
          {role === "user" && (
            <>
              <li className="font-bold">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-blue-500 " : ""
                  }
                  to="/dashboard/add-post"
                >
                  <BsFileEarmarkText size={20} />....
                </NavLink>
              </li>
              <li className="font-bold">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-blue-500 " : ""
                  }
                  to="/dashboard/my-post"
                >
                  <FaMoneyCheckAlt size={20} /> .......
                </NavLink>
              </li>
            </>
          )}

          {role === "admin" && (
            <>
              <div>
                <div onClick={() => toggleSection("post")}>
                  <li className="font-bold">
                    <NavLink>
                      <FaListAlt size={20} /> Post
                    </NavLink>
                  </li>
                </div>
                {openSection === "post" && (
                  <ul className="ml-6 mt-2 space-y-1 font-bold  ">
                    <li>
                      {" "}
                      <NavLink to={"/dashboard/add-post"}>Add Post</NavLink>
                    </li>
                    <li>
                      {" "}
                      <NavLink>Post List</NavLink>
                    </li>
                  </ul>
                )}
              </div>
              <li className="font-bold">
                <NavLink>
                  <FaListAlt size={20} /> Users
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashLayout;
