import React from "react";
import useUserRole from "../../../Hook/useUserRole";
import AdminHome from "../Admin/AdminHome";
import UserHome from "../Users/UserHome";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();
  if (roleLoading || !role) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  if (role === "admin") {
    return <AdminHome></AdminHome>;
  } else if (role === "user") {
    return <UserHome></UserHome>;
  } else {
    return <p>Unathorized</p>;
  }
};

export default DashboardHome;
