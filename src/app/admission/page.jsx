"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaRegSave } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Webcam from "react-webcam";
import axios from "axios";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Input from "../components/ReuseableInputs/ReuseableInput";
import SingleSelect from "../components/ReuseableInputs/SingleSelectOption";
import useAxiosPublic from "../../hooks/useAxiosPublic";




const Admission = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const useAxios = useAxiosPublic()
  const [cloudinaryPhotoURL, setCloudinaryPhotoURL] = useState(
    "https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg"
  );
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [filePhoto, setFilePhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const videoConstraints = {
    facingMode: isFrontCamera ? "user" : { exact: "environment" },
  };

  const webcamRef = React.useRef(null);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
    setFilePhoto(imageSrc);
  };

  const uploadToCloudinary = async () => {
    if (!photo) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", photo);
    formData.append("upload_preset", "My_First_Cloudinary");
    formData.append("cloud_name", "dc3czyqsb");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dc3czyqsb/image/upload",
        formData
      );
      setCloudinaryPhotoURL(response.data.secure_url);
      toast.success("Photo uploaded successfully");
      setFilePhoto(null);
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast.error("Failed to upload photo");
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    setFilePhoto(URL.createObjectURL(file));
    setPhoto(file);
  };

  const onSubmit = async(data) => {
    setLoadingButton(true);
    if(data.mobile === data.guardiansMobile){
      return toast.error("student mobile number and guardian mobile number can't be same")
    }
    if(data.fathersNumber === data.mothersNumber){
      return toast.error("father's mobile number and mother's mobile number can't be same")
    }
    const  res = await useAxios.post("/pending-admissions", {...data,photoURL :photo})// Handle form submission
   if(res?.data?.insertedId){
    setTimeout(() => {
        setLoadingButton(false);
        toast.success("Form submitted successfully");
        reset();
      }, 2000);
   }
  };

  return (
    <div className="lg:space-y-20 space-y-10 2xl:px-[300px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-background-gradient min-h-screen p-5 text-black "
      >
        <div className="bg-white flex justify-between items-center p-6">
          <div>
            <h1 className="font-bold lg:text-3xl text-center lg:text-left">
              Admission Form
            </h1>
          </div>

          <figure className="w-[150px] h-[150px] flex flex-col gap-2 justify-center items-center mt-10">
            <img
              src={cloudinaryPhotoURL}
              alt=""
              className="border-2 border-[#9E9E9E] rounded-lg lg:w-[180px] lg:h-[160px] student-img-aspect-ratio"
            />
            <Dialog>
              <DialogTrigger className="btn text-center flex justify-center items-center bg-orange-500 text-white px-3 py-2 rounded-lg">
                Upload
              </DialogTrigger>
              <DialogContent className="max-h-screen overflow-y-auto py-20">
                <DialogHeader>
                  <DialogTitle>Take a selfie?</DialogTitle>
                  <DialogDescription>
                    <div className="relative mt-8">
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width="100%"
                        height="400px"
                        videoConstraints={videoConstraints}
                      />
                      <div className="flex flex-wrap gap-3 mt-3">
                        <button
                          onClick={() => setIsFrontCamera((prev) => !prev)}
                          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
                        >
                          Switch Camera
                        </button>
                        <button
                          onClick={capturePhoto}
                          className="bg-orange-500 text-white px-3 py-1 mt-2"
                        >
                          Capture Photo
                        </button>
                        <DialogClose asChild>
                          <button className="bg-slate-300 p-2">Close</button>
                        </DialogClose>
                      </div>
                      <div>
                        <h3 className="font-bold text-black text-center">OR</h3>
                        <div className="border-[2px] border-blue-600 rounded p-2 mt-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="text-black"
                          />
                        </div>
                      </div>
                    </div>
                    {filePhoto && (
                      <div className="flex flex-col justify-center items-center mt-5">
                        <h2 className="text-center font-bold">Photo</h2>
                        <img
                          src={filePhoto}
                          alt="Captured"
                          className="student-img-aspect-ratio"
                          style={{ width: "100%" }}
                        />
                        <DialogClose asChild>
                          <button
                            onClick={uploadToCloudinary}
                            className="bg-orange-500 text-white px-3 py-1 mt-2"
                            disabled={uploading}
                          >
                            {uploading ? "Uploading..." : "Upload"}
                          </button>
                        </DialogClose>
                      </div>
                    )}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </figure>
        </div>

        <div className="bg-white px-6 py-10 shadow-custom-backend ">
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-2">
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
              name="name"
              control={control}
              label="Name of Student"
              placeholder="Enter student's name"
              rules={{ required: "Name is required" }}
              error={errors.name}
            />
            <Input
              name="studentNickname"
              control={control}
              label="Student Nickname"
              placeholder="Enter student's nickname"
              rules={{ required: "Nickname is required" }}
              error={errors.studentNickname}
            />
          </div>

          <div className="grid  lg:grid-cols-2 grid-cols-1  gap-2">
            <Input
              name="fathersOrHusbandName"
              control={control}
              label="Father's Name"
              placeholder="Enter father's name"
              rules={{ required: "Father's name is required" }}
              error={errors.fathersOrHusbandName}
            />
            <Input
              name="mothersName"
              control={control}
              label="Mother's Name"
              placeholder="Enter mother's name"
              rules={{ required: "Mother's name is required" }}
              error={errors.mothersName}
            />
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
            <Input
              name="fathersNumber"
              control={control}
              label="Father's Mobile Number"
              placeholder="Enter father's mobile number"
              rules={{ required: "Father's number is required" }}
              error={errors.fathersNumber}
            />
            <Input
              name="mothersNumber"
              control={control}
              label="Mother's Mobile Number"
              placeholder="Enter mother's mobile number"
              rules={{ required: "Mother's number is required" }}
              error={errors.mothersNumber}
            />
            <Input
              name="fathersOccupation"
              control={control}
              label="Father's Occupation"
              placeholder="Enter father's occupation"
              rules={{ required: "father's occupation is required" }}
              error={errors.fathersOccupation}
            />
            <Input
              name="mothersOccupation"
              control={control}
              label="Mother's Occupation"
              placeholder="Enter mother's occupation"
              rules={{ required: "mother's occupation is required" }}
              error={errors.mothersOccupation}
            />

            <Input
              name="presentAddress"
              control={control}
              label="Present Address"
              placeholder="Enter Present Address"
              rules={{ required: "Present Address is required" }}
              error={errors.presentAddress}
            />
            <Input
              name="permanentAddress"
              control={control}
              label="Permanent Address"
              placeholder="Enter Permanent Address"
              rules={{ required: "Permanent Address is required" }}
              error={errors.permanentAddress}
            />
            <Input
              name="dateOfBirth"
              control={control}
              label="Date Of Birth"
              type="date"
              placeholder="Enter Date Of Birth"
              rules={{ required: "Date Of Birth is required" }}
              error={errors.dateOfBirth}
            />
          <SingleSelect
              control={control}
              name="Gender"
              label="Gender"
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },

              ]}
              defaultValue="Male"
              rules={{ required: "Gender is required" }}
            />
        <SingleSelect
              control={control}
              name="group"
              label="Group"
              options={[
                { value: "Science", label: "Science" },
                { value: "Arts", label: "Arts" },
                { value: "Business Studies", label: "Business Studies" },
              ]}
              defaultValue="Science"
              rules={{ required: "Group is required" }}
            />
          <SingleSelect
              control={control}
              name="bloodGroup"
              label="Blood Group"
              options={[
                { value: "A+", label: "A+" },
                { value: "A-", label: "A-" },
                { value: "B+", label: "B+" },
                { value: "B-", label: "B-" },
                { value: "AB+", label: "AB+" },
                { value: "AB-", label: "AB-" },
                { value: "O+", label: "O+" },
                { value: "O-", label: "O-" },
              ]}
