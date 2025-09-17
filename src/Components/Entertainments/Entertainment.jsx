import React, { useEffect, useState } from "react";
import axiosInstance from "../../Hook/useAxios";
import { Link } from "react-router";

const Entertainment = () => {
  // const navigate = useNavigate();
  const [h2c1, setH2C1] = useState([]);
  const [h2c2, setH2C2] = useState([]);
  const [h2c3, setH2C3] = useState([]);
  const [h2c4, setH2C4] = useState([]);
  const [h2c5, setH2C5] = useState([]);
  const [h2c6, setH2C6] = useState([]);
  useEffect(() => {
    axiosInstance.get("/all-news365/h2c1").then((res) => {
      const data = res.data;
      setH2C1(data);
    });
    axiosInstance.get("/all-news365/h2c2").then((res) => {
      const data = res.data;
      setH2C2(data);
    });
    axiosInstance.get("/all-news365/h2c3").then((res) => {
      const data = res.data;
      setH2C3(data);
    });
    axiosInstance.get("/all-news365/h2c4").then((res) => {
      const data = res.data;
      setH2C4(data);
    });
    axiosInstance.get("/all-news365/h2c5").then((res) => {
      const data = res.data;
      setH2C5(data);
    });
    axiosInstance.get("/all-news365/h2c6").then((res) => {
      const data = res.data;
      setH2C6(data);
    });
  }, []);
  const details1 = h2c1[0]?.details;
  const details2 = h2c2[0]?.details;
  const details3 = h2c3[0]?.details;
  const details4 = h2c4[0]?.details;
  const details5 = h2c5[0]?.details;
  const details6 = h2c6[0]?.details;

  return (
    <div className="mb-20 px-3 md:px-0">
      <div className="flex items-center mb-10  justify-between">
        <h1 className="uppercase text-2xl font-bold w-max border-b-3">
          Entertainment
        </h1>
        <Link to={"/category/6"}>
          <h1 className="text-lg font-semibold border-b-2">View All</h1>
        </Link>
      </div>
      <div className="">
        <div className="h-auto w-full ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* ----------------h2c1----------- */}
            <div
              // onClick={() => navigate(`/category/${ent.id}`)}
              className="card cursor-pointer max-w-[600px]  shadow-sm"
            >
              <figure>
                <img
                  className="w-full h-[350px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                  src={h2c1[0]?.image || h2c1[0]?.imageUrl}
                  alt="entertainment"
                />
              </figure>
              <div className="px-2 pt-2 pb-5">
                <h2 className="text-xl  font-bold">{h2c1[0]?.headLine}</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: details1 }}
                  className="text-lg mt-2 line-clamp-2"
                ></div>
              </div>
            </div>
            {/* ----------------h2c2----------- */}
            <div
              // onClick={() => navigate(`/category/${ent.id}`)}
              className="card cursor-pointer max-w-[600px]  shadow-sm"
            >
              <figure>
                <img
                  className="w-full h-[350px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                  src={h2c2[0]?.image || h2c2[0]?.imageUrl}
                  alt="entertainment"
                />
              </figure>
              <div className="px-2 pt-2 pb-5">
                <h2 className="text-xl  font-bold">{h2c2[0]?.headLine}</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: details2 }}
                  className="text-lg mt-2 line-clamp-2"
                ></div>
              </div>
            </div>
            {/* ----------------h2c3----------- */}
            <div
              // onClick={() => navigate(`/category/${ent.id}`)}
              className="card cursor-pointer max-w-[600px]  shadow-sm"
            >
              <figure>
                <img
                  className="w-full h-[350px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                  src={h2c3[0]?.image || h2c3[0]?.imageUrl}
                  alt="entertainment"
                />
              </figure>
              <div className="px-2 pt-2 pb-5">
                <h2 className="text-xl  font-bold">{h2c3[0]?.headLine}</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: details3 }}
                  className="text-lg mt-2 line-clamp-2"
                ></div>
              </div>
            </div>
            {/* ----------------h2c4----------- */}
            <div
              // onClick={() => navigate(`/category/${ent.id}`)}
              className="card cursor-pointer max-w-[600px]  shadow-sm"
            >
              <figure>
                <img
                  className="w-full h-[350px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                  src={h2c4[0]?.image || h2c4[0]?.imageUrl}
                  alt="entertainment"
                />
              </figure>
              <div className="px-2 pt-2 pb-5">
                <h2 className="text-xl  font-bold">{h2c4[0]?.headLine}</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: details4 }}
                  className="text-lg mt-2 line-clamp-2"
                ></div>
              </div>
            </div>
            {/* ----------------h2c5----------- */}
            <div
              // onClick={() => navigate(`/category/${ent.id}`)}
              className="card cursor-pointer max-w-[600px]  shadow-sm"
            >
              <figure>
                <img
                  className="w-full h-[350px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                  src={h2c5[0]?.image || h2c5[0]?.imageUrl}
                  alt="entertainment"
                />
              </figure>
              <div className="px-2 pt-2 pb-5">
                <h2 className="text-xl  font-bold">{h2c5[0]?.headLine}</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: details5 }}
                  className="text-lg mt-2 line-clamp-2"
                ></div>
              </div>
            </div>
            {/* ----------------h2c6----------- */}
            <div
              // onClick={() => navigate(`/category/${ent.id}`)}
              className="card cursor-pointer max-w-[600px]  shadow-sm"
            >
              <figure>
                <img
                  className="w-full h-[350px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                  src={h2c6[0]?.image || h2c6[0]?.imageUrl}
                  alt="entertainment"
                />
              </figure>
              <div className="px-2 pt-2 pb-5">
                <h2 className="text-xl  font-bold">{h2c6[0]?.headLine}</h2>
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

export default Entertainment;
