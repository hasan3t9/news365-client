import React, { useEffect, useState } from "react";
import axiosInstance from "../../../Hook/useAxios";
import Swal from "sweetalert2";
import { Link } from "react-router";

const PostList = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const newsPerPage = 10;

  useEffect(() => {
    axiosInstance.get("/all-news365").then((res) => {
      setNews(res.data);
    });
  }, []);

  // Filter by title or author name
  const filteredNews = news.filter((item) => {
    const title = item?.title?.toLowerCase() || "";
    const author = item?.author?.name?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();
    return title.includes(search) || author.includes(search);
  });

  // Pagination calculations
  const indexOfLast = currentPage * newsPerPage;
  const indexOfFirst = indexOfLast - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredNews.length / newsPerPage);

  const toggleExpand = (id) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This post will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/news/${id}`)
          .then((res) => {
            if (res.status === 200) {
              setNews((prevNews) => prevNews.filter((post) => post._id !== id));
              Swal.fire("Deleted!", "The post has been deleted.", "success");
            }
          })
          .catch((error) => {
            Swal.fire(
              "Error!",
              "Something went wrong while deleting the post.",
              error,
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mt-5 mb-12">
        <h2 className="text-xl font-bold">All News Posts</h2>
        <input
          type="text"
          placeholder="Search by Title or Author"
          className="input  input-info w-full max-w-xs"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-sm">
          <thead className="bg-base-200 text-sm">
            <tr>
              <th>Sl</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Post By</th>
            </tr>
          </thead>
          <tbody>
            {currentNews.length > 0 ? (
              currentNews.map((item, index) => {
                const sl = (currentPage - 1) * newsPerPage + index + 1;
                const isExpanded = expandedRow === item._id;

                return (
                  <React.Fragment key={item._id}>
                    <tr
                      className="cursor-pointer hover:bg-base-100"
                      onClick={() => toggleExpand(item._id)}
                    >
                      <td>{sl}</td>
                      <td>
                        <img
                          src={item?.image || item?.imageUrl}
                          alt="thumb"
                          className="w-16 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="font-medium">{item?.headLine}</td>
                      <td>
                        <span className="badge badge-success text-white">
                          {item?.category || "N/A"}
                        </span>
                      </td>
                      <td className="text-blue-600">
                        {item?.reporter || "N/A"}
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr>
                        <td colSpan="5" className="bg-base-100">
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 text-sm">
                            <div>
                              <strong>Sub category:</strong>{" "}
                              {item?.subCategory || "N/A"}
                            </div>
                            {/* <div>
                              <strong>Hit:</strong> {item?.total_view}
                            </div> */}
                            <div>
                              <strong>Post by:</strong> {item?.reporter}
                            </div>
                            <div>
                              <strong>Release date:</strong>{" "}
                              {item?.releaseDate || "N/A"}
                            </div>
                            <div>
                              <strong>Post date:</strong> {item?.date || "N/A"}
                            </div>
                            <div>
                              <strong>Language:</strong> {item?.language}
                            </div>
                            <div>
                              <strong>Status:</strong>{" "}
                              <span className="ml-2 badge badge-success">
                                Publish
                              </span>
                            </div>
                            <div>
                              <strong>Social Post:</strong>{" "}
                              <span className="badge ml-2 badge-warning">
                                Post
                              </span>
                            </div>
                            <div>
                              <strong>Action:</strong>
                              <div className="flex gap-2 mt-1 font-bold text-sm">
                                <Link to={`/dashboard/edit-post/${item._id}`}>
                                  <button className="btn btn-xs btn-success">
                                    <i className="fas fa-eye"></i> Edit
                                  </button>
                                </Link>
                                <Link to={`/category/${item._id}`}>
                                  <button className="btn btn-xs btn-warning">
                                    <i className="fas fa-edit"></i> View
                                  </button>
                                </Link>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(item._id);
                                  }}
                                  className="btn btn-xs btn-error"
                                >
                                  <i className="fas fa-trash"></i> Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2 flex-wrap">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-sm"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`btn btn-sm ${
                currentPage === i + 1 ? "btn-primary text-white" : "btn-ghost"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn btn-sm"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PostList;
