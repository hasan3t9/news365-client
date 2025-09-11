import React, { useEffect, useState } from "react";
import axiosInstance from "../../Hook/useAxios";
import { useNavigate } from "react-router";

const LifestyleNews = () => {
  const navigate = useNavigate();
  const [lifestyleNews, setLifestyleNews] = useState([]);
  const [loading, setLoading] = useState(true); // Optional: loading state

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
          {lifestyleNews.map((ent) => (
            <div
              onClick={() => navigate(`/category/${ent.id}`)}
              key={ent._id}
              className="card cursor-pointer max-w-[600px] shadow-sm"
            >
              <figure>
                <img
                  className="w-full h-[350px] object-cover transform transition-transform duration-500 ease-in-out hover:scale-110"
                  src={ent?.thumbnail_url}
                  alt="Lifestyle News"
                />
              </figure>
              <div className="px-2 pt-2 pb-5">
                <h2 className="text-xl font-bold">{ent?.title}</h2>
                <p className="text-lg truncate text-gray-700">{ent?.details}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LifestyleNews;
