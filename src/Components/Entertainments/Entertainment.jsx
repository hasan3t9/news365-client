import React, { useEffect, useState } from "react";
import axiosInstance from "../../Hook/useAxios";

const Entertainment = () => {
  const [entertainments, setEntertainments] = useState([]);
  useEffect(() => {
    axiosInstance.get("/entertainment").then((res) => {
      const data = res.data;
      setEntertainments(data);
    });
  }, []);
  return (
    <div className="mb-20">
      <div>
        <h1 className="uppercase text-2xl font-bold w-max mb-10 border-b-3">
          Entertainment
        </h1>
      </div>
      <div className="">
        <div className="h-auto w-full ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {entertainments.map((ent) => (
              <div key={ent._id} className="card  max-w-[600px]  shadow-sm">
                <figure>
                  <img
                    className="w-full h-[350px]"
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