defaultValue="A+"
              rules={{ required: "Blood Group is required" }}
            />
           <SingleSelect
              control={control}
              name="religion"
              label="Religion"
              options={[
                { value: "Islam", label: "Islam" },
                { value: "Hindu", label: "Hindu" },
                { value: "Others", label: "Others" },
              ]}
              defaultValue="Islam"
              rules={{ required: "Religion is required" }}
            />
            <Input
              name="mobile"
              control={control}
              label="Student's Mobile Number"
              placeholder="Enter student's mobile number"
              rules={{ required: "Student's number is required" }}
              error={errors.mobile}
            />
            <Input
              name="guardiansMobile"
              control={control}
              label="Guardian's Mobile Number"
              placeholder="Enter guardian's mobile number"
              rules={{ required: "Guardian's number is required" }}
              error={errors.guardiansMobile}
            />
            <Input
              name="studentSchool"
              control={control}
              label="Student School Name"
              placeholder="Enter student school name"
              rules={{ required: "student school name is required" }}
              error={errors.studentSchool}
            />
            <Input
              name="studentSchoolRoll"
              control={control}
              label="Student School Roll"
              placeholder="Enter student school roll"
              rules={{ required: "student school roll is required" }}
              error={errors.studentSchoolRoll}
            />

         <SingleSelect
              control={control}
              name="service"
              label="Subject"
              options={[
                { value: "General Math", label: "General Math" },
                { value: "Higher Math", label: "Higher Math" },
                { value: "General Math & Higher Math", label: "General Math & Higher Math" },
                { value: "Only Exam", label: "Only Exam" },
              ]}
 defaultValue="General Math & Higher Math"
              rules={{ required: "subject is required" }}
            />
          </div>

          {/* Add more fields as needed */}
        </div>

        <div className="flex gap-2 bg-white p-6 shadow-custom-backend items-center mt-2">
          <button
            type="submit"
            className={`rounded px-5 py-2 hover:border-[#007BFF] duration-500 transition-all hover:bg-[#007BFF] border-2 flex gap-2 bg-button-gradient-backend text-white items-center btn w-fit my-5 ${
              loadingButton ? "opacity-50 cursor-not-allowed bg-[#1486DB]" : ""
            }`}
            disabled={loadingButton}
          >
            {loadingButton ? "Save..." : "Save"} <FaRegSave />
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-lg bg-[#9E9E9E] hover:bg-slate-600 duration-500 transition-all text-white px-5 py-2 flex gap-3 text-2xl"
          >
            Reset
          </button>
        </div>
        <Toaster />
      </form>
    </div>
  );
};

export default Admission;