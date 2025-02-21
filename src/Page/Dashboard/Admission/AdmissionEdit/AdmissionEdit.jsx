import { useLoaderData, useNavigate } from "react-router-dom";
import "./AdmissionEdit.css"
import React, { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";



import { FaRegSave } from "react-icons/fa";
import useAxiosPublic from "../../../../Hock/useAxiosPublic";
import { useDispatch, useSelector } from "react-redux";
import { fetchBatches } from "../../../../Redux/Features/Batch/BatchSlice/BatchSlice";
import Webcam from "react-webcam";
import axios from "axios";
import moment from "moment";
import { fetchRollNo } from "../../../../Redux/Features/Admissions/AdmissionsSlice/AdmissionsSlice";


const AdmissionEdit = () => {
  const navigate = useNavigate();
  const updateProfileSuccessToast = () =>
    toast.success("updated successfully");
  const updateProfileErrorToast = () => toast.error("Profile can't update");
    const useAxios = useAxiosPublic();
    const data = useLoaderData();
     const [selectedBatch ,setSelectedBatch] = useState("")
        const [selectedRoll ,setSelectedRoll] = useState("")
    const [loadingButton , setLoadingButton] = useState(false)
    const [roll , setRoll] = useState(data?.rollNo)
    const dispatch = useDispatch()
    const {batches} = useSelector((state) => state.batches)
    const {checkRollNo} = useSelector((state) => state.admissions)
    const [cloudinaryPhotoURL, setCloudinaryPhotoURL] = useState(data?.photoURL)



    //(coursesName);
    useEffect(() => {

  
     
    }, []);
 useEffect(() =>{
    dispatch(fetchBatches({data: {searchTerm : ""}, axiosInstance : useAxios}))
 }, [dispatch,useAxios])
 


        const handleBatchChange = (batch) => {
            dispatch(fetchRollNo({data: {searchTerm : `${moment().format("YY")}${selectedRoll}` , batch : selectedBatch},axiosInstance :useAxios}))
          useAxios.get(`/total-student-batch?batch=${batch}`)
             .then(res => {  
               const student = res?.data?.length + 1 ;
               console.log(res?.data?.length);
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
       useAxios.patch(`/admissions/${data?._id}` , formInfo)
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
          setCloudinaryPhotoURL(response?.data?.secure_url)
          document.getElementById('student-web-cemera-update').close()
          console.log('Cloudinary Response:', response.data);
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
        <dialog id="student-web-cemera-update" className="modal  w-screen bg-white py-20 px-2">
  <div className="modal-box w-screen bg-white">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-[50%] top-2 border-2 border-orange-600 rounded-full ">✕</button>
    </form>
    <div className='relative mt-8'>
<div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
        height="400px"
        videoConstraints={videoConstraints}
      />
      <button
        onClick={() => setIsFrontCamera((prev) => !prev)} 
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        Switch Camera
      </button>
    </div>
      <button onClick={capturePhoto} style={{ marginTop: '10px' }} className=' bg-orange-500 text-white 0 px-3 py-1 mt-2'>
        Capture Photo
      </button>
      <div>
        <h3 className="font-bold text-black text-center">OR</h3>
        <div className="border-[2px] border-blue-600 rounded p-2 mt-2">
        <input type="file" accept="image/*" onChange={handleImageChange} className="text-black" />
        </div>
      </div>
  </div>
      {filePhoto && (
        <div className='flex flex-col justify-center items-center mt-5'>
          <h2 className='text-center font-bold'> Photo</h2>
          <img src={filePhoto} alt="Captured" style={{ width: '100%' }} className="student-img-aspect-ratio " />
          <button
                onClick={uploadToCloudinary}
                className="text-center bg-orange-500 text-white px-3 py-1 mt-2"
                disabled={uploading} // Disable the button while uploading
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
        </div>
      )}
  </div>
</dialog>  
     
     <div className="bg-background-gradient gap-0 p-6">
   
     <div className="bg-white flex justify-between items-center p-6  text-black">
<div> <h1 className="font-bold lg:text-3xl text-center lg:text-left">Admission Form</h1>
<h1 className="text-xl  text-center lg:text-left">Registration No: <span className="text-red-600">{data?.registrationNo}</span></h1>
<h1 className="text-xl  text-center lg:text-left">Roll No: <span className="text-red-600">{roll}</span></h1></div>

     
<figure className="  w-[150px]  flex flex-col justify-center items-center gap-2 ">
<img src={cloudinaryPhotoURL} alt=""  className="border-2 border-[#9E9E9E] rounded-lg lg:w-[180px] lg:h-[160px] student-img-aspect-ratio" />
<button className="btn text-center flex justify-center items-center bg-orange-500 text-white" onClick={()=>document.getElementById('student-web-cemera-update').showModal()}>Upload</button>

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
               }}  placeholder="Type the batch name" required defaultValue={data?.batch} className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" />     
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
                   defaultValue={data?.rollNo}
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
         defaultValue={data?.name}
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
       defaultValue={data?.studentNickname}
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
              defaultValue={data?.fathersOrHusbandName}
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
              defaultValue={data?.mothersName}
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
              defaultValue={data?.fathersNumber}
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
              defaultValue={data?.mothersNumber}
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
              defaultValue={data?.fathersOccupation}
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
              defaultValue={data?.mothersOccupation}
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
          <textarea defaultValue={data?.presentAddress}  name="presentAddress" cols="30" rows="5" className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"></textarea>
        </div>
        <div className="w-full mt-2">
          <label
         
            className="text-[16px] font-medium text-black w-full"
          >
           Permanent Address
          </label>
          <textarea  defaultValue={data?.permanentAddress} name="permanentAddress" cols="30" rows="5" className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"></textarea>
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
              defaultValue={data?.dateOfBirth}
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
                
         <select id="dropdown1" defaultValue={data?.gender} name="gender" className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" >
         
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
                  
           <select id="dropdown1" name="group" defaultValue={data?.group} className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" >
           
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
                  
           <select id="dropdown1" name="religion" defaultValue={data?.religion} className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" >
           
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
                
         <select id="dropdown1" defaultValue={data?.bloodGroup}  name="bloodGroup" className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" >
         
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
              defaultValue={data?.mobile}
          
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
              defaultValue={data?.guardiansMobile}
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
              defaultValue={data?.studentSchool}
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
              defaultValue={data?.studentSchoolRoll}
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

              defaultValue={data?.studentMonthlyFee}
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
                  
           <select id="dropdown1" name="service" defaultValue={data?.service} className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" >
           
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
              defaultValue={data?.enrollDate}
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
                  
           <select id="dropdown" name="completedInfo" defaultValue={data?.completedInfo} className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" required>
        
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