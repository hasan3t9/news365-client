import React, { useEffect, useState } from "react";
import axiosInstance from "../../../Hook/useAxios";
import { CKEditor } from "ckeditor4-react";
import { toast } from "react-toastify";

export default function AddNewsPost() {
  const [details, setDetails] = useState("");
  const [categories, setCategories] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);

  const [formData, setFormData] = useState({
    language: "",
    category: "",
    subCategory: "",
    categoryPosition: "",
    homePosition: "",
    releaseDate: "",
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

  useEffect(() => {
    axiosInstance.get("/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  // handle input change
  const handleChange = async (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (!file) return;

      setLoadingImage(true);

      // Cloudinary upload
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "my_preset");
      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/dwsj0yzda/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );
        const uploadRes = await res.json();

        setFormData((prev) => ({
          ...prev,
          [name]: uploadRes.secure_url,
        }));
      } catch (err) {
        console.error("Cloudinary upload error:", err);
      } finally {
        setLoadingImage(false);
      }
    } else if (name in formData.post) {
      
      setFormData((prev) => ({
        ...prev,
        post: {
          ...prev.post,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // handle form submit
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
        releaseDate: "",
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
          {/* Short Head */}
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
            config={{
              toolbar: "Full",
            }}
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
                name="reporter"
                value={formData.reporter}
                onChange={handleChange}
                className="select select-bordered join-item w-full"
              >
                <option disabled value="">
                  Select Reporter
                </option>
                <option value="Shaeed">Shaeed</option>
                <option value="Hasan">Hasan</option>
              </select>
              <button type="button" className="btn btn-primary join-item">
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

        {/* Post Tags, Reference, Meta Keywords */}
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
              />{" "}
              {field.replace(/([A-Z])/g, " $1")}
            </label>
          ))}
        </div>

        {/* Save Button */}
        <div>
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
