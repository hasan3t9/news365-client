import React, { useContext, useState } from "react";
import axiosInstance from "../../../Hook/useAxios";
import Swal from "sweetalert2";
import AuthContext from "../../../Provider/AuthContext";

const AddPost = () => {
  const { user } = useContext(AuthContext);
  console.log(user.displayName);
  const [formData, setFormData] = useState({
    id: "",
    category_id: "",
    title: "",
    rating: {
      number: "",
      badge: "",
    },
    total_view: "",
    author: {
      name: `${user?.displayName}`,
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
    category_name: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes("rating.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        rating: {
          ...prev.rating,
          [key]: key === "number" ? Number(value) : value,
        },
      }));
    } else if (name.includes("author.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        author: {
          ...prev.author,
          [key]: value,
        },
      }));
    } else if (name.includes("others.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        others: {
          ...prev.others,
          [key]: checked,
        },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const finalData = {
      ...formData,
      category_id: Number(formData.category_id),
      total_view: Number(formData.total_view),
      tags: tagsArray,
      rating: {
        number: Number(formData.rating.number),
        badge: formData.rating.badge,
      },
      author: {
        ...formData.author,
        published_date: formData.author.published_date,
      },
      production: Boolean(formData.production),
    };

    axiosInstance
      .post("/all-news", finalData)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Post Created!",
          text: "Your post was submitted successfully.",
          confirmButtonColor: "#6366f1",
        });

        // Reset the form
        setFormData({
          id: "",
          category_id: "",
          title: "",
          rating: { number: "", badge: "" },
          total_view: "",
          author: { name: `${user?.displayName}`, published_date: "", img: "" },
          thumbnail_url: "",
          image_url: "",
          details: "",
          tags: "",
          others: { is_today_pick: false, is_trending: false },
          production: false,
          category_name: "",
        });
      })
      .catch((error) => {
        console.error("Error submitting post:", error);

        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "Something went wrong. Please try again later.",
          confirmButtonColor: "#ef4444",
        });
      });
  };

  return (
    <div className=" mx-auto p-6  bg-white shadow-lg rounded-md animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">
        Create a New Post
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Post ID */}
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
            />
          </div>

          {/* Category */}
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

          {/* Title */}
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

          {/* Rating */}
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

          {/* Views */}
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

          {/* Author */}

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Author Name
            </label>
            <input
              type="text"
              name="author.name"
              defaultValue={user?.displayName}
              value={user?.displayName}
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
              value={formData.author.published_date.split("T")[0]}
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

          {/* Media URLs */}

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

        {/* Details */}
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

        {/* Tags */}
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

        {/* Checkboxes */}
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

        {/* Submit */}
        <div className="">
          <button
            type="submit"
            className="w-full bg-indigo-600 mb-10 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 shadow-md transition"
          >
            Submit Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
