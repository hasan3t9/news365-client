import React, { useEffect } from "react";
import { useLoaderData } from "react-router";
import {
  FaEye,
  FaStar,
  FaTags,
  FaCalendarAlt,
  FaUserCircle,
} from "react-icons/fa";

const NewsDetails = () => {
  const data = useLoaderData();
  const news = data[0];

    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 font-sans">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight text-gray-900">
        {news?.title}
      </h1>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-4 items-center text-sm text-gray-600 mb-6">
        <div className="flex items-center gap-1">
          <FaUserCircle className="text-blue-500" />
          <span>{news?.author?.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaCalendarAlt className="text-green-500" />
          <span>{new Date(news?.author?.published_date).toDateString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaEye className="text-purple-500" />
          <span>{news.total_view?.toLocaleString()} views</span>
        </div>
        {/* <div className="flex items-center gap-1">
          <FaStar className="text-yellow-500" />
          <span>Rating: {news?.rating?.number}</span>
        </div> */}
        {news.rating?.badge && (
          <span className="px-2 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold uppercase tracking-wide">
            {news?.rating.badge}
          </span>
        )}
      </div>

      {/* Author Image */}
      <div className="mb-6 flex items-center gap-4">
        <img
          src={news?.author?.img}
          alt={news?.author?.name}
          className="w-12 h-12 rounded-full border border-gray-300 object-cover"
        />
        <div>
          <p className="text-sm font-medium">{news?.author?.name}</p>
          <p className="text-xs text-gray-500">
            {new Date(news?.author?.published_date).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Main Image */}
      <img
        src={news?.thumbnail_url}
        alt={news?.title}
        className="w-full h-[400px] object-cover rounded-lg shadow-md mb-8"
      />

      {/* Details */}
      <div className="prose max-w-none text-lg text-gray-800 leading-relaxed mb-10">
        {news?.details}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {news?.tags?.map((tag, idx) => (
          <span
            key={idx}
            className="flex items-center gap-1 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
          >
            <FaTags />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default NewsDetails;
