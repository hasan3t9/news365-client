import React, { useEffect, useState } from "react";
import axiosInstance from "../../Hook/useAxios";
import { useNavigate } from "react-router";

const BusinessNews = () => {
  const navigate = useNavigate();
  const [businessNews, setBusinessNews] = useState([]);
  useEffect(() => {
    axiosInstance.get("/all-business-news").then((res) => {
      const data = res.data;
      setBusinessNews(data);
    });
  }, []);
  return (
    <div className="mb-20">
      <div>
        <h1 className="uppercase text-2xl font-bold w-max mb-10 border-b-3 mt-5">
          Business News
        </h1>
      </div>
      <div className="">
        <div className="h-auto w-full ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {businessNews.map((bus) => (
              <div
                onClick={() => navigate(`/category/${bus?._id}`)}
                className="card cursor-pointer max-w-[600px]  shadow-sm"
              >
                <figure>
                  <img
                    className="w-full h-[350px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                    src={bus?.image || bus?.imageUrl}
                    alt="Business"
                  />
                </figure>
                <div className="px-2 pt-2 pb-5">
                  <h2 className="text-xl  font-bold">{bus?.headLine}</h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: bus?.details }}
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

export default BusinessNews;
