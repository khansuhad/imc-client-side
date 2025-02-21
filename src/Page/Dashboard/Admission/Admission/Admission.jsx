import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaRegSave } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import Webcam from "react-webcam";
import axios from "axios";

import useAxiosPublic from "../../../../Hock/useAxiosPublic";
import { fetchBatchDetails, fetchBatches } from "../../../../Redux/Features/Batch/BatchSlice/BatchSlice";
import { fetchRegistrationNo, fetchRollNo } from "../../../../Redux/Features/Admissions/AdmissionsSlice/AdmissionsSlice";
import "./Admission.css";

const Admission = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { batches, batchDetails } = useSelector((state) => state.batches);
  const { checkRegistrationNo, checkRollNo } = useSelector((state) => state.admissions);
  const useAXios = useAxiosPublic();

  const [loadingButton, setLoadingButton] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedRoll, setSelectedRoll] = useState("");
  const [roll, setRoll] = useState(0);
  const [totalStudent, setTotalStudent] = useState("");
  const [cloudinaryPhotoURL, setCloudinaryPhotoURL] = useState("https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg");
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [filePhoto, setFilePhoto] = useState(null);
  const [uploading, setUploading] = useState(false);

  const videoConstraints = {
    facingMode: isFrontCamera ? "user" : { exact: "environment" },
  };

  useEffect(() => {
    dispatch(fetchBatches({ data: { searchTerm: "" }, axiosInstance: useAXios }));
    useAXios.get("/total-student-length").then((res) => {
      setTotalStudent(res?.data?.length);
    });
  }, [dispatch, useAXios]);

  const handleBatchChange = (batch) => {
    dispatch(fetchBatchDetails({ data: { searchTerm: batch }, axiosInstance: useAXios }));
    dispatch(fetchRollNo({ data: { searchTerm: `${moment().format("YY")}${selectedRoll}`, batch: selectedBatch }, axiosInstance: useAXios }));
    useAXios.get(`/total-student-batch?batch=${batch}`).then((res) => {
      setRoll(res?.data?.length + 1);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loadingButton) return;
    setLoadingButton(true);

    try {
      const form = e.target;
      const formData = new FormData(form);
      
      // Convert formData to an object, ensuring studentMonthlyFee is a number
      const formInfo = {
        ...Object.fromEntries(formData),
        studentMonthlyFee: Number(formData.get("studentMonthlyFee")), // Ensure it's a number
        rollNo: `${moment().format("YY")}${formData.get("rollNo")}`,
        registrationNo: `${moment().format("YYYY")}${formData.get("registrationNo")}`,
        photoURL: cloudinaryPhotoURL,
        duesMonth: calculateDues(formData.get("enrollDate"), Number(formData.get("studentMonthlyFee"))),
        duesBatchMonthlyFee : calculateDues(formData.get("enrollDate"), Number(batchDetails?.batchMonthlyFee)),
        completedInfo: "running student"
      };
    
      if (checkRegistrationNo || checkRollNo) {
        toast.error(checkRegistrationNo ? "Registration number already exists" : "Roll number already exists");
        return;
      }

      await useAXios.post("/admissions", formInfo);
      toast.success("Admission created successfully");

      if (formData.get("sendSms")) {
        await sendSMS(formData.get("guardiansMobile"), formData.get("studentNickname"),formData.get("batch"),formData.get("registrationNo"), batchDetails?.studentClass);
      }
      if (formData.get("sendSms" && formData.get("studentNickname"))) {
        await sendSMS(formData.get("mobile"), formData.get("studentNickname"),formData.get("batch"),formData.get("registrationNo") , batchDetails?.studentClass);
      }

      form.reset();
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while creating admission");
    } finally {
      setTimeout(() =>{
        setLoadingButton(false);
      },2000)
    }
  };

  const calculateDues = (enrollDate, studentMonthlyFee) => {
    const dues = [];
    let currentMonth = moment(enrollDate).startOf('month');
    const now = moment().startOf('month');

    while (currentMonth.isSameOrBefore(now)) {
      dues.push({ month: currentMonth.format("MMM YYYY"), fee: Number(studentMonthlyFee) });
      currentMonth.add(1, 'month');
    }

    return dues;
  };
  const getClassNumber = (className) => {
    switch (className) {
      case "সপ্তম":
        return 7;
      case "অষ্টম":
        return 8;
      case "নবম":
        return 9;
      case "দশম":
        return 10;
      case "একাদশ - দ্বাদশ":
        return "11-12";
    }
  };
  const sendSMS = async (mobile, nickname,batch,registrationNo,className) => {
    const studentClass = getClassNumber(className)
    try {
      const greenwebsms = new URLSearchParams();
      greenwebsms.append('token', '1196418472917392780491ebff42bd422c43a2fa2cc3d55be3c15');
      greenwebsms.append('to', mobile);
      greenwebsms.append('message', `প্রিয় ${nickname} ,ইনফিনিটি ম্যাথ সেন্টারে আপনাকে স্বাগতম! আপনার গণিতের কাঙ্ক্ষিত ফলাফল ও সার্বিক সফলতা অর্জনে আমরা পাশে আছি। IMC`);
     const res = await axios.post('https://api.bdbulksms.net/api.php', greenwebsms);
     console.log(res);
if(res?.status == 200){
  await useAXios.post('/sms', {createdAt: new Date(), mobile, nickname , message : `প্রিয় ${nickname} ,ইনফিনিটি ম্যাথ সেন্টারে আপনাকে স্বাগতম! আপনার গণিতের কাঙ্ক্ষিত ফলাফল ও সার্বিক সফলতা অর্জনে আমরা পাশে আছি। IMC` , messageType : 'admission',batch:batch, registrationNo:`${ moment().format("MMM YYYY")}${registrationNo}` });
}
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
  };

  const resetForm = () => {
    setCloudinaryPhotoURL("https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg");
    setFilePhoto(null);
    setRoll(0);
    dispatch(fetchBatches({ data: { searchTerm: "" }, axiosInstance: useAXios }));
    useAXios.get("/total-student-length").then((res) => {
      setTotalStudent(res?.data?.length);
    });
  };

  const handleRegChange = (e) => {
    dispatch(fetchRegistrationNo({ data: { searchTerm: `${moment().format("YYYY")}${e}` }, axiosInstance: useAXios }));
  };

  const handleRollChange = (e) => {
    dispatch(fetchRollNo({ data: { searchTerm: `${moment().format("YY")}${e}`, batch: selectedBatch }, axiosInstance: useAXios }));
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
    setFilePhoto(imageSrc);
  };

  const uploadToCloudinary = async () => {
    if (!photo) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('file', photo);
    formData.append('upload_preset', 'My_First_Cloudinary');
    formData.append('cloud_name', 'dc3czyqsb');

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dc3czyqsb/image/upload", formData);
      setCloudinaryPhotoURL(response.data.secure_url);
      toast.success("Photo uploaded successfully");
      document.getElementById('student-web-cemera').close();
      setFilePhoto(null);
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error("Failed to upload photo");
    } finally {
      setTimeout(() =>{
        setLoadingButton(false);
      },2000)
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    setFilePhoto(URL.createObjectURL(file));
    setPhoto(file);
  };

  const webcamRef = React.useRef(null);

  return (
    <>
      <dialog id="student-web-cemera" className="modal w-screen bg-white py-20 px-2">
        <div className="modal-box w-screen bg-white">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-[50%] top-2 border-2 border-orange-600 rounded-full">✕</button>
          </form>
          <div className="relative mt-8">
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width="100%" height="400px" videoConstraints={videoConstraints} />
            <button onClick={() => setIsFrontCamera((prev) => !prev)} className="mt-2 p-2 bg-blue-500 text-white rounded">Switch Camera</button>
            <button onClick={capturePhoto} className="bg-orange-500 text-white px-3 py-1 mt-2">Capture Photo</button>
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
              <button onClick={uploadToCloudinary} className="bg-orange-500 text-white px-3 py-1 mt-2" disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          )}
        </div>
      </dialog>

      <form onSubmit={handleSubmit} className="bg-background-gradient min-h-screen p-5 text-black" >
        <div className="bg-white flex justify-between items-center p-6">
<div> <h1 className="font-bold lg:text-3xl text-center lg:text-left">Admission Form</h1>
</div>

       
<figure className="  w-[150px] h-[150px] flex  flex-col gap-2 justify-center items-center mt-10">
<img src={cloudinaryPhotoURL} alt=""  className="border-2 border-[#9E9E9E] rounded-lg lg:w-[180px] lg:h-[160px] student-img-aspect-ratio" />
<button className="btn text-center flex justify-center items-center bg-orange-500 text-white" onClick={()=>document.getElementById('student-web-cemera').showModal()}>Upload</button>

</figure>
  
      
 </div>
           <div className="">
           <div className=" bg-white px-6 pb-6 shadow-custom-backend">
         <div>

         <div className="flex xl:flex-row flex-col  justify-between items-center gap-2 ">
                   
                    
                   <div className="w-full flex-1">
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
          {checkRegistrationNo && <span className="text-red-600">Registation Number already exists</span>}
                   </div>
                   <div className="flex flex-col lg:flex-row gap-2 flex-1">
                   <div className="mt-2 w-full flex-1">
                   <label
                  className="text-[16px] font-medium text-black w-full "
                >
           Batch No
                </label>
                          <div className="flex flex-col sm:flex-row gap-8 items-center ">
                       <input list="batch"  name="batch" onChange={(e) => {
                        setSelectedBatch(e.target.value)
                        handleBatchChange(e.target.value)
                        }}  placeholder="Type the batch name" required className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" />     
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
                          placeholder="2525"
                           className={`block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black ${checkRollNo ? "border-red-600 focus:outline-red-600" : "border-[#9E9E9E] "}`}
                        />
                      </div> 
                      {checkRollNo && <span className="text-red-600">Roll Number already exists</span>} </div>
                   </div>
                  
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
                className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
              />
            </div>
                   </div>
         </div>
           <div className="flex xl:flex-row flex-col-reverse justify-between items-center gap-2 ">

                      
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
                 <div className=" w-full mt-2">
              <label
                className="text-[16px] font-medium text-black w-full"
              >
              Send SMS
              </label>
              <input
                type="checkbox"
                name="sendSms"

                
                className="block border-[1px]  p-1 font-light lg:text-[16px] ml-2  rounded border-[#9E9E9E] text-black"
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
  disabled={loadingButton}
>
  {loadingButton ? "Save..." : "Save"} <FaRegSave />
</button>
                <button className="rounded-lg bg-[#9E9E9E] hover:bg-slate-600 duration-500 transition-all text-white px-5 py-2 flex gap-3 text-2xl">Reset</button>
            </div>
            <Toaster />
            </form>
    </>
  );
};

export default Admission;