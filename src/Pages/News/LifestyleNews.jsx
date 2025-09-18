import React, { useEffect, useState } from "react";
import axiosInstance from "../../Hook/useAxios";
import { useNavigate } from "react-router";

const LifestyleNews = () => {
  const navigate = useNavigate();
  const [lifestyleNews, setLifestyleNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/all-lifestyle-news")
      .then((res) => {
        const data = res.data;
        setLifestyleNews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching lifestyle news:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mb-20">
      <h1 className="uppercase text-2xl font-bold w-max mb-10 border-b-3 mt-5">
        Lifestyle News
      </h1>

      {loading ? (
        <div className="text-center py-10">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : lifestyleNews.length === 0 ? (
        <div className="text-center py-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="No data"
            className="w-32 mx-auto mb-4 opacity-70"
          />
          <h2 className="text-xl font-semibold text-gray-600">
            No Lifestyle News Found
          </h2>
          <p className="text-gray-500">Please check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {lifestyleNews.map((life) => (
            <div
              onClick={() => navigate(`/category/${life?._id}`)}
              className="card cursor-pointer max-w-[600px]  shadow-sm"
            >
              <figure>
                <img
                  className="w-full h-[350px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                  src={life?.image || life?.imageUrl}
                  alt="Business"
                />
              </figure>
              <div className="px-2 pt-2 pb-5">
                <h2 className="text-xl  font-bold">{life?.headLine}</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: life?.details }}
                  className="text-lg mt-2 line-clamp-2"
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LifestyleNews;
