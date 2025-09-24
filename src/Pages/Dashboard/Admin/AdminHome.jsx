import React, { useEffect, useState } from "react";
import axiosInstance from "../../../Hook/useAxios";
import CountUp from "react-countup";

// Import icons from react-icons
import {
  FaRegNewspaper,
  FaFire,
  FaCalendarDay,
  FaEye,
  FaUsers,
} from "react-icons/fa";

const AdminHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/dashboard-stats")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch stats:", err);
        setError("Failed to load stats");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading stats...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      <StatCard
        title="Total Posts"
        value={stats?.totalPosts}
        bg="#9d7ee730"
        icon={<FaRegNewspaper size={80} className="text-blue-600" />}
      />
      <StatCard
        title="Trending Posts"
        value={stats?.totalTrending}
        bg="#E8EBED"
        icon={<FaFire size={80} className="text-red-500" />}
      />
      <StatCard
        title="Today's Picks"
        value={stats?.totalTodayPick}
        bg="#CCF8FE"
        icon={<FaCalendarDay size={80} className="text-green-500" />}
      />
      <StatCard
        title="Total Views"
        value={stats?.totalViews}
        bg="#DCFCE7"
        icon={<FaEye size={80} className="text-purple-600" />}
      />
      <StatCard
        title="Total Users"
        value={stats?.totalUsers}
        bg="#E8FCCF"
        icon={<FaUsers size={80} className="text-teal-600" />}
      />
    </div>
  );
};

// Reusable Stat Card with CountUp and Icon
const StatCard = ({ title, value, bg, icon }) => (
  <div
    className="p-6 rounded-lg shadow-md flex items-center gap-4"
    style={{ backgroundColor: bg }}
  >
    <div className="icon-container">{icon}</div>
    <div>
      <h3 className="text-2xl font-bold mb-1">{title}</h3>
      <p className="text-xl font-bold text-gray-800">
        <CountUp end={value || 0} duration={1.5} separator="," />
      </p>
    </div>
  </div>
);

export default AdminHome;
