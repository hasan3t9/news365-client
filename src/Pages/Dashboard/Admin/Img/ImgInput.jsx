import { useState, useEffect } from "react";
import axiosInstance from "../../../../Hook/useAxios";

const ImgInput = () => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [reference, setReference] = useState("");
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  // Fetch images from backend
  const fetchImages = async () => {
    try {
      const res = await axiosInstance.get("/images");
      setImages(res.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Upload image
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);
    formData.append("reference", reference);

    try {
      await axiosInstance.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // reset form
      setFile(null);
      setCaption("");
      setReference("");
      // refresh images
      fetchImages();
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  // Reset search
  const handleSearchReset = () => setSearch("");

  // Select image
  const handleSelectImage = (url) => {
    setSelectedImage(url);
  };

  // Filter images by caption or filename
  const filtered = images.filter(
    (img) =>
      img.caption?.toLowerCase().includes(search.toLowerCase()) ||
      img.filename?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Upload form */}
      <form onSubmit={handleUpload} className="space-y-2">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="block"
        />
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="border px-2 py-1 block w-full"
        />
        <input
          type="text"
          placeholder="Reference"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          className="border px-2 py-1 block w-full"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Upload
        </button>
      </form>

      {/* Selected Image input */}
      <div className="mt-4">
        <label className="font-bold">Selected Image:</label>
        <input
          type="text"
          value={selectedImage}
          placeholder="Click any image below"
          readOnly
          className="border p-1 w-full mt-1"
        />

        {/* Preview */}
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Selected"
            className="mt-2 border rounded w-48"
          />
        )}
      </div>

      {/* Image list with search */}
      <div className="mt-6">
        <h3 className="font-bold text-lg mb-2">Images List</h3>
        <div className="flex space-x-2 mb-3">
          <input
            type="text"
            placeholder="Search by caption or filename"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-2 py-1 flex-1"
          />
          <button
            onClick={handleSearchReset}
            className="bg-yellow-500 text-white px-3 rounded"
          >
            Reset
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {filtered.map((img, i) => (
            <div
              key={i}
              className={`border rounded overflow-hidden cursor-pointer hover:ring-2 hover:ring-green-500 ${
                selectedImage === img.urls.original
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
              onClick={() => handleSelectImage(img.urls.original)}
            >
              <img
                src={img.urls.thumb}
                alt={img.caption || img.filename}
                className="w-full h-auto"
              />
              <p className="text-xs text-center truncate px-1">
                {img.caption || img.filename}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImgInput;
