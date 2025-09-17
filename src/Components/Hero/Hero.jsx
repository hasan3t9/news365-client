import React, { useEffect, useState } from "react";
import axiosInstance from "../../Hook/useAxios";

const Hero = () => {
  const [h1c1, setH1C1] = useState([]);
  const [h1c2, setH1C2] = useState([]);
  const [h1c3, setH1C3] = useState([]);
  const [h1c4, setH1C4] = useState([]);

  useEffect(() => {
    axiosInstance.get("/all-news365/h1c1").then((res) => {
      const data = res.data;
      setH1C1(data);
    });
    axiosInstance.get("/all-news365/h1c2").then((res) => {
      const data = res.data;
      setH1C2(data);
    });
    axiosInstance.get("/all-news365/h1c3").then((res) => {
      const data = res.data;
      setH1C3(data);
    });
    axiosInstance.get("/all-news365/h1c4").then((res) => {
      const data = res.data;
      setH1C4(data);
    });
  }, []);

  return (
    <div className="h-auto md:h-[700px] flex p-4 lg:p-0 flex-col md:flex-row gap-5 my-10">
      {/* Left side — RED */}
      <div className="w-full md:w-1/2">
        <div className=" w-full h-60 md:h-full">
          <div
            className="hero h-full"
            style={{
              backgroundImage: `url(${h1c1[0]?.image || ""}),
              url(${h1c1[0]?.imageUrl || ""})
              `,
            }}
          >
            {/* <div className="hero-overlay"></div> */}
            <div className="self-end justify-self-start">
              <div className="flex flex-col text-white p-5 ">
                <h1 className="text-lg bg-black p-1 w-max truncate  rounded-xl">
                  {h1c1[0]?.category}
                </h1>
                <p className="text-xl  w-max max-w-xs truncate  rounded-2xl font-bold mt-3">
                  {h1c1[0]?.headLine}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side — YELLOW + (PURPLE + BLUE) */}
      <div className="w-full md:w-1/2 flex flex-col gap-5">
        {/* YELLOW */}
        <div className="bg-yellow-200 w-full h-60 md:h-1/2">
          <div
            className="hero h-full"
            style={{
              backgroundImage: `url(${h1c2[0]?.image || ""}),
              url(${h1c2[0]?.imageUrl || ""})
              `,
            }}
          >
            {/* <div className="hero-overlay"></div> */}
            <div className="self-end justify-self-start">
              <div className="flex flex-col text-white p-5 ">
                <h1 className="text-lg   bg-black p-1 w-max  truncate rounded-xl">
                  {h1c2[0]?.category}
                </h1>
                <p className="text-xl  max-w-xs w-max truncate rounded-2xl font-bold mt-3">
                  {h1c2[0]?.headLine}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PURPLE + BLUE */}
        <div className="flex flex-col md:flex-row gap-5 w-full h-auto md:h-1/2">
          <div className="w-full h-60 md:h-full md:w-1/2">
            <div
              className="hero h-full"
              style={{
                backgroundImage: `url(${h1c3[0]?.image || ""}),
              url(${h1c3[0]?.imageUrl || ""})
              `,
              }}
            >
              {/* <div className="hero-overlay"></div> */}
              <div className="self-end justify-self-start">
                <div className="flex flex-col text-white p-5 ">
                  <h1 className="text-lg bg-black p-1 w-max max-w-xs truncate rounded-xl">
                    {h1c3[0]?.category}
                  </h1>
                  <p className="text-xl  max-w-xs truncate rounded-2xl font-bold mt-3">
                    {h1c3[0]?.headLine}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-blue-500 w-full h-60 md:h-full md:w-1/2">
            <div
              className="hero h-full"
              style={{
                backgroundImage: `url(${h1c4[0]?.image || ""}),
              url(${h1c4[0]?.imageUrl || ""})
              `,
              }}
            >
              {/* <div className="hero-overlay"></div> */}
              <div className="self-end justify-self-start">
                <div className="flex flex-col text-white p-5 ">
                  <h1 className="text-lg bg-black p-1 w-max rounded-xl">
                    {h1c4[0]?.category}
                  </h1>
                  <p className="text-xl  max-w-xs truncate rounded-2xl font-bold mt-3">
                    {h1c4[0]?.headLine}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
