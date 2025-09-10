import React from "react";
import Hero from "../../Components/Hero/Hero";
import Entertainment from "../../Components/Entertainments/Entertainment";
import Politics from "../../Components/Politics/Politics";
import Business from "../../Components/Business/Business";
import Science from "../../Components/Education/Education";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <div>
        <div className="flex flex-col lg:flex-row mt-10 gap-5">
          <div className="h-auto w-[80%] ">
            <Entertainment></Entertainment>
            <Politics></Politics>
          </div>
          <aside className="h-auto w-[20%] bg-pink-200">frf</aside>
        </div>
        <Business></Business>
        <Science></Science>
      </div>
    </div>
  );
};

export default Home;
