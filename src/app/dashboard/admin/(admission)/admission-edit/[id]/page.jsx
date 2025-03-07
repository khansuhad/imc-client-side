"use client"


import React, { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import { FaRegSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchBatches } from "../../../../../../redux/features/batch/batchSlice/batchSlice";
import Webcam from "react-webcam";
import axios from "axios";
import moment from "moment";
import { fetchRollNo, fetchStudentDetails } from "../../../../../../redux/features/admissions/admissionSlice/admissionSlice";
import useAxiosPublic from "../../../../../../hooks/useAxiosPublic";
import { use } from "react";

const AdmissionEdit = ({params}) => {
    const unwrappedParams = use(params); // Unwrapping the Promise
    const id = unwrappedParams.id;
    console.log(id);
  const updateProfileSuccessToast = () =>
    toast.success("updated successfully");
  const updateProfileErrorToast = () => toast.error("Profile can't update");
  const {checkRollNo, studentInfo} = useSelector((state) => state.admissions)
  console.log(studentInfo);
    const useAxios = useAxiosPublic();
     const [selectedBatch ,setSelectedBatch] = useState("")
        const [selectedRoll ,setSelectedRoll] = useState("")
    const [loadingButton , setLoadingButton] = useState(false)
    const [roll , setRoll] = useState(studentInfo?.rollNo)
    const dispatch = useDispatch()
    const {batches} = useSelector((state) => state.batches)
    const [cloudinaryPhotoURL, setCloudinaryPhotoURL] = useState(studentInfo?.photoURL)
console.log(batches);


    //(coursesName);
    useEffect(() => {
dispatch(fetchStudentDetails({data : {searchTerm : id} ,axiosInstance :useAxios}))
  
     
    }, [dispatch,id]);
 useEffect(() =>{
    dispatch(fetchBatches({data: {searchTerm : ""}, axiosInstance : useAxios}))
 }, [dispatch,useAxios])
 


        const handleBatchChange = (batch) => {
            dispatch(fetchRollNo({data: {searchTerm : `${moment().format("YY")}${selectedRoll}` , batch : selectedBatch},axiosInstance :useAxios}))
          useAxios.get(`/total-student-batch?batch=${batch}`)
             .then(res => {  
               const student = res?.studentInfo?.length + 1 ;
               console.log(res?.studentInfo?.length);
               setRoll(student)
             })
         }
          const handleRollChange =() => {
             dispatch(fetchRollNo({data: {searchTerm : `${moment().format("YY")}${selectedRoll}`,batch : selectedBatch},axiosInstance :useAxios}))
           }
  const handleUpdate = (e) =>{
          e.preventDefault();
          // setLoadingButton(true)
          const form = e.target;
          if(form.mobile.value === form.guardiansMobile.value){
            return toast.error("student mobile number and guardian mobile number can't be same")
          }
          if(form.fathersNumber.value === form.mothersNumber.value){
            return toast.error("father's mobile number and mother's mobile number can't be same")
          }
          const fathersOrHusbandName = form.fathersOrHusbandName.value;
          const fathersNumber = form.fathersNumber.value;
          const fathersOccupation = form.fathersOccupation.value;
          const mothersName = form.mothersName.value;
          const mothersOccupation = form.mothersOccupation.value;
          const mothersNumber = form.mothersNumber.value;
          const studentNickname = form.studentNickname.value;
          const name = form.name.value;
          const gender = form.gender.value;
          const dateOfBirth = form.dateOfBirth.value;
          const enrollDate = form.enrollDate.value;
          const mobile = form.mobile.value;
          const guardiansMobile = form.guardiansMobile.value;
          const presentAddress = form.presentAddress.value;
          const permanentAddress = form.permanentAddress.value;
          const bloodGroup = form.bloodGroup.value;
          const batch = form.batch.value;
          const studentMonthlyFee = Number(form.studentMonthlyFee.value);
          const studentSchoolRoll = form.studentSchoolRoll.value;
          const studentSchool = form.studentSchool.value;
          const completedInfo = form.completedInfo.value;
    const religion = form.religion.value;
        const service = form.service.value;
        const group = form.group.value;
  
       const formInfo = {batch,completedInfo,studentMonthlyFee,religion,group,service,studentSchoolRoll,studentSchool,permanentAddress,mothersNumber,fathersNumber,fathersOccupation,mothersOccupation,name , fathersOrHusbandName, mobile,mothersName, gender, dateOfBirth,bloodGroup,guardiansMobile,photoURL : cloudinaryPhotoURL,presentAddress ,enrollDate,rollNo : roll,studentNickname}
       console.log(formInfo);
       useAxios.patch(`/admissions/${studentInfo?._id}` , formInfo)
       .then(res => {
        form.reset()
        updateProfileSuccessToast();
        navigate("/dashboard/current-student")
        console.log("");
       })
   
   
  
      
      
      }
     
      const [photo, setPhoto] = useState(null); // Store captured photo
      const [filePhoto, setFilePhoto] = useState(null); // Store captured photo
      const [uploading, setUploading] = useState(false);
      const [isFrontCamera, setIsFrontCamera] = useState(true); // State to toggle camera
      
        const videoConstraints = {
          facingMode: isFrontCamera ? "user" : { exact: "environment" }, // Toggle between front and back camera
        };
      const capturePhoto = () => {
        const imageSrc = webcamRef.current.getScreenshot(); // Capture photo
        setPhoto(imageSrc); 
        setFilePhoto(imageSrc);// Set the captured photo
      };
    
      const webcamRef = React.useRef(null);
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
          setCloudinaryPhotoURL(response?.studentInfo?.secure_url)

          console.log('Cloudinary Response:', response.studentInfo);
          setFilePhoto("")
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
   
     
     <div className="bg-background-gradient gap-0 p-6">
   
     <div className="bg-white flex justify-between items-center p-6  text-black">
<div> <h1 className="font-bold lg:text-3xl text-center lg:text-left">Admission Form</h1>
<h1 className="text-xl  text-center lg:text-left">Registration No: <span className="text-red-600">{studentInfo?.registrationNo}</span></h1>
</div>

     
<figure className="  w-[150px]  flex flex-col justify-center items-center gap-2 ">
<img src={cloudinaryPhotoURL} alt=""  className="border-2 border-[#9E9E9E] rounded-lg lg:w-[180px] lg:h-[160px] student-img-aspect-ratio" />
<Dialog>
  <DialogTrigger className="btn text-center flex justify-center items-center bg-orange-500 text-white">Upload</DialogTrigger>
  <DialogContent className="max-h-screen overflow-y-auto py-20">

    <DialogHeader>
      <DialogTitle>a selfie?</DialogTitle>
      <DialogDescription>
        <div className="relative mt-8">
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width="100%" height="400px" videoConstraints={videoConstraints} />
             <div className="flex flex-wrap gap-3 mt-3">
                  <button onClick={() => setIsFrontCamera((prev) => !prev)} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded">Switch Camera</button>
                    <button onClick={capturePhoto} className="bg-orange-500 text-white px-3 py-1 mt-2">Capture Photo</button>
                    <DialogClose asChild >
                   
                   <button className="bg-slate-300 p-2 ">Close </button>
                 
                </DialogClose>
                  </div>
          <div>
            <h3 className="font-bold text-black text-center">OR</h3>
            <div className="border-[2px] border-blue-600 rounded p-2 mt-2">
              <input type="file" accept="image/*" onChange={handleImageChange} className="text-black" />
            </div>
          </div>
        </div>
        {filePhoto && (
          <div className="flex flex-col justify-center items-center mt-5">
            <h2 className="text-center font-bold">Photo</h2>
            <img src={filePhoto} alt="Captured" className="student-img-aspect-ratio" style={{ width: '100%' }} />
            <DialogClose asChild >
                   
            <button onClick={async () => {
                await uploadToCloudinary(); // Assuming this is an async function
                closeDialog(); // Close the dialog after uploading
              }}  className="bg-orange-500 text-white px-3 py-1 mt-2" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload'}
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
<form onSubmit={handleUpdate} className=" min-h-screen  text-black  " >
         <div className="">
         <div className=" bg-white px-6 py-6 shadow-custom-backend">
         <div>

<div className="flex xl:flex-row flex-col  justify-between items-center gap-2 ">
          
           

          <div className="mt-2 flex-1">
          <label
         className="text-[16px] font-medium text-black w-full "
       >
  Batch No
       </label>
                 <div className="flex flex-col sm:flex-row gap-8 items-center ">
              <input list="batch"  name="batch" onChange={(e) => {
               setSelectedBatch(e.target.value)
               handleBatchChange(e.target.value)
               }}  placeholder="Type the batch name" required defaultValue={studentInfo?.batch} className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" />     
    <datalist id="batch"  > 

       {

     batches?.map(batch =>
         <option key={batch?._id} value={batch?.batchTitle}>{batch?.batchTitle}</option>
         )
       }


</datalist>

    </div>
          </div>
        
          <div className=" w-full mt-2 flex-1">
                   <div className="w-full ">
               <label className="text-[16px] font-medium text-black w-full">
                Roll
               </label>
               <input
                 type="text"
                 name="rollNo"
                 
                 onChange={(e) => {
                   setSelectedRoll(e.target.value)
                   handleRollChange(e.target.value)
                   }} 
                   defaultValue={studentInfo?.rollNo}
                 placeholder="2525"
                  className={`block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black ${checkRollNo ? "border-red-600 focus:outline-red-600" : "border-[#9E9E9E] "}`}
               />
             </div> 
             {checkRollNo && <span className="text-red-600">Roll Number already exists</span>} </div>
         
             </div>
             <div className="w-full flex-1 flex flex-col lg:flex-row gap-2">
                 <div className="  w-full flex-1">
       <label
         className="text-[16px] font-medium text-black w-full"
       >
      Name of Student
       </label>
       <input
         type="text"
         name="name"
         required
         defaultValue={studentInfo?.name}
         className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
       />
     </div>
     <div className="  w-full flex-1">
     <label
       className="text-[16px] font-medium text-black w-full"
     >
    Student Nickname
     </label>
     <input
       type="text"
       name="studentNickname"
       required
       defaultValue={studentInfo?.studentNickname}
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
              defaultValue={studentInfo?.fathersOrHusbandName}
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
              defaultValue={studentInfo?.mothersName}
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
              defaultValue={studentInfo?.fathersNumber}
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
              defaultValue={studentInfo?.mothersNumber}
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
              defaultValue={studentInfo?.fathersOccupation}
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
              defaultValue={studentInfo?.mothersOccupation}
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
          <textarea defaultValue={studentInfo?.presentAddress}  name="presentAddress" cols="30" rows="5" className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"></textarea>
        </div>
        <div className="w-full mt-2">
          <label
         
            className="text-[16px] font-medium text-black w-full"
          >
           Permanent Address
          </label>
          <textarea  defaultValue={studentInfo?.permanentAddress} name="permanentAddress" cols="30" rows="5" className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"></textarea>
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
              defaultValue={studentInfo?.dateOfBirth}
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
                
         <select id="dropdown1" defaultValue={studentInfo?.gender} name="gender" className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" >
         
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
                  
           <select id="dropdown1" name="group" defaultValue={studentInfo?.group} className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" >
           
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
                  
           <select id="dropdown1" name="religion" defaultValue={studentInfo?.religion} className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" >
           
                   <option value="Islam">Islam</option>
                   <option value="Hindu">Hindu</option>
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
                
         <select id="dropdown1" defaultValue={studentInfo?.bloodGroup}  name="bloodGroup" className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" >
         
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
              defaultValue={studentInfo?.mobile}
          
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
              defaultValue={studentInfo?.guardiansMobile}
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
              defaultValue={studentInfo?.studentSchool}
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
              defaultValue={studentInfo?.studentSchoolRoll}
              className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
            />
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

              defaultValue={studentInfo?.studentMonthlyFee}
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
                  
           <select id="dropdown1" name="service" defaultValue={studentInfo?.service} className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" >
           
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
              defaultValue={studentInfo?.enrollDate}
              required
              className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
            />
          </div>
          <div className="mt-2">
                 <label
                className="text-[16px] font-medium text-black w-full "
              >
              Completed Info
              </label>
                        <div className="flex flex-col sm:flex-row gap-8 items-center  ">
                  
           <select id="dropdown" name="completedInfo" defaultValue={studentInfo?.completedInfo} className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" required>
        
                   <option value="running student">Running Student</option>
                   <option value="off student">Off Student</option>
                  
  </select>
           </div>
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
          </form>
      </div></>
      
    );
};

export default AdmissionEdit;