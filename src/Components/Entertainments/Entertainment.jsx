import React, { useEffect, useState } from "react";
import axiosInstance from "../../Hook/useAxios";
import { Link, useNavigate } from "react-router";

const Entertainment = () => {
  const navigate = useNavigate();
  const [entertainments, setEntertainments] = useState([]);
  useEffect(() => {
    axiosInstance.get("/entertainment").then((res) => {
      const data = res.data;
      setEntertainments(data);
    });
  }, []);
  return (
    <div className="mb-20">
      <div className="flex items-center justify-between">
        <h1 className="uppercase text-2xl font-bold w-max mb-10 border-b-3">
          Entertainment
        </h1>
        <Link to={"/category/6"}>
          <h1 className="text-lg font-semibold border-b-2">View All</h1>
        </Link>
      </div>
      <div className="">
        <div className="h-auto w-full ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {entertainments.map((ent) => (
              <div
                onClick={() => navigate(`/category/${ent.id}`)}
                key={ent._id}
                className="card cursor-pointer max-w-[600px]  shadow-sm"
              >
                <figure>
                  <img
                    className="w-full h-[350px] transform transition-transform duration-300 ease-in-out hover:scale-110"
                    src={ent.thumbnail_url}
                    alt="entertainment"
                  />
                </figure>
                <div className="px-2 pt-2 pb-5">
                  <h2 className="text-xl font-bold">{ent.title}</h2>
                  <p className="text-lg truncate">{ent.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entertainment;
