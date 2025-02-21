import { updateProfile } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import useBatchesName from '../../../../Hooks/useBatchesName';
import useCoursesName from '../../../../Hooks/useCoursesName';
import useTodayDate from '../../../../Hooks/useTodayDate';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import { AuthContext } from '../../../../Provider/AuthProvider/AuthProvider';
import { useLoaderData, useNavigate } from 'react-router-dom';
import moment from 'moment';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { FaRegSave } from 'react-icons/fa';

const PendingAdmissionApprove = () => {
  const navigate= useNavigate()
  const data =useLoaderData()
  const {createUser, setUser} = useContext(AuthContext);
  const [payable , setPayable] = useState(0)
  const [loadingButton , setLoadingButton] = useState(false)
    const useAXios = useAxiosSecure();
    const [roll , setRoll] = useState(0)
    const [downPayment , setDownPayment] = useState(0)
    const [firstInstallment , setFirstInstallment] = useState(0)
    const [totalStudent , setTotalStudent] = useState(0)
    const [fee , setFee ] = useState(0)
  
   
    const [batchSelectedOption, setBatchSelectedOption] = useState('');
    const {coursesName , isLoadingCoursesName, isPendingCoursesName} = useCoursesName();
    const {batchesName , isLoadingBatchesName, isPendingBatchesName} = useBatchesName();
    const [selectedCourse , setSelectedCourse] = useState("")
    const [batchOptions , setBatchOptions] = useState([])
    const updateProfileSuccessToast = () =>
      toast.success("created successfully");
      const [discount , setDiscount ] = useState(0)
      const [image , setImage ] = useState("https://www.shutterstock.com/image-vector/man-shirt-tie-businessman-avatar-600nw-548848999.jpg")
      useEffect(() => {
        const calculatedPayable = fee - discount;
        setPayable(calculatedPayable);
        
     
        const calculatedFirstInstallment = calculatedPayable - downPayment;
        setFirstInstallment(calculatedFirstInstallment);
    
       
      }, [fee, discount, downPayment]);
   useEffect(() =>{
    const calculatedPayable = fee - discount;
    setDownPayment(calculatedPayable)
   }, [discount,fee])
  useEffect(() => {
    
    const  searchCourse = coursesName?.find(course => course?.courseName === selectedCourse)
 if(searchCourse != undefined){
  useAXios.get(`/courses/${searchCourse._id}`)
  .then(res => {
    
    const batches = res?.data ;
    setBatchOptions(batches?.totalBatch)
  })
 }
    if( batchSelectedOption != ''){

      useAXios.get(`/batchStudentLength/${batchSelectedOption}`)
      .then(res => {
        
        const roll = res?.data ;
        setRoll(roll)
      })
     }
     useAXios.get(`/totalStudentLength`)
     .then(res => {
       
       const student = res?.data ;
       setTotalStudent(student)
     })
  },[batchesName ,selectedCourse,useAXios,batchSelectedOption,coursesName,discount,payable,downPayment])
 
  
 
 
    const handleBatchChange = (selectedOption) => {
      setBatchSelectedOption(selectedOption)
    }
    const handleSelectedCourse = (value) => {
        setSelectedCourse(value)
    }
   
   
 
  
    const handleSubmit = (e) =>{
        e.preventDefault();        
  setLoadingButton(true)
        const form = e.target;
        const fathersOrHusbandName = form.fathersOrHusbandName.value;
        const mothersName = form.mothersName.value;
        const name = form.name.value;
        const gender = form.gender.value;
        const dateOfBirth = form.dateOfBirth.value;
        const highestEducationQualification = form.highestEducationQualification.value;
        const occupation = form.occupation.value;
        const mobile = form.mobile.value;
        const guardiansMobile = form.guardiansMobile.value;
        const presentAddress = form.presentAddress.value;
        const permanentAddress = form.permanentAddress.value;
        const type = form.type.value;
        const course = form.course.value;
        const courseDuration = form.courseDuration.value;
        const bloodGroup = form.bloodGroup.value;
        const maritalStatus = form.maritalStatus.value;
        const batch = form.batch.value;
        const enrollDate = form.enrollDate.value;
        const sessionStart = form.sessionStart.value;
        const sessionEnd = form.sessionEnd.value;
        const fee = form.fee.value;
        const discount = form.discount.value;
        const payable = form.payable.value;
        const downPayment = form.downPayment.value;
        const downPaymentDate = form.downPaymentDate.value;
        const downPaymentMode = form.downPaymentMode.value;
        const downPaymentTrxNo = form.downPaymentTrxNo.value;
        const secondInstallment = form.secondInstallment.value;
        const secondInstallmentDate = form.secondInstallmentDate.value;
        const firstInstallment = form.firstInstallment.value;
        const firstInstallmentDate = form.firstInstallmentDate.value;
        const reference = form.reference.value;
        const referenceAddress = form.referenceAddress.value;
        const referenceMobile = form.referenceMobile.value;
        const completedCourseDate = form.completedCourseDate.value;
        const issueDate = form.issueDate.value;
        const completedInfo = form.completedInfo.value;
        const email = form.email.value;
        const rollNo = roll ;
        const registrationNo = totalStudent?.length + 10001 ;
        const examFee = 'unpaid' ;
        const defaultPassword = Math.floor(100000 + Math.random() * 900000).toString();
     const formInfo = {examFee ,completedInfo,issueDate,completedCourseDate,downPaymentMode,downPaymentTrxNo,name , fathersOrHusbandName, mobile,mothersName, gender, dateOfBirth,highestEducationQualification,occupation,maritalStatus,bloodGroup,guardiansMobile,email,photoURL : image,presentAddress,permanentAddress,type,course,courseDuration,batch,rollNo,registrationNo,enrollDate,sessionEnd,sessionStart, fee,discount,payable,downPayment,downPaymentDate,secondInstallment,secondInstallmentDate,firstInstallment,firstInstallmentDate,reference,referenceAddress,referenceMobile}
     //(formInfo);
     const userInfo = {
      displayName: name,
      photoURL: image,
      email: email,
      role:"student",
      defaultPassword : defaultPassword 
    }
    useAXios.post("/users",userInfo )
    .then(res=>{
      if(res?.data?.insertedId){
        useAXios.post("/admissions" , formInfo)
        .then(res => {
          
          const { downPayment,downPaymentDate, downPaymentMode , downPaymentTrxNo , ...info} = formInfo;
          const feesInfo = { registrationNo: formInfo?.registrationNo , date: downPaymentDate , paymentMode : downPaymentMode , trxNo:downPaymentTrxNo , amount:downPayment ,   }
          useAXios.post("/fees" , feesInfo)
               .then(res => {  
                useAXios.delete(`/pending-admissions/${data?._id}` )
                .then(res => {  
   
                  updateProfileSuccessToast();
         navigate("/dashboard/currentStudent")
                  form.reset()
                })
             
               })
        })
      }
     else{
      toast.error("This Email Already Exists...")
     }
    })
    .catch((error) => {
      toast.error(`${error.code} : ${error.message}`)
    })
    
    
    }
    if (isLoadingCoursesName || isLoadingBatchesName || isPendingBatchesName || isPendingCoursesName){
      return <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
     }
    return (
      <div>

      <form onSubmit={handleSubmit}   className="bg-background-gradient min-h-screen p-5 text-black">
      <div className="bg-white flex justify-between items-center p-6">
<div> <h1 className="font-bold lg:text-3xl text-center lg:text-left">Admission Form</h1>
<h1 className="text-xl text-[red] text-center lg:text-left">Registration No: <span className="text-black">{data?.registrationNo}</span></h1></div>
 
<figure className="  w-[150px] h-[150px] flex justify-center items-center ">
<img src={image} alt=""  className="border-2 border-[#9E9E9E] rounded-lg lg:w-[180px] lg:h-[160px]" />
</figure>


</div>
     <div >
     <div className=" bg-white px-6 pb-6 shadow-custom-backend">
     <div className="flex xl:flex-row flex-col-reverse justify-between items-center gap-5">
             
              
           <div className="w-full">
           
                  <div className=" xl:w-[740px]  w-full">
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
     
           </div>
           <div className="w-full ">
                <label className="text-[16px] font-medium text-black w-full">
                 Student Photo
                </label>
                <input
                  type="text"
                  name="studentImage"
                  required
                  defaultValue={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://imgelinkfromanyweb.com"
                   className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
                />
              </div>
                
              </div>
              <div  className="bg-white  ">
                  
           <div  className="grid  grid-cols-1 lg:grid-cols-2 gap-2">
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
           </div>
           <div className="">
                  <div className="w-full mt-2">
      <label
     
        className="text-[16px] font-medium text-black w-full"
      >
     Present Address
      </label>
      <textarea  defaultValue={data?.presentAddress} name="presentAddress" cols="30" rows="5" className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"></textarea>
    </div>
    <div className="w-full mt-2">
      <label
     
        className="text-[16px] font-medium text-black w-full"
      >
       Permanent Address
      </label>
      <textarea defaultValue={data?.permanentAddress}  name="permanentAddress" cols="30" rows="5" className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"></textarea>
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
        Occupation
        </label>
                  <div className="flex flex-col sm:flex-row gap-8 items-center ">
            
     <select id="dropdown2" defaultValue={data?.occupation} name="occupation" className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" >
     <option  value=''>Business</option> 
             <option value="Student">Student</option>
             <option value="Job">Job</option>
             
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
            
     <select id="dropdown1"defaultValue={data?.bloodGroup} name="bloodGroup" className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" >
     
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
           <div className="mt-2">
           <label
          className="text-[16px] font-medium text-black w-full "
        >
       Marital Status
        </label>
                  <div className="flex flex-col sm:flex-row gap-8 items-center ">
            
     <select id="dropdown1" defaultValue={data?.maritalStatus} name="maritalStatus" className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" >
     
             <option value="Single">Single</option>
             <option value="Married">Married</option>
            
</select>
     </div>
           </div>
           <div className=" w-full mt-2">
        <label
          className="text-[16px] font-medium text-black w-full"
        >
       E-mail
        </label>
        <input
          type="email"
          name="email"
          readOnly
          defaultValue={data?.email}
          className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
        />
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
          required
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
          className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
        />
      </div>
      <div className=" w-full mt-2">
        <label
          className="text-[16px] font-medium text-black w-full"
        >
        Highest Educational Qualification
        </label>
        <input
          type="text"
          name="highestEducationQualification"
          defaultValue={data?.highestEducationQualification}
          className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
        />
      </div>  
      
                  </div>
                 
                  
          
         
  

    
                  </div>
              </div>

              
     </div>
     <div className="mt-8 bg-white p-6 shadow-custom-backend">
     <div className="py-6 ">
              <div className="flex justify-between gap-2 items-center">
                  <h1 className="font-bold lg:text-3xl mb-2">course Information</h1>
                 
              </div>
              
              </div>
              <hr className="border w-full mx-auto " />
              <div  className="bg-white  ">
                  <div className="">
                  
                 
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
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
     Certificate Type
        </label>
                  <div className="flex flex-col sm:flex-row gap-8 items-center ">
            
     <select id="dropdown3" defaultValue={data?.type} name="type" className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" >
             <option  value=''>...</option> 
             <option value="Cetificate">Certificate</option>
             <option value="Non-Cetificate">Non-Certificate</option>
             <option value="Others">Others</option>
         
</select>
     </div>
           </div>
           <div className="mt-2">
           <label
          className="text-[16px] font-medium text-black w-full "
        >
        Course
        </label>
                  <div className="flex flex-col sm:flex-row gap-8 items-center ">
               <input list="course" onChange={(e) => handleSelectedCourse(e.target.value)} name="course" required placeholder="Type the course name" defaultValue={data?.course} className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" />     
     <datalist id="course"  > 
    
        {
          coursesName?.map(course =><>
          <option key={course?._id} value={course?.courseName}>{course?.courseName}</option>
          </>)
        }
 

</datalist>

     </div>
           </div>
          
           <div className="mt-2">
           <label
          className="text-[16px] font-medium text-black w-full "
        >
   Batch No
        </label>
                  <div className="flex flex-col sm:flex-row gap-8 items-center ">
               <input list="batch"  name="batch" defaultValue={data?.batch} onChange={(e) => handleBatchChange(e.target.value)} required placeholder="Type the batch name" className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" />     
     <datalist id="batch"  > 
    
        {
       selectedCourse  !==  '' ?   
        batchOptions?.length !== 0 ? batchOptions?.map(batch =><>
          <option key={batch?._id} value={batch?.batchTitle}>{batch?.batchTitle}</option>
          </>) : <option >...</option>
        : batchesName?.map(batch =><>
          <option key={batch?._id} value={batch?.batchTitle}>{batch?.batchTitle}</option>
          </>)
        }
 

</datalist>

     </div>
           </div>

           <div className=" w-full mt-2">
        <label
          className="text-[16px] font-medium text-black w-full"
        >
     Roll Number
        </label>
        <input
          type="number"
          name="rollNo"
          defaultValue={data?.rollNo}
         required
          className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
          readOnly
        />
      </div>
           <div className=" w-full mt-2">
        <label
          className="text-[16px] font-medium text-black w-full"
        >
        Session Start
        </label>
        <input
          type="month"
          name="sessionStart"
          defaultValue={data?.sessionStart}
          className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
        />
      </div>
      <div className=" w-full mt-2">
        <label
          className="text-[16px] font-medium text-black w-full"
        >
        Session End
        </label>
        <input
          type="month"
          name="sessionEnd"
          defaultValue={data?.sessionEnd}
          className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
        />
      </div>
      <div className=" w-full mt-2">
        <label
          className="text-[16px] font-medium text-black w-full"
        >
    Course Duration
        </label>
        <input
          type="text"
          name="courseDuration"
          defaultValue={data?.courseDuration}
          className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
        />
      </div>

</div>

    
                  </div>
     </div>
     

           
      </div>
      <div className="mt-8 bg-white p-6 shadow-custom-backend ">
     <div className="py-6  ">
              <div className="flex justify-between gap-2 items-center">
                  <h1 className="font-bold lg:text-3xl mb-2">fees Information</h1>
                 
              </div>
              
              </div>
              <hr className="border w-full mx-auto " />
              <div  className="">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  
                  <div className=" w-full mt-2">
        <label
          className="text-[16px] font-medium text-black w-full"
        >
        Course Fee
        </label>
        <input
          type="number"
          name="fee"
          onChange={(e) => setFee(e.target.value) }
          defaultValue={data?.fee}
          className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
        />
      </div>
     
                  <div className=" w-full mt-2">
        <label
          className="text-[16px] font-medium text-black w-full"
        >
       Discount(Fixed Amount)
        </label>
        <input
          type="number"
          name="discount"
          onChange={(e) => setDiscount(e.target.value) }
          defaultValue={data?.discount}
          className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
        />
      </div>
      <div className=" w-full mt-2">
        <label
          className="text-[16px] font-medium text-black w-full"
        >
     Total Payable Amount
        </label>
        <input
          type="number"
          name="payable"
          readOnly
          value={payable}
         
          className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
        />
      </div>
                  
                  </div>
           
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">

<div className=" w-full mt-2">
        <label
          className="text-[16px] font-medium text-black w-full"
        >
        Down Payment
        </label>
        <input
          type="number"
          name="downPayment"
          value={downPayment}
          onChange={(e) => setDownPayment(Number(e.target.value))}
          className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
        />
      </div>
      <div className=" w-full mt-2">
        <label
          className="text-[16px] font-medium text-black w-full"
        >
        Down Payment Date
        </label>
        <input
          type="date"
          name="downPaymentDate"
        
          defaultValue={data?.downPaymentDate}
          className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
        />
      </div>
      <div className="mt-2">
           <label
          className="text-[16px] font-medium text-black w-full "
        >
        Payment Mode
        </label>
                  <div className="flex flex-col sm:flex-row gap-8 items-center  ">
            
     <select id="dropdown" defaultValue={data?.downPaymentMode} name="downPaymentMode" className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" required>
  
             <option value="Cash">Cash</option>
             <option value="Bkash">Bkash</option>
             <option value="Nagad">Nagad</option>
             <option value="Rocket">Rocket</option>
             <option value="Bank">Bank</option>
</select>
     </div>
           </div>
      <div className=" w-full mt-2">
        <label
          className="text-[16px] font-medium text-black w-full"
        >
       Transection ID
        </label>
        <input
          type="text"
          name="downPaymentTrxNo"
          required
          defaultValue={data?.downPaymentTrxNo}
          className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
        />
      </div>
      <div className=" w-full mt-2">
        <label
          className="text-[16px] font-medium text-black w-full"
        >
        1st Installment
        </label>
        <input
          type="number"
          name="firstInstallment"
          onChange={(e) => setFirstInstallment(Number(e.target.value))}
          value={firstInstallment}
          readOnly={downPayment === payable}
          className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
        />
      </div>
      <div className=" w-full mt-2">
        <label
          className="text-[16px] font-medium text-black w-full"
        >
        1st Installment Date
        </label>
        <input
          type="date"
          name="firstInstallmentDate"
          defaultValue={data?.firstInstallmentDate}
          className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
        />
      </div>
<div className=" w-full mt-2">
        <label
          className="text-[16px] font-medium text-black w-full"
        >
        2nd Installment
        </label>
        <input
          type="number"
          name="secondInstallment"
          value={Number(payable) - (Number(downPayment) + Number(firstInstallment)) }
          className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
        />
      </div>
      <div className=" w-full mt-2">
        <label
          className="text-[16px] font-medium text-black w-full"
        >
        2nd Installment Date
        </label>
        <input
          type="date"
          name="secondInstallmentDate"
          defaultValue={data?.secondInstallmentDate}
          className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
        />
      </div>
      

     

</div>


      
    
                  </div>
     </div>
     <div className="mt-8 bg-white p-6 shadow-custom-backend ">
     <div className=" py-6">
              <div className="flex justify-between gap-2 items-center">
                  <h1 className="font-bold lg:text-3xl mb-2">Reference</h1>
                 
              </div>
              
              </div>
              <hr className="border w-full mx-auto " />
              <div  className=" ">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  
                  <div className=" w-full mt-2">
        <label
          className="text-[16px] font-medium text-black w-full"
        >
        Reference
        </label>
        <input
          type="text"
          name="reference"
          defaultValue={data?.reference}
          className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
        />
      </div>
   
                  <div className=" w-full mt-2 ">
        <label
          className="text-[16px] font-medium text-black w-full"
        >
       Ref. Address
        </label>
        <input
          type="text"
          name="referenceAddress"
          defaultValue={data?.referenceAddress}
          className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
        />
      </div>
      <div className=" w-full mt-2">
        <label
          className="text-[16px] font-medium text-black w-full"
        >
        Ref. Mobile
        </label>
        <input
          type="tel"
          name="referenceMobile"
          defaultValue={data?.referenceMobile}
          className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
        />
      </div>
                 
                  </div>
       

     

    
                  </div>
     </div>
     <div className="mt-2 bg-white p-6 shadow-custom-backend ">
     <div className=" py-6">
              <div className="flex justify-between gap-2 items-center">
                  <h1 className="font-bold lg:text-3xl mb-2">Course Completed Information</h1>
                 
              </div>
              
              </div>
              <hr className="border w-full mx-auto " />
              <div  className=" ">
                  <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-2">
                  
                  <div className=" w-full mt-2">
        <label
          className="text-[16px] font-medium text-black w-full"
        >
        Completed Course Date
        </label>
        <input
          type="date"
          name="completedCourseDate"
          defaultValue={data?.completedCourseDate}
          className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
        />
      </div>
      <div className=" w-full mt-2 ">
        <label
          className="text-[16px] font-medium text-black w-full"
        >
       Issue Date
        </label>
        <input
          type="date"
          name="issueDate"
          defaultValue={data?.issueDate}
          className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
        />
      </div>
      <div className="mt-2">
           <label
          className="text-[16px] font-medium text-black w-full "
        >
        Completed
        </label>
                  <div className="flex flex-col sm:flex-row gap-8 items-center  ">
            
     <select id="dropdown" name="completedInfo" defaultValue={data?.completedInfo} className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" required>
  
             <option value="runningApplication">Running Application</option>
             <option value="courseCompleted">Course Completed</option>
            
</select>
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
</div>
          
    );
};

export default PendingAdmissionApprove;