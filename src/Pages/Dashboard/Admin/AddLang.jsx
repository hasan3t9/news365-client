import React from "react";
import axiosInstance from "../../../Hook/useAxios";
import Swal from "sweetalert2";

const AddLang = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    axiosInstance
      .post("/add-language", { name })
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: `Category "${name}" added successfully.`,
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((err) => {
        console.log(err);
      });
    e.target.reset();
  };
  return (
    <div className="flex items-center justify-center pt-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 p-6 border border-gray-200 bg-gray-100 rounded-2xl shadow-xl w-full max-w-md"
      >
        <div className="font-bold text-3xl text-center py-4">Add Language</div>
        <label htmlFor="name">Language Name</label>
        <input
          type="text"
          required
          id="name"
          name="name"
          className="input w-full"
        />
        <button type="submit" className="btn btn-primary mt-4">
          Add Language
        </button>
      </form>
    </div>
  );
};

export default AddLang;
