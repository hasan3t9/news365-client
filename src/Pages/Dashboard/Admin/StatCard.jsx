import React from "react";
import CountUp from "react-countup";

const StatCard = ({
  title,
  value,
  icon: Icon,
  color = "text-black",
  bg = "#f1f1f1",
}) => (
  <div
    className="p-6 rounded-lg shadow-md flex items-center gap-4"
    style={{ backgroundColor: bg }}
  >
    <div className={`text-4xl ${color}`}>
      <Icon />
    </div>
    <div>
      <h3 className="text-md font-semibold text-gray-700">{title}</h3>
      <p className={`text-3xl font-bold ${color}`}>
        <CountUp end={value || 0} duration={1.5} separator="," />
      </p>
    </div>
  </div>
);
export default StatCard;
