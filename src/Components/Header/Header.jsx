import React, { useContext } from "react";
import DateDisplay from "./DateDisplay";
import { Link, useNavigate } from "react-router";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import AuthContext from "../../Provider/AuthContext";
import Loader from "../Loader/Loader";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Header = () => {
  const { user, loading, LogOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    document.getElementById("my_modal_3").close();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        LogOutUser()
          .then(() => {
            navigate("/");
            Swal.fire({
              title: "Logged Out!",
              text: "Log Out Successfully Done",
              icon: "success",
            });
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-2">
      {/* Left - Date */}
      <div className="font-semibold ml-3 md:ml-0">
        <DateDisplay />
      </div>

      {/* Right - User / Social Icons / Auth Links */}
      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3  cursor-pointer">
            {/* User Avatar */}
            <div
              onClick={() => document.getElementById("my_modal_3").showModal()}
              className="flex items-center gap-2"
            >
              <div className="avatar pl-2">
                <div className="ring-primary w-9 h-9 ring-offset-base-100  rounded-full ring-2 ring-offset-2">
                  <img src={user?.photoURL} alt="User" />
                </div>
              </div>

              {/* User Name (optional) */}
              <div className="font-semibold hidden md:flex">
                {user?.displayName}
              </div>
            </div>

            {/* Social Icons */}
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
        ) : (
          <div className="flex items-center justify-center gap-2">
            <Link to="/login" className="font-semibold">
              Login
            </Link>
            <div className="h-8 w-px bg-gray-300"></div>
            <Link to="/register" className="font-semibold">
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Modal for Logout */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex justify-center items-center gap-3">
            <div className="avatar">
              <div className="ring-primary w-9 h-9 ring-offset-base-100 rounded-full ring-2 ring-offset-2">
                <img src={user?.photoURL} alt="User" />
              </div>
            </div>
            <h3 className="font-bold text-xl">{user?.displayName}</h3>
          </div>
          <div
            onClick={handleLogOut}
            className="flex justify-center items-center pt-10"
          >
            <button className="btn bg-blue-600 hover:bg-blue-700 border-none text-white">
              Logout
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Header;
