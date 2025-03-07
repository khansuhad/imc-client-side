"use client";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";

import useCloudinaryUpload from "../../../../components/uploadCloudinary";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import Input from "../../../../components/ReuseableInputs/ReuseableInput";

const NoticesEntry = () => {
  const { control, handleSubmit, reset } = useForm();
  const [loadingButton, setLoadingButton] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const useAXios = useAxiosPublic();
  const { uploadToCloudinary } = useCloudinaryUpload();

  const updateProfileSuccessToast = () => toast.success("Created successfully");
  const updateProfileErrorToast = () => toast.error("Profile can't update");

  const handleSave = async (data) => {
    setLoadingButton(true);

    const { noticeTitle, noticeDate } = data;
    const sendTime = new Date();

    // Upload PDF to Cloudinary
    let pdfUrl = null;
    if (pdfFile) {
      pdfUrl = await uploadToCloudinary(pdfFile, "raw");
    }

    const formInfo = { noticeTitle, sendTime, pdfUrl, noticeDate };

    useAXios
      .post("/notices", formInfo)
      .then((res) => {
        reset();
        setPdfFile(null);
        updateProfileSuccessToast();
        setLoadingButton(false);
      })
      .catch((err) => {
        console.error(err);
        updateProfileErrorToast();
        setLoadingButton(false);
      });
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      toast.error("Please upload a PDF file");
    }
  };

  return (
    <div className="bg-background-gradient p-5 text-black">
      <div className="bg-white p-6 shadow-custom-backend rounded-lg">
        <div className="flex justify-between gap-2 items-center">
          <h1 className="font-bold lg:text-3xl">Notice Information</h1>
        </div>
        <hr className="border w-full mx-auto my-5" />
        <form onSubmit={handleSubmit(handleSave)} className="p-6">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
            <Input
              control={control}
              name="noticeTitle"
              label="Notice Title"
              placeholder="GD-2247"
              rules={{ required: "Notice Title is required" }}
            />

            <Input
              control={control}
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              name="noticeDate"
              label="Notice Date"
              placeholder="YYYY-MM-DD"
              rules={{ required: "Notice Date is required" }}
            />

            <div className="w-full mt-2">
              <label className="text-[16px] font-medium text-black w-full">Upload PDF</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handlePdfChange}
                className="block border-[1px] p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E]"
              />
              {pdfFile && <p className="mt-2 text-sm text-gray-500">Selected File: {pdfFile.name}</p>}
            </div>
          </div>

          <hr className="border w-full mx-auto my-5" />

          <div className="flex gap-5 items-center">
            <button
              type="submit"
              className={`rounded px-5 py-2 hover:border-[#007BFF] duration-500 transition-all hover:bg-[#007BFF] border-2 flex gap-2 bg-button-gradient-backend text-white items-center btn w-fit my-5 ${loadingButton ? 'opacity-50 cursor-not-allowed bg-[#1486DB]' : 'bg-[#1486DB]'}`}
              disabled={loadingButton}
            >
              {loadingButton ? "Saving..." : "Save"} <FaRegSave />
            </button>
            <button
              type="reset"
              className="rounded bg-[#6C757D] hover:bg-slate-600 duration-500 transition-all text-white px-5 py-2"
              onClick={() => reset()}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default NoticesEntry;


