"use client"
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { FaRegSave } from "react-icons/fa";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import { useForm, Controller } from "react-hook-form";
import Input from "../../../../components/ReuseableInputs/ReuseableInput"; // Import your custom Input component
import SingleSelect from "../../../../components/ReuseableInputs/SingleSelectOption"; // Import your custom SingleSelect component

const BatchEntry = () => {
  const { control, handleSubmit, reset } = useForm();
  const [loadingButton, setLoadingButton] = useState(false);
  const useAXios = useAxiosPublic();

  const updateProfileSuccessToast = () => toast.success("Created successfully");
  const updateProfileErrorToast = () => toast.error("Profile can't update");

  const onSubmit = async (data) => {
    setLoadingButton(true);
    try {
      await useAXios.post("/batches", data);
      reset();
      updateProfileSuccessToast();
    } catch (error) {
      updateProfileErrorToast();
    } finally {
      setLoadingButton(false);
    }
  };

  return (
    <div className="bg-background-gradient p-5 text-black">
      <div className="bg-white p-6 shadow-custom-backend rounded-lg">
        <div className="flex justify-between gap-2 items-center">
          <h1 className="font-bold lg:text-3xl">Batch Information</h1>
        </div>
        <hr className="border w-full mx-auto my-5" />
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
            <Input
              control={control}
              name="batchTitle"
              label="Batch Title"
              placeholder="GD-2247"
              rules={{ required: "Batch Title is required" }}
            />
            <Input
              control={control}
              name="classTime"
              label="Class Time"
              placeholder="বিকাল ০৪:০০ - ০৫:৩০ টা"
              rules={{ required: "Class Time is required" }}
            />
            <SingleSelect
              control={control}
              name="studentClass"
              label="Class"
              options={[
                { value: "সপ্তম", label: "সপ্তম" },
                { value: "অষ্টম", label: "অষ্টম" },
                { value: "নবম", label: "নবম" },
                { value: "দশম", label: "দশম" },
                { value: "একাদশ - দ্বাদশ", label: "একাদশ - দ্বাদশ" },
              ]}
              rules={{ required: "Class is required" }}
            />
            <Input
              control={control}
              name="classDay"
              label="Class Day"
              placeholder="শনি,সোম, বুধ"
              rules={{ required: "Class Day is required" }}
            />
            <Input
              control={control}
              name="batchMonthlyFee"
              label="Monthly Exam Fee"
              type="number"
              placeholder="1000"
              rules={{ required: "Monthly Exam Fee is required" }}
            />
            <Input
              control={control}
              name="batchModelTestFee"
              label="Model Test Fee"
              type="number"
              placeholder="200"
              rules={{ required: "Model Test Fee is required" }}
            />
            <Input
              control={control}
              name="startDate"
              label="Starting Date"
              type="date"
              rules={{ required: "Starting Date is required" }}
            />
            <SingleSelect
              control={control}
              name="status"
              label="Status"
              options={[
                { value: "Ongoing", label: "Ongoing" },
                { value: "Pending", label: "Pending" },
                { value: "Closed", label: "Closed" },
              ]}
              defaultValue="Ongoing"
              rules={{ required: "Status is required" }}
            />
          </div>
          <hr className="border w-full mx-auto my-5" />
          <div className="flex gap-5 items-center">
            <button
              type="submit"
              className={`rounded px-5 py-2 hover:border-[#007BFF] duration-500 transition-all hover:bg-[#007BFF] border-2 flex gap-2 bg-button-gradient-backend text-white items-center btn w-fit my-5 ${
                loadingButton ? "opacity-50 cursor-not-allowed bg-[#1486DB] disabled:[#1486DB]" : "bg-[#1486DB] disabled:[#1486DB]"
              }`}
              disabled={loadingButton}
            >
              {loadingButton ? "Save..." : "Save"} <FaRegSave />
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="rounded bg-[#6C757D] hover:bg-slate-600 duration-500 transition-all text-white px-5 py-2"
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

export default BatchEntry;