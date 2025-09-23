import React, { useEffect, useState } from "react";
import axiosInstance from "../../../Hook/useAxios";
import { FaEdit, FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function NewsPostList() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get("/all-news365").then((res) => setPosts(res.data));
  }, []);

  const [expandedRow, setExpandedRow] = useState(null);
  const toggleExpand = (id) =>
    setExpandedRow(expandedRow === id ? null : id);

  const filteredPosts = posts.filter((post) =>
    post.headLine?.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPosts.length / entriesPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/all-news365/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Your data has been deleted.", "success");
            setPosts((prev) => prev.filter((p) => p._id !== id));
          })
          .catch(() => Swal.fire("Error!", "Something went wrong.", "error"));
      }
    });
  };

  return (
    <div className="overflow-x-auto lg:p-4">
      <h1 className="font-bold text-2xl mb-10">Post List</h1>

      {/* Top Controls */}
      <div className="flex flex-col gap-3 lg:flex-row justify-between items-center mb-10">
        <div>
          Show{" "}
          <select
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border px-1 py-0.5"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>{" "}
          entries
        </div>
        <div>
          Search:{" "}
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border px-2 py-0.5"
          />
        </div>
      </div>

      {/* Table */}
      <table className="table-fixed w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr className="text-sm">
            <th className="border border-gray-300 px-2 py-1 w-[8%] lg:w-[2%]">
              SL
            </th>
            <th className="border border-gray-300 px-2 py-1 w-[25%] lg:w-[12%]">
              Image
            </th>
            <th className="border border-gray-300 px-2 py-1 w-[39%] lg:w-[24%]">
              Title
            </th>
            <th className="border border-gray-300 px-2 py-1 w-[28%] lg:w-[7%]">
              Category
            </th>
            <th className="border border-gray-300 px-2 py-1 hidden lg:table-cell lg:w-[6%]">
              Sub Category
            </th>
            <th className="border border-gray-300 px-2 py-1 hidden lg:table-cell lg:w-[3%]">
              Hit
            </th>
            <th className="border border-gray-300 px-2 py-1 hidden lg:table-cell lg:w-[6%]">
              Post By
            </th>
            <th className="border border-gray-300 px-2 py-1 hidden lg:table-cell lg:w-[6%]">
              Release Date
            </th>
            <th className="border border-gray-300 px-2 py-1 hidden lg:table-cell lg:w-[6%]">
              Post Date
            </th>
            <th className="border border-gray-300 px-2 py-1 hidden lg:table-cell lg:w-[6%]">
              Language
            </th>
            <th className="border border-gray-300 px-2 py-1 hidden lg:table-cell lg:w-[6%]">
              Status
            </th>
            <th className="border border-gray-300 px-2 py-1 hidden lg:table-cell lg:w-[4%]">
              Social Post
            </th>
            <th className="border border-gray-300 px-2 py-1 hidden lg:table-cell lg:w-[10%]">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {currentPosts.map((post, index) => (
            <React.Fragment key={post._id}>
              <tr>
                <td
                  onClick={() => toggleExpand(post._id)}
                  className="border border-gray-300 lg:px-2 py-1 cursor-pointer text-blue-600 font-semibold text-center"
                >
                  {indexOfFirst + index + 1}
                </td>
                <td className="border border-gray-300 px-1 py-1">
                  <img
                    src={post?.image || post?.imageUrl}
                    className="w-[80%] mx-auto h-20 object-cover"
                    alt="post"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1 text-sm lg:text-base text-center break-words max-h-[3rem] overflow-hidden">
                  {post.headLine}
                </td>
                <td className="border border-gray-300 py-1 text-sm w-max text-center break-words">
                  <p className="inline-block bg-green-700 text-white font-bold px-1 text-center rounded">
                    {post.category}
                  </p>
                </td>

                <td className="border border-gray-300 px-2 py-1 hidden lg:table-cell break-words">
                  {post.subCategory || "-"}
                </td>
                <td className="border border-gray-300 px-2 py-1 hidden lg:table-cell">
                  {post.hit || 0}
                </td>
                <td className="border border-gray-300 px-2 py-1 hidden lg:table-cell break-words">
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
                <td className="border border-gray-300 py-1 w-max text-center hidden lg:table-cell">
                  <span className="inline-block bg-green-700 text-white font-semibold px-1 text-center">
                    {post.post?.status ? "Publish" : "Draft"}
                  </span>
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center hidden lg:table-cell">
                  <span className="bg-yellow-500 font-semibold px-2 py-1">
                    {post.post?.autoSocial ? "Post" : "No"}
                  </span>
                </td>
                <td className="border border-gray-300 px-1 py-1 hidden lg:table-cell text-center">
                  <button
                    onClick={() => navigate(`/dashboard/edit-post/${post._id}`)}
                    className="text-green-700 bg-green-100 p-2 border border-green-400 rounded hover:bg-green-200"
                  >
                    <FaEdit size={17} />
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-red-500 bg-red-100 p-2 border border-red-400 rounded ml-1 hover:bg-red-200"
                  >
                    <RiDeleteBin6Line size={17} />
                  </button>
                  <button
                    onClick={() => navigate(`/category/${post._id}`)}
                    className="text-green-700 bg-green-100 p-2 border border-green-400 rounded ml-1 hover:bg-green-200"
                  >
                    <FaEye size={17} />
                  </button>
                </td>
              </tr>

              {/* Expandable Row for Mobile */}
              {expandedRow === post._id && (
               <tr className="lg:hidden">
                  <td
                    colSpan="4"
                    className="border border-gray-300 py-2 bg-gray-50"
                  >
                    <div className="text-sm space-y-1">
                      <p className="border-b border-orange-100 py-2 ml-2 flex">
                        <span className="font-semibold w-32">
                          Sub Category:
                        </span>
                        <span>{post.subCategory || "-"}</span>
                      </p>
                      <p className="border-b border-orange-100 py-2 ml-2 flex">
                        <span className="font-semibold w-32">Hit:</span>
                        <span>{post.hit || 0}</span>
                      </p>
                      <p className="border-b border-orange-100 py-2 ml-2 flex">
                        <span className="font-semibold w-32">Post By:</span>
                        <span>{post.reporter}</span>
                      </p>
                      <p className="border-b border-orange-100 py-2 ml-2 flex">
                        <span className="font-semibold w-32">
                          Release Date:
                        </span>
                        <span>{post.releaseDate}</span>
                      </p>
                      <p className="border-b border-orange-100 py-2 ml-2 flex">
                        <span className="font-semibold w-32">Post Date:</span>
                        <span>
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </p>
                      <p className="border-b border-orange-100 py-2 ml-2 flex">
                        <span className="font-semibold w-32">Language:</span>
                        <span>{post.language}</span>
                      </p>
                      <p className="border-b border-orange-100 py-2 ml-2 flex">
                        <span className="font-semibold w-32">Status:</span>
                        <span className="inline-block bg-green-700 text-white font-semibold p-2 text-center">
                          {post.post?.status ? "Publish" : "Draft"}
                        </span>
                      </p>
                      <p className="border-b border-orange-100 py-2 ml-2 flex">
                        <span className="font-semibold w-32">Social Post:</span>
                        <span className="bg-yellow-500 font-semibold px-2 py-1">
                          {post.post?.autoSocial ? "Post" : "No"}
                        </span>
                      </p>

                      {/* Action */}
                      <div className="flex items-center gap-2 pt-1 ml-2">
                        <span className="font-semibold w-32">Action:</span>
                        <button
                          onClick={() =>
                            navigate(`/dashboard/edit-post/${post._id}`)
                          }
                          className="text-green-700 bg-green-100 p-2 border border-green-400 rounded cursor-pointer hover:bg-green-200"
                        >
                          <FaEdit size={17} />
                        </button>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="text-red-500 bg-red-100 p-2 border border-red-400 rounded ml-1 cursor-pointer hover:bg-red-200"
                        >
                          <RiDeleteBin6Line size={17} />
                        </button>
                        <button
                          onClick={() => navigate(`/category/${post._id}`)}
                          className="text-green-700 bg-green-100 p-2 border border-green-400 rounded ml-1 cursor-pointer hover:bg-green-200"
                        >
                          <FaEye size={17} />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-2">
        <p>
          Showing {indexOfFirst + 1} to{" "}
          {Math.min(indexOfLast, filteredPosts.length)} of {filteredPosts.length} entries
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              className={`px-2 py-1 ${
                currentPage === num ? "bg-green-700 text-white rounded" : ""
              }`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
