import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import AuthContext from "../../../Provider/AuthContext";
import axiosInstance from "../../../Hook/useAxios";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    id: "",
    category_id: "",
    category_name: "",
    title: "",
    rating: { number: "", badge: "" },
    total_view: "",
    author: {
      name: user?.displayName || "",
      published_date: "",
      img: "",
    },
    thumbnail_url: "",
    image_url: "",
    details: "",
    tags: "",
    others: {
      is_today_pick: false,
      is_trending: false,
    },
    production: false,
  });

  // Load existing post data
  useEffect(() => {
    axiosInstance
      .get(`/all-news/${id}`)
      .then((res) => {
        if (res.data.length === 0) {
          alert("Post not found");
          return navigate("/dashboard/post-list");
        }
        const existingPost = res.data

        setFormData({
          ...existingPost,
          rating: {
            number: existingPost.rating?.number || 0,
            badge: existingPost.rating?.badge || "",
          },
          author: {
            name: existingPost.author?.name || "",
            published_date: existingPost.author?.published_date
              ? existingPost.author.published_date.split("T")[0]
              : "",
            img: existingPost.author?.img || "",
          },
          others: {
            is_today_pick: existingPost.others?.is_today_pick || false,
            is_trending: existingPost.others?.is_trending || false,
          },
          tags: existingPost.tags || "",
          production: existingPost.production || false,
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load post data");
      });
  }, [id, navigate, user]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      tags:
        typeof formData.tags === "string"
          ? formData.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean)
          : formData.tags,
      category_id: Number(formData.category_id),
    };

    axiosInstance
      .put(`/update-news/${id}`, dataToSend)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Post updated successfully!",
            timer: 2000,
            showConfirmButton: false,
          });
        //   toast.success("Post updated successfully!");
          navigate("/dashboard/post-list");
        } else {
          toast.info("No changes detected.");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to update post.");
      });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Edit Post</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Post ID
            </label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Unique Post ID"
              required
              readOnly
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Category ID
            </label>
            <input
              type="number"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              name="category_name"
              value={formData.category_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Rating Number
            </label>
            <input
              type="number"
              name="rating.number"
              value={formData.rating.number}
              onChange={handleChange}
              min={0}
              max={5}
              step={0.1}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Rating Badge
            </label>
            <input
              type="text"
              name="rating.badge"
              value={formData.rating.badge}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Total Views
            </label>
            <input
              type="number"
              name="total_view"
              value={formData.total_view}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Author Name
            </label>
            <input
              type="text"
              name="author.name"
              value={formData.author.name}
              onChange={handleChange}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Published Date
            </label>
            <input
              type="date"
              name="author.published_date"
              value={formData.author.published_date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Author Image URL
            </label>
            <input
              type="url"
              name="author.img"
              value={formData.author.img}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Thumbnail URL
            </label>
            <input
              type="url"
              name="thumbnail_url"
              value={formData.thumbnail_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Main Image URL
            </label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Details
          </label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Post details..."
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="e.g. tech, economy, business"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              name="others.is_today_pick"
              checked={formData.others.is_today_pick}
              onChange={handleChange}
              className="accent-indigo-600 w-4 h-4"
            />
            Today Pick
          </label>

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              name="others.is_trending"
              checked={formData.others.is_trending}
              onChange={handleChange}
              className="accent-indigo-600 w-4 h-4"
            />
            Trending
          </label>

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              name="production"
              checked={formData.production}
              onChange={handleChange}
              className="accent-indigo-600 w-4 h-4"
            />
            Production
          </label>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 mb-10 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 shadow-md transition"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
