import React, { useEffect, useState } from "react";
import axiosInstance from "../../../Hook/useAxios";

export default function NewsPostList() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axiosInstance.get("/all-news365").then((res) => {
      const data = res.data;
      setPosts(data);
    });
  }, []);
  console.log(posts);


    
  const [expandedRow, setExpandedRow] = useState(null);
   const toggleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
      <div className="overflow-x-auto p-2 lg:p-4">
      <table className="table-fixed w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-2 py-1 w-[8%] lg:w-[2%]">SL</th>
            <th className="border border-gray-300 px-2 py-1 w-[23%] lg:w-[15%]">Image</th>
            <th className="border border-gray-300 px-2 py-1 w-[44%] lg:w-[24%]">Title</th>
            <th className="border border-gray-300 px-2 py-1 w-[25%] lg:w-[7%]">Category</th>
            <th className="border border-gray-300 px-2 py-1 hidden lg:table-cell lg:w-[6%]">Sub Category</th>
            <th className="border border-gray-300 px-2 py-1 hidden lg:table-cell lg:w-[3%]">Hit</th>
            <th className="border border-gray-300 px-2 py-1 hidden lg:table-cell lg:w-[6%]">Post By</th>
            <th className="border border-gray-300 px-2 py-1 hidden lg:table-cell lg:w-[6%]">Release Date</th>
            <th className="border border-gray-300 px-2 py-1 hidden lg:table-cell lg:w-[6%]">Post Date</th>
            <th className="border border-gray-300 px-2 py-1 hidden lg:table-cell lg:w-[6%]">Language</th>
            <th className="border border-gray-300 px-2 py-1 hidden lg:table-cell lg:w-[6%]">Status</th>
            <th className="border border-gray-300 px-2 py-1 hidden lg:table-cell lg:w-[4%]">Social Post</th>
            <th className="border border-gray-300 px-2 py-1 hidden lg:table-cell lg:w-[8%]">Action</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post, index) => (
            <React.Fragment key={post._id}>
              {/* Main Row */}
              <tr>
                <td
                  onClick={() => toggleExpand(post._id)}
                  className="border border-gray-300 px-2 py-1 cursor-pointer text-blue-600 font-semibold"
                >
                  {index + 1}
                </td>
                <td className="border  border-gray-300 px-1 py-1">
                  <img
                    src={post?.image || post?.imageUrl
                    }
                    className="w-[80%] mx-auto h-20"
                    alt="post"
                  />
                </td>
                <td className="border border-gray-300 lg:px-2 py-1 text-wrap text-sm lg:text-lg text-center mx-auto">
                  {post.headLine}
                </td>
                <td className="border border-gray-300  py-1 text-sm w-max  text-center ">
                  <p className="inline-block bg-green-700 text-white font-bold  px-1 text-center rounded">
                    {post.category}
                  </p>
                </td>

                {/* Large screen fields only */}
                <td className="border border-gray-300 px-2 py-1 hidden lg:table-cell">
                  {post.subCategory || "-"}
                </td>
                <td className="border border-gray-300 px-2 py-1 hidden lg:table-cell">
                  {post.hit || 0}
                </td>
                <td className="border border-gray-300 px-2 py-1 hidden lg:table-cell">
                  {post.reporter}
                </td>
                <td className="border border-gray-300 px-2 py-1 hidden lg:table-cell">
                  {post.releaseDate}
                </td>
                <td className="border border-gray-300 px-2 py-1 hidden lg:table-cell">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-2 py-1 hidden lg:table-cell">
                  {post.language}
                </td>
                <td className="border border-gray-300 px-2 py-1 hidden lg:table-cell">
                  <span className="inline-block bg-green-700 text-white px-2 py-1 text-center rounded">
                    {post.post?.status ? "Publish" : "Draft"}
                  </span>
                </td>
                <td className="border border-gray-300 px-2 py-1 hidden lg:table-cell">
                  <span className="bg-yellow-500  px-2 py-1 rounded">
                    {post.post?.autoSocial ? "Post" : "No"}
                  </span>
                </td>
                <td className="border border-gray-300 px-2 py-1 hidden lg:table-cell">
                  <button className="text-green-500">✏️</button>
                  <button className="text-red-500 ml-2">🗑️</button>
                  <button className="text-blue-500 ml-2">👁️</button>
                </td>
              </tr>

              {/* Expandable Row for Mobile */}
              {expandedRow === post._id && (
                <tr className="lg:hidden">
                  <td colSpan="4" className="border border-gray-300 px-2 py-2 bg-gray-50">
                    <div className="text-sm space-y-1">
                      <p><span className="font-semibold">Sub Category:</span> {post.subCategory || "-"}</p>
                      <p><span className="font-semibold">Hit:</span> {post.hit || 0}</p>
                      <p><span className="font-semibold">Post By:</span> {post.reporter}</p>
                      <p><span className="font-semibold">Release Date:</span> {post.releaseDate}</p>
                      <p><span className="font-semibold">Post Date:</span> {new Date(post.createdAt).toLocaleDateString()}</p>
                      <p><span className="font-semibold">Language:</span> {post.language}</p>
                      <p><span className="font-semibold">Status:</span> {post.post?.status ? "Publish" : "Draft"}</p>
                      <p><span className="font-semibold">Social Post:</span> {post.post?.autoSocial ? "Yes" : "No"}</p>
                      <div className="flex gap-2 pt-1">
                        <button className="text-green-500">✏️</button>
                        <button className="text-red-500">🗑️</button>
                        <button className="text-blue-500">👁️</button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
