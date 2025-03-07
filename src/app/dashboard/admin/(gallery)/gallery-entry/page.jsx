"use client";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useCloudinaryUpload from "../../../../components/uploadCloudinary";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";

const GalleryEntry = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loadingButton, setLoadingButton] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const useAXios = useAxiosPublic();
  const { uploadToCloudinary } = useCloudinaryUpload();

  // Handle image selection
  const handleImagesChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const newImageFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );

      if (newImageFiles.length === 0) {
        toast.error("Please upload image files only");
        return;
      }

      setImageFiles((prev) => [...prev, ...newImageFiles]);

      // Generate image previews
      const previews = newImageFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews((prev) => [...prev, ...previews]);
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    if (imageFiles.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    setLoadingButton(true);


      const file = imageFiles[0];
      try {
        const imageUrl = await uploadToCloudinary(file, "image");

        const imageData = {
          imageUrl,
          fileName: file.name,
          description: data.description,
        };

        await useAXios.post("/gallery", imageData);
        toast.success(` uploaded successfully`);
      } catch (error) {
        console.error(error);
        toast.error(`Error uploading`);
      }
    

    reset();
    setImageFiles([]);
    setImagePreviews([]);
    setLoadingButton(false);
  };

  return (
    <div className="bg-background-gradient p-5 text-black">
      <div className="bg-white p-6 shadow-custom-backend rounded-lg">
        <div className="flex justify-between gap-2 items-center">
          <h1 className="font-bold lg:text-3xl">Upload Images</h1>
        </div>
        <hr className="border w-full mx-auto my-5" />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImagesChange}
          className="block border-[1px] p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E]"
        />
        {imagePreviews.length > 0 && (
          <div className="mt-4  gap-2">
            {imagePreviews.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Preview ${index + 1}`}
                className="w-60 h-60 object-cover rounded border"
              />
            ))}
          </div>
        )}

        {/* Description */}
        <div className="w-full mt-2">
          <label className="text-[16px] font-medium text-black w-full">
            Description
          </label>
          <textarea
            {...register("description", { required: "Description is required" })}
            cols="30"
            rows="5"
            className="block border-[1px] p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Save Button */}
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className={`rounded px-5 py-2 hover:border-[#007BFF] duration-500 transition-all hover:bg-[#007BFF] border-2 flex gap-2 bg-button-gradient-backend text-white items-center btn w-fit my-5 ${
            loadingButton ? "opacity-50 cursor-not-allowed bg-[#1486DB]" : "bg-[#1486DB]"
          }`}
          disabled={loadingButton}
        >
          {loadingButton ? "Saving..." : "Save"} <FaRegSave />
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default GalleryEntry;
