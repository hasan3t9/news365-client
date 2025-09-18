import React, { useEffect, useState } from "react";
import axiosInstance from "../../Hook/useAxios";
import { Link, useNavigate } from "react-router";

const Business = () => {
  const navigate = useNavigate();
  const [h4c1, setH4C1] = useState([]);
  const [h4c2, setH4C2] = useState([]);
  const [h4c3, setH4C3] = useState([]);
  const [h4c4, setH4C4] = useState([]);
  const [h4c5, setH4C5] = useState([]);
  const [h4c6, setH4C6] = useState([]);
  useEffect(() => {
    axiosInstance.get("/all-news365/h4c1").then((res) => {
      const data = res.data;
      setH4C1(data);
    });
    axiosInstance.get("/all-news365/h4c2").then((res) => {
      const data = res.data;
      setH4C2(data);
    });
    axiosInstance.get("/all-news365/h4c3").then((res) => {
      const data = res.data;
      setH4C3(data);
    });
    axiosInstance.get("/all-news365/h4c4").then((res) => {
      const data = res.data;
      setH4C4(data);
    });
    axiosInstance.get("/all-news365/h4c5").then((res) => {
      const data = res.data;
      setH4C5(data);
    });
    axiosInstance.get("/all-news365/h4c6").then((res) => {
      const data = res.data;
      setH4C6(data);
    });
  }, []);
  const details1 = h4c1[0]?.details;
  const details2 = h4c2[0]?.details;
  const details3 = h4c3[0]?.details;
  const details4 = h4c4[0]?.details;
  const details5 = h4c5[0]?.details;
  const details6 = h4c6[0]?.details;

  return (
    <div className="mb-20 px-3 md:px-0">
      <div className="flex items-center mb-10  justify-between">
        <h1 className="uppercase text-2xl font-bold w-max border-b-3">
          Business
        </h1>
        <Link to={"/category/6"}>
          <h1 className="text-lg font-semibold border-b-2">View All</h1>
        </Link>
      </div>
      <div className="">
        <div className="h-auto w-full ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* ----------------h2c1----------- */}
            <div
              onClick={() => navigate(`/category/${h4c1[0]?._id}`)}
              className="card cursor-pointer max-w-[600px]  shadow-sm"
            >
              <figure>
                <img
                  className="w-full h-[350px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                  src={h4c1[0]?.image || h4c1[0]?.imageUrl}
                  alt="Business"
                />
              </figure>
              <div className="px-2 pt-2 pb-5">
                <h2 className="text-xl  font-bold">{h4c1[0]?.headLine}</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: details1 }}
                  className="text-lg mt-2 line-clamp-2"
                ></div>
              </div>
            </div>
            {/* ----------------h2c2----------- */}
            <div
               onClick={() => navigate(`/category/${h4c2[0]?._id}`)}
              className="card cursor-pointer max-w-[600px]  shadow-sm"
            >
              <figure>
                <img
                  className="w-full h-[350px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                  src={h4c2[0]?.image || h4c2[0]?.imageUrl}
                  alt="Business"
                />
              </figure>
              <div className="px-2 pt-2 pb-5">
                <h2 className="text-xl  font-bold">{h4c2[0]?.headLine}</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: details2 }}
                  className="text-lg mt-2 line-clamp-2"
                ></div>
              </div>
            </div>
            {/* ----------------h2c3----------- */}
            <div
               onClick={() => navigate(`/category/${h4c3[0]?._id}`)}
              className="card cursor-pointer max-w-[600px]  shadow-sm"
            >
              <figure>
                <img
                  className="w-full h-[350px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                  src={h4c3[0]?.image || h4c3[0]?.imageUrl}
                  alt="Business"
                />
              </figure>
              <div className="px-2 pt-2 pb-5">
                <h2 className="text-xl  font-bold">{h4c3[0]?.headLine}</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: details3 }}
                  className="text-lg mt-2 line-clamp-2"
                ></div>
              </div>
            </div>
            {/* ----------------h2c4----------- */}
            <div
               onClick={() => navigate(`/category/${h4c4[0]?._id}`)}
              className="card cursor-pointer max-w-[600px]  shadow-sm"
            >
              <figure>
                <img
                  className="w-full h-[350px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                  src={h4c4[0]?.image || h4c4[0]?.imageUrl}
                  alt="Business"
                />
              </figure>
              <div className="px-2 pt-2 pb-5">
                <h2 className="text-xl  font-bold">{h4c4[0]?.headLine}</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: details4 }}
                  className="text-lg mt-2 line-clamp-2"
                ></div>
              </div>
            </div>
            {/* ----------------h2c5----------- */}
            <div
               onClick={() => navigate(`/category/${h4c5[0]?._id}`)}
              className="card cursor-pointer max-w-[600px]  shadow-sm"
            >
              <figure>
                <img
                  className="w-full h-[350px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                  src={h4c5[0]?.image || h4c5[0]?.imageUrl}
                  alt="Business"
                />
              </figure>
              <div className="px-2 pt-2 pb-5">
                <h2 className="text-xl  font-bold">{h4c5[0]?.headLine}</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: details5 }}
                  className="text-lg mt-2 line-clamp-2"
                ></div>
              </div>
            </div>
            {/* ----------------h2c6----------- */}
            <div
                onClick={() => navigate(`/category/${h4c6[0]?._id}`)}
              className="card cursor-pointer max-w-[600px]  shadow-sm"
            >
              <figure>
                <img
                  className="w-full h-[350px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                  src={h4c6[0]?.image || h4c6[0]?.imageUrl}
                  alt="Business"
                />
              </figure>
              <div className="px-2 pt-2 pb-5">
                <h2 className="text-xl  font-bold">{h4c6[0]?.headLine}</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: details6 }}
                  className="text-lg mt-2 line-clamp-2"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Business;
