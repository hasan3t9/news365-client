import React, { useEffect, useState } from "react";
import axiosInstance from "../../Hook/useAxios";
import { useNavigate } from "react-router";

const HealthNews = () => {
  const navigate = useNavigate();
  const [healthNews, setHealthNews] = useState([]);
  useEffect(() => {
    axiosInstance.get("/all-health-news").then((res) => {
      const data = res.data;
      setHealthNews(data);
    });
  }, []);
  return (
    <div className="mb-20">
      <div>
        <h1 className="uppercase text-2xl font-bold w-max mb-10 border-b-3 mt-5">
          Health News
        </h1>
      </div>
      <div className="">
        <div className="h-auto w-full ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {healthNews.map((ent) => (
              <div
                onClick={() => navigate(`/category/${ent.id}`)}
                key={ent._id}
                className="card cursor-pointer  max-w-[600px]  shadow-sm"
              >
                <figure>
                  <img
                    className="w-full h-[350px] transform transition-transform duration-500 ease-in-out hover:scale-110"
                    src={ent?.thumbnail_url}
                    alt="Health News"
                  />
                </figure>
                <div className="px-2 pt-2 pb-5">
                  <h2 className="text-xl font-bold">{ent?.title}</h2>
                  <p className="text-lg truncate">{ent?.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthNews;
