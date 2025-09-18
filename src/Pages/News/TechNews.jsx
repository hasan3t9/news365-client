import React, { useEffect, useState } from "react";
import axiosInstance from "../../Hook/useAxios";
import { useNavigate } from "react-router";

const TechNews = () => {
  const navigate = useNavigate();
  const [techNews, setTechNews] = useState([]);
  useEffect(() => {
    axiosInstance.get("/all-tech-news").then((res) => {
      const data = res.data;
      setTechNews(data);
    });
  }, []);
  return (
    <div className="mb-20">
      <div>
        <h1 className="uppercase text-2xl font-bold w-max mb-10 border-b-3 mt-5">
          Technology News
        </h1>
      </div>
      <div className="">
        <div className="h-auto w-full ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {techNews.map((tech) => (
              <div
                onClick={() => navigate(`/category/${tech?._id}`)}
                className="card cursor-pointer max-w-[600px]  shadow-sm"
              >
                <figure>
                  <img
                    className="w-full h-[350px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                    src={tech?.image || tech?.imageUrl}
                    alt="Business"
                  />
                </figure>
                <div className="px-2 pt-2 pb-5">
                  <h2 className="text-xl  font-bold">{tech?.headLine}</h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: tech?.details }}
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

export default TechNews;
