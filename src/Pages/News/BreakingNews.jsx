import React, { useEffect, useState } from "react";
import axiosInstance from "../../Hook/useAxios";
import { Link, useNavigate } from "react-router";

const BreakingNews = () => {
  const navigate = useNavigate();
  const [breakingNews, setBreakingNews] = useState([]);
  useEffect(() => {
    axiosInstance.get("/breaking-news").then((res) => {
      const data = res.data;
      setBreakingNews(data);
    });
  }, []);
  return (
    <div className="mb-20">
      <div>
        <h1 className="uppercase text-2xl font-bold w-max mb-10 border-b-3 mt-5">
          Breaking News
        </h1>
      </div>
      <div className="">
        <div className="h-auto w-full ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {breakingNews.map((bp) => (
             <div
              onClick={() => navigate(`/category/${bp?._id}`)}
              className="card cursor-pointer max-w-[600px]  shadow-sm"
            >
              <figure>
                <img
                  className="w-full h-[350px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                  src={bp?.image || bp?.imageUrl}
                  alt="Business"
                />
              </figure>
              <div className="px-2 pt-2 pb-5">
                <h2 className="text-xl  font-bold">{bp?.headLine}</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: bp?.details }}
                  className="text-lg mt-2 line-clamp-2"
                ></div>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
