import React, { useEffect } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
  FaWhatsapp,
} from "react-icons/fa";
import { useLoaderData } from "react-router";

export default function NewsDetails() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const data = useLoaderData();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Category */}
      <div className="inline-block bg-green-600 text-white px-3 py-1 text-sm font-semibold rounded">
        {data?.category}
      </div>

      {/* Headline */}
      <h1 className="text-3xl md:text-4xl font-bold mt-4 leading-snug">
        {data?.headLine}
      </h1>

      <div className="lg:flex lg:items-center lg:justify-between">
        {/* Reporter + Date */}
        <div className="flex items-center gap-4 text-gray-600 mt-2 text-sm">
          <span>By {data?.reporter}</span>
          <span>{new Date(data?.releaseDate).toDateString()}</span>
          <span>0 Comments</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-3">
          <button className="px-2 py-1 bg-gray-100 rounded text-lg font-bold">
            A+
          </button>
          <button className="px-2 py-1 bg-gray-100 rounded text-lg font-bold">
            A-
          </button>
          <div className="flex items-center gap-2 ml-2">
            <FaFacebookF className="w-5 h-5 text-blue-600 cursor-pointer" />
            <FaTwitter className="w-5 h-5 text-sky-500 cursor-pointer" />
            <FaLinkedinIn className="w-5 h-5 text-blue-700 cursor-pointer" />
            <FaPinterestP className="w-5 h-5 text-red-600 cursor-pointer" />
            <FaWhatsapp className="w-5 h-5 text-green-600 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="mt-5">
        <img
          src={data?.image || data.imageUrl}
          alt={data?.imageAlt}
          title={data?.imageTitle}
          className="w-full h-[550px] rounded-lg shadow-md"
        />
      </div>

      {/* Article Body */}
      <div
        className="prose max-w-none mt-6 prose-lg prose-blue"
        dangerouslySetInnerHTML={{ __html: data?.details }}
      ></div>
    </div>
  );
}
