import { IoTime } from "react-icons/io5";

const DateDisplay = () => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return <p className="flex items-center gap-2"><IoTime /> {formattedDate}</p>;
};

export default DateDisplay;
