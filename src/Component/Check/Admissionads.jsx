import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import "./Admission.css"

import toast, { Toaster } from "react-hot-toast";
import Cropper from "react-easy-crop";


import { useNavigate } from "react-router-dom";

import { FaRegSave } from "react-icons/fa";
import useAxiosPublic from "../../../../Hock/useAxiosPublic";
import { useDispatch, useSelector } from "react-redux";
import { fetchBatchDetails, fetchBatches } from "../../../../Redux/Features/Batch/BatchSlice/BatchSlice";
import moment from "moment";
import { fetchRegistrationNo, fetchRollNo } from "../../../../Redux/Features/Admissions/AdmissionsSlice/AdmissionsSlice";
import Webcam from "react-webcam";
import axios from "axios";


const Admission = () => {
  const navigate= useNavigate()
  const dispatch = useDispatch()
  const {batches,batchDetails} = useSelector((state) => state.batches)
  console.log(batches);
  const {checkRegistrationNo,checkRollNo} = useSelector((state) => state.admissions)
  const [loadingButton , setLoadingButton] = useState(false)
    const useAXios = useAxiosPublic();
    const [roll , setRoll] = useState(0)

    const [totalStudent , setTotalStudent] = useState(0)



    const updateProfileSuccessToast = () =>
      toast.success("created successfully");

      const [image , setImage ] = useState("https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg")
  const [cloudinaryPhotoURL, setCloudinaryPhotoURL] = useState("https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg")
  const [isFrontCamera, setIsFrontCamera] = useState(true); // State to toggle camera

  const videoConstraints = {
    facingMode: isFrontCamera ? "user" : { exact: "environment" }, // Toggle between front and back camera
  };

  useEffect(() => {
    dispatch(fetchBatches({data: {searchTerm : ""}, axiosInstance : useAXios}))
     useAXios.get(`/total-student-length`)
     .then(res => {
       
       const student = res?.data?.length ;
       console.log(res?.data?.length);
       setTotalStudent(student)
     })
   
  },[useAXios,dispatch])
 
  

 const handleBatchChange = (batch) => {
  dispatch(fetchBatchDetails({data: {searchTerm : batch}, axiosInstance : useAXios}))
  useAXios.get(`/total-student-batch?batch=${batch}`)
     .then(res => {  
       const student = res?.data?.length + 1 ;
       console.log(res?.data?.length);
       setRoll(student)
     })
 }

   
   
 
  
    const handleSubmit = (e) =>{
        e.preventDefault();
        // setLoadingButton(true)
        const form = e.target;
        const fathersOrHusbandName = form.fathersOrHusbandName.value;
        const fathersNumber = form.fathersNumber.value;
        const fathersOccupation = form.fathersOccupation.value;
        const mothersName = form.mothersName.value;
        const mothersOccupation = form.mothersOccupation.value;
        const mothersNumber = form.mothersNumber.value;
        const name = form.name.value;
        const gender = form.gender.value;
        const dateOfBirth = form.dateOfBirth.value;
        const mobile = form.mobile.value;
        const guardiansMobile = form.guardiansMobile.value;
        const presentAddress = form.presentAddress.value;
        const permanentAddress = form.permanentAddress.value;
        const feesReceivedMonth = [];
        const feesReceivedBatchMonthlyFee = [];
        const bloodGroup = form.bloodGroup.value;
        const studentMonthlyFee = Number(form.studentMonthlyFee.value);
        const studentSchoolRoll = form.studentSchoolRoll.value;
        const studentSchool = form.studentSchool.value;
        const batch = form.batch.value;
        const religion = form.religion.value;
        const service = form.service.value;
        const group = form.group.value;
        const completedInfo = "running student";
        const rollNo = `${moment().format("YY")}${form.rollNo.value}` ;
        const registrationNo = `${moment().format("YYYY")}${form.registrationNo.value}` ;
        const enrollDate = form.enrollDate.value; // Get selected enroll date
        const enrollMonth = moment(enrollDate).startOf('month'); // Get the first day of the enroll month
        const currentMonth = moment().startOf('month'); // Get the first day of the current month
        
        let duesMonth = [];
        let duesBatchMonthlyFee = [];
        
        // Loop from enroll month to current month
        while (enrollMonth.isSameOrBefore(currentMonth)) {
            let formattedMonth = enrollMonth.format("MMM YYYY");
        
            // Add entry for student fee
            duesMonth.push({ month: formattedMonth, fee: studentMonthlyFee });
        
            // Add entry for batch fee
            duesBatchMonthlyFee.push({ month: formattedMonth, fee: batchDetails?.batchMonthlyFee });
        
            enrollMonth.add(1, 'month'); // Move to the next month
        }
        
        if(checkRegistrationNo){
         return toast.error("registration number already exists")
        }
        if(checkRollNo){
         return toast.error("roll number already exists")
        }
     const formInfo = {duesBatchMonthlyFee,religion,service,group,feesReceivedBatchMonthlyFee,studentSchoolRoll,studentSchool,feesReceivedMonth, duesMonth,registrationNo,rollNo,batch,permanentAddress,mothersNumber,fathersNumber,fathersOccupation,mothersOccupation,completedInfo,name , fathersOrHusbandName, mobile,mothersName, gender, dateOfBirth,studentMonthlyFee,bloodGroup,guardiansMobile,photoURL : cloudinaryPhotoURL,presentAddress ,enrollDate}
     console.log(formInfo);
     useAXios.post("/admissions" , formInfo)
     .then(res => {
      form.reset()
      updateProfileSuccessToast();
      // navigate("/dashboard/current-student")
      dispatch(fetchBatches({data: {searchTerm : ""}, axiosInstance : useAXios}))
      setRoll(0)
      setCloudinaryPhotoURL("https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg")
      setFilePhoto("")
      useAXios.get(`/total-student-length`)
      .then(res => {
        
        const student = res?.data?.length ;
        console.log(res?.data?.length);
        setTotalStudent(student)
      })
      console.log("");
     })
 
 

    
    
    }
  const handleRegChange =(e) => {
    dispatch(fetchRegistrationNo({data: {searchTerm : `${moment().format("YYYY")}${e}`},axiosInstance :useAXios}))
    console.log(`${moment().format("YYYY")}${e}`);
  }
  const handleRollChange =(e) => {
    dispatch(fetchRollNo({data: {searchTerm : `${moment().format("YYYY")}${e}`},axiosInstance :useAXios}))
    console.log(`${moment().format("YYYY")}${e}`);
  }
  console.log(checkRegistrationNo);
  // console.log(checkRollNo);
  const webcamRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [filePhoto, setFilePhoto] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // 📌 Capture photo from webcam
  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
    setFilePhoto(imageSrc);
  };



  // 📌 Handle cropping
  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // 📌 Get cropped image
  const getCroppedImage = async (imageSrc, crop) => {
    const image = new Image();
    image.src = imageSrc;

    return new Promise((resolve) => {
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = crop.width;
        canvas.height = crop.height;

        ctx.drawImage(
          image,
          crop.x,
          crop.y,
          crop.width,
          crop.height,
          0,
          0,
          crop.width,
          crop.height
        );

        resolve(canvas.toDataURL("image/jpeg"));
      };
    });
  };

  // 📌 Show cropped image
  const showCroppedImage = async () => {
    const croppedImg = await getCroppedImage(filePhoto, croppedAreaPixels);
    setCroppedImage(croppedImg);
  };
    const uploadToCloudinary = async () => {
      if (!photo) {
        alert('No photo to upload!');
        return;
      }
  
      setUploading(true); // Set uploading state to true
  
      const formData = new FormData();
      formData.append('file', photo); // Add the captured photo
      formData.append('upload_preset', 'My_First_Cloudinary'); // Replace with your Cloudinary preset
      formData.append('cloud_name', 'dc3czyqsb'); // Replace with your Cloudinary name
  
      try {
        // Make the POST request to Cloudinary
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dc3czyqsb/image/upload`,
          formData
        );
  
        toast.success("successfully uploaded")
        setCloudinaryPhotoURL(response.data.secure_url)
        document.getElementById('student-web-cemera').close()
        setFilePhoto("")
        console.log('Cloudinary Response:', response.data);
      } catch (error) {
        console.error('Error uploading photo:', error);
        toast.error(error)
      } finally {
        setUploading(false); // Reset uploading state
      }
    };
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (!file) return;
  
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed!");
        return;
      }
  
      // Show preview before uploading
      const previewURL = URL.createObjectURL(file);
      setFilePhoto(previewURL);
      setPhoto(file)
    };
  
    return (
        <>
          
        <form onSubmit={handleSubmit} className="bg-background-gradient min-h-screen p-5 text-black" >
        <div className="bg-white flex justify-between items-center p-6">
<div> <h1 className="font-bold lg:text-3xl text-center lg:text-left">Admission Form</h1>
</div>

       
<figure className="  w-[150px] h-[150px] flex  flex-col gap-2 justify-center items-center mt-10">
<img src={cloudinaryPhotoURL} alt=""  className="border-2 border-[#9E9E9E] rounded-lg lg:w-[180px] lg:h-[160px] student-img-aspect-ratio" />
<button className="btn text-center flex justify-center items-center bg-orange-500 text-white" onClick={()=>document.getElementById('student-web-cemera').showModal()}>Upload</button>
<dialog id="student-web-cemera" className="modal w-screen bg-white py-20 px-2">
      <div className="modal-box w-screen bg-white">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-[50%] top-2 border-2 border-orange-600 rounded-full">
            ✕
          </button>
        </form>

        <div className="relative mt-8">
          {/* 📌 Webcam Capture */}
          <div>
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width="100%" height="400px" />
            <button onClick={capturePhoto} className="bg-orange-500 text-white px-3 py-1 mt-2">
              Capture Photo
            </button>
          </div>

          {/* 📌 File Upload */}
          <h3 className="font-bold text-black text-center">OR</h3>
          <div className="border-[2px] border-blue-600 rounded p-2 mt-2">
            <input type="file" accept="image/*" onChange={handleImageChange} className="text-black" />
          </div>

          {/* 📌 Crop Image */}
          {filePhoto && !croppedImage && (
            <div className="crop-container mt-4">
              <Cropper
                image={filePhoto}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
              <button onClick={showCroppedImage} className="btn btn-primary mt-2">
                Crop
              </button>
            </div>
          )}

          {/* 📌 Show Cropped Image & Upload */}
          {croppedImage && (
            <div className="flex flex-col justify-center items-center mt-5">
              <h2 className="text-center font-bold">Cropped Photo</h2>
              <img src={croppedImage} alt="Cropped" style={{ width: "100%" }} />
              <button onClick={uploadToCloudinary} className="text-center bg-orange-500 text-white px-3 py-1 mt-2" disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          )}
        </div>
      </div>
    </dialog>


</figure>
  
      
 </div>
           <div className="">
           <div className=" bg-white px-6 pb-6 shadow-custom-backend">
           <div className="flex xl:flex-row flex-col-reverse justify-between items-center gap-2 ">
                   
                    
                 <div className="w-full">
                        <div className="  w-full ">
              <label
                className="text-[16px] font-medium text-black w-full"
              >
             Registration No.
              </label>
              <input
                type="text"
                name="registrationNo"
                required
                placeholder="102167"
                onChange={(e) => handleRegChange(e.target.value)}
                className={`block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full  rounded border-[#9E9E9E] text-black ${checkRegistrationNo ? "border-red-600 focus:outline-red-600" : "border-[#9E9E9E] focus:border-red-600"}`}
              />
            </div>
        {checkRegistrationNo && <span className="text-red-600">Registation Number alraedy exists</span>}
                 </div>
               <div className="w-full">
               <div className="w-full ">
                      <label className="text-[16px] font-medium text-black w-full">
                       Roll
                      </label>
                      <input
                        type="text"
                        name="rollNo"
                        
                        onChange={(e) => handleRollChange(e.target.value)}
                        placeholder="2525"
                         className={`block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black ${checkRollNo ? "border-red-600 focus:outline-red-600" : "border-[#9E9E9E] "}`}
                      />
                    </div> 
                    {checkRollNo && <span className="text-red-600">Roll Number alraedy exists</span>} 
                    </div>    
                    </div>
           <div className="flex xl:flex-row flex-col-reverse justify-between items-center gap-2 ">
                   
                    
                 <div className="w-full flex-1">
                        <div className="  w-full ">
              <label
                className="text-[16px] font-medium text-black w-full"
              >
             Name of Student
              </label>
              <input
                type="text"
                name="name"
                required
                className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
              />
            </div>
           
                 </div>
                      
                    </div>
                    <div  className="bg-white  ">
                        
                 <div  className="grid lg:grid-cols-2 grid-cols-1 gap-2">
                 <div className=" w-full mt-2">
              <label
                className="text-[16px] font-medium text-black w-full"
              >
           Name of Father’s
              </label>
              <input
                type="text"
                name="fathersOrHusbandName"
                
                className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
              />
            </div>
            <div className=" w-full mt-2">
              <label
                className="text-[16px] font-medium text-black w-full"
              >
              Name of Mother’s
              </label>
              <input
                type="text"
                name="mothersName"
                
                className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
              />
            </div>
                 <div className=" w-full mt-2">
              <label
                className="text-[16px] font-medium text-black w-full"
              >
           Father’s mobile number
              </label>
              <input
                type="text"
                name="fathersNumber"
                
                className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
              />
            </div>
            <div className=" w-full mt-2">
              <label
                className="text-[16px] font-medium text-black w-full"
              >
               Mother’s mobile number
              </label>
              <input
                type="text"
                name="mothersNumber"
                
                className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
              />
            </div>
                 <div className=" w-full mt-2">
              <label
                className="text-[16px] font-medium text-black w-full"
              >
      Father’s Occupation
              </label>
              <input
                type="text"
                name="fathersOccupation"
                
                className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
              />
            </div>
            <div className=" w-full mt-2">
              <label
                className="text-[16px] font-medium text-black w-full"
              >
              Mother’s Occupation
              </label>
              <input
                type="text"
                name="mothersOccupation"
                
                className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
              />
            </div>
                 </div>
                 <div className="">
                        <div className="w-full mt-2">
            <label
           
              className="text-[16px] font-medium text-black w-full"
            >
           Present Address
            </label>
            <textarea   name="presentAddress" cols="30" rows="5" className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"></textarea>
          </div>
          <div className="w-full mt-2">
            <label
           
              className="text-[16px] font-medium text-black w-full"
            >
             Permanent Address
            </label>
            <textarea   name="permanentAddress" cols="30" rows="5" className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"></textarea>
          </div>
                        </div>
                   
                     <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-2">
                     <div className=" w-full mt-2">
              <label
                className="text-[16px] font-medium text-black w-full"
              >
              Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                
                className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
              />
            </div>
            <div className="mt-2">
                 <label
                className="text-[16px] font-medium text-black w-full "
              >
              Gender
              </label>
                        <div className="flex flex-col sm:flex-row gap-8 items-center ">
                  
           <select id="dropdown1" name="gender" className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" >
           
                   <option value="Male">Male</option>
                   <option value="Female">Female</option>
                  
  </select>
           </div>
                 </div>
            <div className="mt-2">
                 <label
                className="text-[16px] font-medium text-black w-full "
              >
              Group
              </label>
                        <div className="flex flex-col sm:flex-row gap-8 items-center ">
                  
           <select id="dropdown1" name="group" className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" >
           
                   <option value="Science">Science</option>
                   <option value="Arts">Arts</option>
                   <option value="Business Studies">Business Studies</option>
                  
  </select>
           </div>
                 </div>
            <div className="mt-2">
                 <label
                className="text-[16px] font-medium text-black w-full "
              >
              Religion
              </label>
                        <div className="flex flex-col sm:flex-row gap-8 items-center ">
                  
           <select id="dropdown1" name="religion" className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" >
           
                   <option value="Islam">Islam</option>
                   <option value="Hindy">Hindy</option>
                   <option value="Others">Others</option>
                  
  </select>
           </div>
                 </div>
               
                 <div className="mt-2">
                 <label
                className="text-[16px] font-medium text-black w-full "
              >
           Blood Group
              </label>
                        <div className="flex flex-col sm:flex-row gap-8 items-center ">
                  
           <select id="dropdown1"  name="bloodGroup" className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" >
           
                   <option value="AB+">AB+</option>
                   <option value="AB-">AB-</option>
                   <option value="A+">A+</option>
                   <option value="A-">A-</option>
                   <option value="B+">B+</option>
                   <option value="B-">B-</option>
                   <option value="O+">O+</option>
                   <option value="O-">O-</option>
                  
  </select>
           </div>
                 </div>
        
           
      
                        <div className=" w-full mt-2">
              <label
                className="text-[16px] font-medium text-black w-full"
              >
            Students Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
             
                className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
              />
            </div>
            <div className=" w-full mt-2">
              <label
                className="text-[16px] font-medium text-black w-full"
              >
            Guardian Mobile Number 
              </label>
              <input
                type="tel"
                name="guardiansMobile"
                required
                className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
              />
            </div>
         
            <div className=" w-full mt-2">
              <label
                className="text-[16px] font-medium text-black w-full"
              >
            Students School
              </label>
              <input
                type="text"
                name="studentSchool"
                
                className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
              />
            </div>      <div className=" w-full mt-2">
              <label
                className="text-[16px] font-medium text-black w-full"
              >
            Students School roll
              </label>
              <input
                type="tel"
                name="studentSchoolRoll"
                
                className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
              />
            </div>
            <div className="mt-2">
                 <label
                className="text-[16px] font-medium text-black w-full "
              >
         Batch No
              </label>
                        <div className="flex flex-col sm:flex-row gap-8 items-center ">
                     <input list="batch"  name="batch" onChange={(e) => handleBatchChange(e.target.value)}  placeholder="Type the batch name" className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" />     
           <datalist id="batch"  > 

              {
       
            batches?.map(batch =>
                <option key={batch?._id} value={batch?.batchTitle}>{batch?.batchTitle}</option>
                )
              }
       

  </datalist>

           </div>
                 </div>
                 <div className=" w-full mt-2">
              <label
                className="text-[16px] font-medium text-black w-full"
              >
              Monthly Fee
              </label>
              <input
                type="number"
                name="studentMonthlyFee"

                defaultValue={batchDetails?.batchMonthlyFee}
                className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
              />
            </div>
            <div className="mt-2">
                 <label
                className="text-[16px] font-medium text-black w-full "
              >
              Services
              </label>
                        <div className="flex flex-col sm:flex-row gap-8 items-center ">
                  
           <select id="dropdown1" name="service" className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" >
           
                   <option value="General Math">General Math</option>
                   <option value="Higher Math">Higher Math</option>
                   <option value="General Math & Higher Math">General Math & Higher Math</option>
                   <option value="Only Exam">Only Exam</option>
                  
  </select>
           </div>
                 </div>
                 <div className=" w-full mt-2">
              <label
                className="text-[16px] font-medium text-black w-full"
              >
              Enroll Date
              </label>
              <input
                type="date"
                name="enrollDate"
required
                
                className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
              />
            </div>
           
                        </div>
                       
                        
                
               
        

          
                        </div>
                    </div>

                    
           </div>
       


           <div className="flex gap-2 bg-white p-6 shadow-custom-backend items-center mt-2 ">
           <button 
  type="submit" 
  className={`rounded px-5 py-2 hover:border-[#007BFF] duration-500 transition-all hover:bg-[#007BFF] border-2 flex gap-2  bg-button-gradient-backend text-white items-center btn  w-fit  my-5 ${loadingButton ? 'opacity-50 cursor-not-allowed bg-[#1486DB] disabled:[#1486DB]' : 'bg-[#1486DB] disabled:[#1486DB]'}`} 
//   disabled={loadingButton}
>
  {loadingButton ? "Save..." : "Save"} <FaRegSave />
</button>
                <button className="rounded-lg bg-[#9E9E9E] hover:bg-slate-600 duration-500 transition-all text-white px-5 py-2 flex gap-3 text-2xl">Reset</button>
            </div>
            <Toaster />
            </form></>
          
    );
};

export default Admission;