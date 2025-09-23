import React, { useEffect, useState } from "react";
import axiosInstance from "../../../Hook/useAxios";
import { CKEditor } from "ckeditor4-react";
import { toast } from "react-toastify";

export default function AddNewsPost() {
  const [details, setDetails] = useState("");
  const [categories, setCategories] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);
  const [reporters, setReporters] = useState([]);
  const baseURL = "http://localhost:3000";
  const today = new Date().toISOString().split("T")[0];

  // Main News Form Data
  const [formData, setFormData] = useState({
    language: "",
    category: "",
    subCategory: "",
    categoryPosition: "",
    homePosition: "",
    releaseDate: today,
    shortHead: "",
    headLine: "",
    image: "",
    imageAlt: "",
    imageTitle: "",
    imageUrl: "",
    seoTitle: "",
    reporter: "",
    videoUrl: "",
    tags: "",
    reference: "",
    keywords: "",
    metaDescription: "",
    post: {
      latestPost: false,
      breakingPost: false,
      featurePost: false,
      recommendedPost: false,
      status: false,
      schemaSetup: false,
      autoSocial: false,
    },
  });

  // Reporter Form Data
  const [repoFormData, setRepoFormData] = useState({
    email: "",
    reporterName: "",
    designationName: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  // Main Form Input Change
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (!file) return;
      setLoadingImage(true);

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "my_preset");

      fetch(`https://api.cloudinary.com/v1_1/dwsj0yzda/image/upload`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((uploadRes) => {
          setFormData((prev) => ({
            ...prev,
            [name]: uploadRes.secure_url,
          }));
        })
        .catch((err) => console.error("Cloudinary upload error:", err))
        .finally(() => setLoadingImage(false));
    } else if (name in formData.post) {
      setFormData((prev) => ({
        ...prev,
        post: { ...prev.post, [name]: checked },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Reporter Input Change
  const handleReporterChange = (e) => {
    const { name, value, files } = e.target;

    if (e.target.type === "file") {
      const file = files[0];
      if (!file) return;

      setRepoFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setRepoFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Reporter Form Submit
  const handleReporterFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", repoFormData.image); // file
      formData.append("email", repoFormData.email);
      formData.append("reporterName", repoFormData.reporterName);
      formData.append("designationName", repoFormData.designationName);

      await axiosInstance.post("/reporters", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Reporter Added Successfully!");
      setRepoFormData({
        email: "",
        reporterName: "",
        designationName: "",
        image: null,
      });
      setPreview(null);

      document.getElementById("my_modal_3").close();
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Failed to add reporter!");
    }
  };

  // Load Categories
  useEffect(() => {
    axiosInstance.get("/categories").then((res) => {
      setCategories(res.data);
    });
    axiosInstance.get("/reporters").then((res) => setReporters(res.data));
  }, []);

  // Submit News
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formData, details };
    axiosInstance.post("/all-news365", payload).then(() => {
      toast.success("Post Saved Successfully");
      setFormData({
        language: "",
        category: "",
        subCategory: "",
        categoryPosition: "",
        homePosition: "",
        releaseDate: today,
        shortHead: "",
        headLine: "",
        image: "",
        imageAlt: "",
        imageTitle: "",
        imageUrl: "",
        seoTitle: "",
        reporter: "",
        videoUrl: "",
        tags: "",
        reference: "",
        keywords: "",
        metaDescription: "",
        post: {
          latestPost: false,
          breakingPost: false,
          featurePost: false,
          recommendedPost: false,
          status: false,
          schemaSetup: false,
          autoSocial: false,
        },
      });
      setDetails("");
    });
  };

  return (
    <div className="p-6 lg:mx-16 mx-auto">
      <h1 className="text-3xl font-bold mb-10 text-blue-600">Add News Post</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Language, Category, Sub Category, Category Position */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="font-semibold">Language *</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Select Language</option>
              <option value="English">English</option>
              <option value="Bangla">Bangla</option>
              <option value="Arabic">Arabic</option>
            </select>
          </div>
          <div>
            <label className="font-semibold">Category *</label>
            <select
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option disabled value="">
                Select a Category
              </option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-semibold">Sub Category</label>
            <select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Select Sub Category</option>
            </select>
          </div>
          <div>
            <label className="font-semibold">Category Position</label>
            <select
              name="categoryPosition"
              value={formData.categoryPosition}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Select Category Position</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
        </div>

        {/* Home Position, Release Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="font-semibold">Home Position</label>
            <select
              name="homePosition"
              value={formData.homePosition}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option disabled value="">
                Select Home Position
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div>
            <label className="font-semibold">Release Date</label>
            <input
              type="date"
              name="releaseDate"
             
              value={formData.releaseDate}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="col-span-2">
            <label className="font-semibold">Short Head</label>
            <input
              type="text"
              name="shortHead"
              value={formData.shortHead}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter Short Head"
            />
          </div>
        </div>

        {/* Head Line */}
        <div>
          <label className="font-semibold">Head Line *</label>
          <input
            type="text"
            name="headLine"
            value={formData.headLine}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter Head Line"
          />
        </div>

        {/* Details with CKEditor */}
        <div>
          <label className="font-semibold">Details *</label>
          <CKEditor
            initData={details}
            config={{ toolbar: "Full" }}
            onChange={(evt) => setDetails(evt.editor.getData())}
            editorUrl="https://cdn.ckeditor.com/4.17.2/full/ckeditor.js"
          />
        </div>

        {/* Image Upload */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="font-semibold">Image</label>
            <input
              type="file"
              required
              name="image"
              onChange={handleChange}
              className="file-input file-input-bordered w-full"
            />
            {loadingImage && (
              <p className="text-sm text-gray-500">Uploading...</p>
            )}
            {formData.image && (
              <img
                src={formData.image}
                alt="Uploaded Preview"
                className="mt-2 w-32 rounded"
              />
            )}
          </div>
          <div>
            <label className="font-semibold">Image Alt</label>
            <input
              type="text"
              name="imageAlt"
              value={formData.imageAlt}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter Image Alt"
            />
          </div>
          <div>
            <label className="font-semibold">Image Title</label>
            <input
              type="text"
              name="imageTitle"
              value={formData.imageTitle}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter Image Title"
            />
          </div>
        </div>

        {/* Custom Url, SEO Title, Reporter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="font-semibold">Custom URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="https://image.jpg"
            />
          </div>
          <div>
            <label className="font-semibold">SEO title</label>
            <input
              type="text"
              name="seoTitle"
              value={formData.seoTitle}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter SEO Title"
            />
          </div>
          <div>
            <label className="font-semibold">Reporter *</label>
            <div className="join w-full">
              <select
                required={true}
                name="reporter"
                value={formData.reporter}
                onChange={handleChange}
                className="select select-bordered join-item w-full"
              >
                <option disabled value="">
                  Select Reporter
                </option>
                {reporters.map((rep) => (
                  <option key={rep._id} value={rep?.reporterName}>
                    <img
                      className="w-7 h-7 rounded-full"
                      src={`${baseURL}${rep?.image?.original}`}
                      alt={rep?.reporterName}
                    />
                    <p>{rep?.reporterName}</p>
                  </option>
                ))}
              </select>
              <button
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
                type="button"
                className="btn btn-primary join-item"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Video URL */}
        <div>
          <label className="font-semibold">Video URL</label>
          <input
            type="text"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="https://youtube.com/..."
          />
        </div>

        {/* Tags, Reference, Keywords */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Tag1, Tag2"
          />
          <input
            type="text"
            name="reference"
            value={formData.reference}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter Reference"
          />
          <input
            type="text"
            name="keywords"
            value={formData.keywords}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Keyword1, Keyword2"
          />
        </div>

        {/* Meta Description */}
        <div>
          <label className="font-semibold">Meta Description</label>
          <textarea
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            placeholder="Enter Meta Description"
          ></textarea>
        </div>

        {/* Checkboxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "latestPost",
            "breakingPost",
            "featurePost",
            "recommendedPost",
            "status",
            "schemaSetup",
            "autoSocial",
          ].map((field) => (
            <label key={field} className="flex items-center gap-2">
              <input
                type="checkbox"
                name={field}
                checked={formData.post[field]}
                onChange={handleChange}
                className="checkbox"
              />
              {field.replace(/([A-Z])/g, " $1")}
            </label>
          ))}
        </div>

        <div>
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </div>
      </form>
      {/* Reporter Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <div className="flex justify-end">
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </button>
          </div>
          <div className="text-2xl font-bold mb-5">Add Reporter</div>
          <form onSubmit={handleReporterFormSubmit} className="p-4 space-y-3">
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={repoFormData.email}
                onChange={handleReporterChange}
                className="input input-bordered w-full"
                placeholder="example@mail.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Reporter Name</label>
              <input
                type="text"
                name="reporterName"
                value={repoFormData.reporterName}
                onChange={handleReporterChange}
                className="input input-bordered w-full"
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Designation</label>
              <input
                type="text"
                name="designationName"
                value={repoFormData.designationName}
                onChange={handleReporterChange}
                className="input input-bordered w-full"
                placeholder="Enter Designation"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Profile Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleReporterChange}
                className="file-input file-input-bordered w-full"
              />
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="w-32 h-20 object-cover rounded-md mt-2"
                />
              )}
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Add
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}
