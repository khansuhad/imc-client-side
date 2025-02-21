import { Link, useNavigate } from "react-router-dom";

import ReactSelect from "react-select";

import { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import moment from "moment";

import { FaRegSave } from "react-icons/fa";
import useAxiosPublic from "../../../../Hock/useAxiosPublic";
import { useDispatch, useSelector } from "react-redux";
import { fetchBatchDetails, fetchBatches, fetchBatchesStudents, fetchClassBatches } from "../../../../Redux/Features/Batch/BatchSlice/BatchSlice";
import { fetchStudentDetails } from "../../../../Redux/Features/Admissions/AdmissionsSlice/AdmissionsSlice";
import { fetchTransectionsCount } from "../../../../Redux/Features/Fees/TransectionsSlice/TransectionsSlice";
import axios from "axios";

const TransectionEntry = () => {
  const selectCustomStyles = {
    control: (provided) => ({
      ...provided,
     
      border: '1px solid #9E9E9E',
       /* Tailwind class `p-1` */
      fontWeight: '300', /* Tailwind class `font-light` */
      fontSize: '16px', /* Tailwind class `lg:text-[16px]` */
      marginTop: '0.25rem', /* Tailwind class `mt-2` */
      width:' 100%', /* Tailwind class `w-full` */
      borderRadius: '0.175rem', /* Tailwind class `rounded` */
      
    }),
    
  };

  const useAXios = useAxiosPublic();
  const dispatch = useDispatch()
  const {batches,batchesStudents,batchDetails} = useSelector((state) => state.batches)
  const {transectionCount} = useSelector((state) => state.transections)
  const {studentInfo} = useSelector((state) => state.admissions)

  const navigate = useNavigate();
  const updateProfileSuccessToast = () =>
    toast.success("created successfully");
  const updateProfileErrorToast = () => toast.error("Profile can't update");
  const [monthlyFee,setMonthlyFee] = useState("Monthly Fee")
  const [loadingButton , setLoadingButton] = useState(false)

  const [income , setIncome] = useState(true)
  const [studentOptions , setStudentOptions] = useState([])
  const [batchSelected, setBatchSelected] = useState("")
  const [duesMonthOptions, setDuesMonthOptions] = useState([])
  const [duesMonthlyFeeOptions, setDuesMonthlyFeeOptions] = useState([])
  const [totalDue, setTotalDue] = useState(0)
  const [monthDue,setMonthDue] = useState(0)
  const [monthFeeDue,setMonthFeeDue] = useState(0)
  const axiosInstance = useAxiosPublic()

  const {classBatches} = useSelector((state) => state.batches)

 const handleClassBatches = (studentClass) => {
    console.log(studentClass);
    dispatch(fetchClassBatches({data: {searchTerm : studentClass}, axiosInstance : axiosInstance}))
 }
 useEffect(() => {
  dispatch(fetchClassBatches({data: {searchTerm : "সপ্তম"}, axiosInstance : axiosInstance}))
 },[])
  useEffect(() => {
 
          const totalDue = studentInfo?.duesMonth?.reduce((prev,cur) => prev + cur.fee ,0)
          setMonthDue(totalDue)
          const totalMonthlyFeeDue = studentInfo?.duesBatchMonthlyFee?.reduce((prev,cur) => prev + batchDetails?.batchMonthlyFee ,0)
          setMonthFeeDue(totalMonthlyFeeDue)
          setTotalDue(totalDue + totalMonthlyFeeDue)
    
          const student = []
          if(batchesStudents.length > 0) {
            for(let i = 0 ; i <= batchesStudents.length - 1 ; i++)
          {
            let batch = { value : `${batchesStudents[i]?._id}` , label : `${batchesStudents[i]?.registrationNo}/${batchesStudents[i]?.name}/${batchesStudents[i]?.mobile} `}
            student.push(batch)
          }
          }
          setStudentOptions(student)
          const duesMonth = []
          if(studentInfo?.duesMonth?.length > 0) {
            for(let i = 0 ; i <= studentInfo?.duesMonth?.length - 1 ; i++)
          {
            let batch = { value : studentInfo?.duesMonth[i] , label : `${studentInfo?.duesMonth[i].month}/${studentInfo?.duesMonth[i].fee} `}
            duesMonth.push(batch)
          }
          }
          setDuesMonthOptions(duesMonth)
          console.log(batchDetails);
          const duesMonthlyFee = []
          if(studentInfo?.duesBatchMonthlyFee?.length > 0) {
            for(let i = 0 ; i <= studentInfo?.duesBatchMonthlyFee?.length - 1 ; i++)
          {
            let batch = { value : {month : studentInfo?.duesBatchMonthlyFee[i].month , fee : batchDetails?.batchMonthlyFee} , label : `${studentInfo?.duesBatchMonthlyFee[i].month}/${batchDetails?.batchMonthlyFee} `}
            duesMonthlyFee.push(batch)
          }
          }
          setDuesMonthlyFeeOptions(duesMonthlyFee)
          console.log(batchDetails);
  },[ batchesStudents,useAXios,studentInfo?.duesMonth,studentInfo?.duesBatchMonthlyFee,batchDetails?.batchMonthlyFee,batchDetails,axiosInstance,dispatch])
useEffect(() => {
  dispatch(fetchBatches({data: {searchTerm : ""}, axiosInstance : useAXios}))
  dispatch(fetchTransectionsCount({data: {searchTerm : ""}, axiosInstance : useAXios}))
 

  //(batchesStudents.length);

      

},[useAXios,dispatch])
        const [batchSelectedOption, setBatchSelectedOption] = useState('');
        const handleBatchChange = (selectedOption) => {
            console.log(selectedOption);
          dispatch(fetchBatchesStudents({data: {searchTerm : selectedOption}, axiosInstance : useAXios}))
          dispatch(fetchBatchDetails({data: {searchTerm : selectedOption}, axiosInstance : useAXios}))
          setStudentSelectedOption("")
          setDuesMonthSelectedOption("")
          setDuesMonthlyFeeSelectedOption("")
          setDuesMonthlyFeeOptions([])
          setDuesMonthOptions([])
          // dispatch(fetchBatchDetails({data: {searchTerm : selectedOption}, axiosInstance : useAXios}))
        
       //(selectedOption);
        };
        const [studentSelectedOption, setStudentSelectedOption] = useState('');
        const handleStudentChange = (selectedOption) => {
       dispatch(fetchStudentDetails({data: {searchTerm : selectedOption?.value}, axiosInstance : useAXios}))
          setStudentSelectedOption(selectedOption)

        };
        const [duesMonthSelectedOption, setDuesMonthSelectedOption] = useState([]);
        console.log(duesMonthSelectedOption);
        const handleDuesMonthChange = (selectedOption) => {
  
       setDuesMonthSelectedOption(selectedOption)

        };
        const [duesMonthlyFeeSelectedOption, setDuesMonthlyFeeSelectedOption] = useState([]);
        console.log(duesMonthlyFeeSelectedOption);
        const handleDuesMonthlyFeeChange = (selectedOption) => {
  
       setDuesMonthlyFeeSelectedOption(selectedOption)

        };
        const formatMonth = (month) => {
          const [name, year] = month.split(' ');
          return `${name.toLowerCase().slice(0, 3)}/${year.slice(2)}`;
        };
        const sendSMS = async ( allData ,duesMonth ,duesBatchMonthlyFee,mobile) => {
          const totalTaka = allData?.duesMonth?.reduce((prev, cur) => prev + Number(cur.fee), 0) + allData?.duesBatchMonthlyFee?.reduce((prev, cur) => prev + Number(cur.fee), 0);
          
          // Format the duesMonth and duesBatchMonthlyFee arrays
          const duesMonthText = duesMonth?.reduce((prev, cur) => prev + Number(cur.fee), 0) > 0 
            ? `${duesMonth?.map(item => formatMonth(item?.month)).join(', ')} মাসের বেতন বাবত ${duesMonth?.reduce((prev, cur) => prev + Number(cur.fee), 0)} টাকা`
            : '';
 
          const duesBatchText = duesBatchMonthlyFee?.reduce((prev, cur) => prev + Number(cur.fee), 0) > 0 
            ? `Exam ফি ${duesBatchMonthlyFee?.map(item => formatMonth(item?.month)).join(', ')} মাস বাবত ${duesBatchMonthlyFee?.reduce((prev, cur) => prev + Number(cur.fee), 0)} টাকা`
            : '';
        
          try {
            const greenwebsms = new URLSearchParams();
            greenwebsms.append('token', '1196418472917392780491ebff42bd422c43a2fa2cc3d55be3c15');
            greenwebsms.append('to', mobile);
            greenwebsms.append('message', `প্রিয় ${allData?.studentNickname},

আপনার ${duesMonthText} ${(duesMonth?.reduce((prev, cur) => prev + Number(cur.fee), 0) > 0  && duesBatchMonthlyFee?.reduce((prev, cur) => prev + Number(cur.fee), 0) > 0)  ? `এবং ` : ``} ${duesBatchText} পরিশোধের জন্য ধন্যবাদ। ${(allData?.duesMonth?.reduce((prev,cur) => prev + Number(cur.fee) ,0) +  allData?.duesBatchMonthlyFee?.reduce((prev,cur) => prev + cur.fee ,0) ) - (duesMonth?.reduce((prev, cur) => prev + Number(cur.fee), 0) + duesBatchMonthlyFee?.reduce((prev, cur) => prev + Number(cur.fee), 0)) > 0 ? `Due রয়েছে ${(allData?.duesMonth?.reduce((prev,cur) => prev + Number(cur.fee) ,0) +  allData?.duesBatchMonthlyFee?.reduce((prev,cur) => prev + cur.fee ,0) ) - (duesMonth?.reduce((prev, cur) => prev + Number(cur.fee), 0) + duesBatchMonthlyFee?.reduce((prev, cur) => prev + Number(cur.fee), 0))} টাকা।` : ``}
আপনার নিরবচ্ছিন্ন শিক্ষাগত অগ্রগতির জন্য আমরা প্রতিশ্রুতিবদ্ধ।

ধন্যবাদান্তে,
ইনফিনিটি ম্যাথ সেন্টার`);
        
            const res = await axios.post('https://api.bdbulksms.net/api.php', greenwebsms);
            console.log(res);
        
            if (res?.status === 200) {

              await axiosInstance.post('/sms', {
                createdAt: new Date(),
                mobile,
                nickname:allData?.studentNickname,
                message: `প্রিয় ${allData?.studentNickname},

আপনার ${duesMonthText} ${(duesMonth?.reduce((prev, cur) => prev + Number(cur.fee), 0) > 0  && duesBatchMonthlyFee?.reduce((prev, cur) => prev + Number(cur.fee), 0) > 0)  ? `এবং ` : ``} ${duesBatchText} পরিশোধের জন্য ধন্যবাদ। ${(allData?.duesMonth?.reduce((prev,cur) => prev + Number(cur.fee) ,0) +  allData?.duesBatchMonthlyFee?.reduce((prev,cur) => prev + cur.fee ,0) ) - (duesMonth?.reduce((prev, cur) => prev + Number(cur.fee), 0) + duesBatchMonthlyFee?.reduce((prev, cur) => prev + Number(cur.fee), 0)) > 0 ? `Due রয়েছে ${(allData?.duesMonth?.reduce((prev,cur) => prev + Number(cur.fee) ,0) +  allData?.duesBatchMonthlyFee?.reduce((prev,cur) => prev + cur.fee ,0) ) - (duesMonth?.reduce((prev, cur) => prev + Number(cur.fee), 0) + duesBatchMonthlyFee?.reduce((prev, cur) => prev + Number(cur.fee), 0))} টাকা।` : ``}
আপনার নিরবচ্ছিন্ন শিক্ষাগত অগ্রগতির জন্য আমরা প্রতিশ্রুতিবদ্ধ।

ধন্যবাদান্তে,
ইনফিনিটি ম্যাথ সেন্টার`,
                messageType: 'Fees Receive',
                batch: allData?.batch,
                registrationNo: allData?.registrationNo
              });
            }
          } catch (error) {
            console.error("Error sending SMS:", error);
          }
        };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoadingButton(true)
        const form = e.target;
        const sendSms = form.sendSms.checked ;
        console.log(studentSelectedOption.value);
        const student = batchesStudents?.find(student => student._id == studentSelectedOption.value)
       if(typeof(studentSelectedOption.value) == 'string' ){
        const date = form.date.value;
        const category = form.category.value;
        
        const description = form.description.value;
        const transectionMode = form.transectionMode.value;
        const cashReceived = form.cashReceived.value;
        const year = moment().format('YYYY')
        const invoiceNumber = `#IMC${year}-${transectionCount.length}`
      if(category === "Monthly Fee"){
        const duesMonth = duesMonthSelectedOption.length > 0 ? duesMonthSelectedOption?.map(month => {return month.value}) : [] ;
        const duesBatchMonthlyFee = duesMonthlyFeeSelectedOption.length > 0 ? duesMonthlyFeeSelectedOption?.map(month => {return month.value}) : []
        console.log(duesMonth);
       
               const formInfo = {batch : student?.batch,date,category ,duesBatchMonthlyFee,description,transectionMode,cashReceived,duesMonth,registrationNo :student?.registrationNo,invoiceNumber }
        console.log(formInfo);
      const res = await useAXios.post(`/payment`,formInfo)
      console.log(res?.data ,"okoksada");
        if(res?.data?.paymentResult?.insertedId) {
          // form.reset()
          dispatch(fetchStudentDetails({data: {searchTerm : student?._id}, axiosInstance : useAXios}))
          dispatch(fetchBatchesStudents({data: {searchTerm : ""}, axiosInstance : useAXios}))
          dispatch(fetchBatchDetails({data: {searchTerm : ""}, axiosInstance : useAXios}))
          dispatch(fetchStudentDetails({data: {searchTerm : ""}, axiosInstance : useAXios}))
          setStudentSelectedOption("")
          setDuesMonthSelectedOption([])
          setDuesMonthlyFeeSelectedOption([])
          setDuesMonthlyFeeOptions([])
          setDuesMonthOptions([])
          setMonthlyFee("Monthly Fee")
          form.reset()
          toast.success("success")
          if(sendSms){
            if(student?.mobile){
              sendSMS(student,duesMonth,duesBatchMonthlyFee, student?.mobile)
            }
            sendSMS(student,duesMonth,duesBatchMonthlyFee, student?.guardiansMobile)
          }
          setTimeout(() =>{
          
            setLoadingButton(false)
          },2000)
        }
        else{
          setTimeout(() =>{
            setLoadingButton(false)
          },2000)
        }


      }
      if(category === "Admission Fee"){
        const formInfo = {batch : student?.batch,date,category ,description,transectionMode,cashReceived,registrationNo :student?.registrationNo,invoiceNumber }
        useAXios.post(`/payment/admissions`,formInfo)
        .then(res => {
          // form.reset()
          dispatch(fetchBatchesStudents({data: {searchTerm : ""}, axiosInstance : useAXios}))
          dispatch(fetchBatchDetails({data: {searchTerm : ""}, axiosInstance : useAXios}))
          setStudentSelectedOption("")
          setDuesMonthSelectedOption("")
          setDuesMonthlyFeeSelectedOption("")
          setDuesMonthlyFeeOptions([])
          setDuesMonthOptions([])
          setMonthlyFee("Monthly Fee")
          form.reset()
          toast.success("success")
          setTimeout(() =>{
            setLoadingButton(false)
          },2000)
        })
        setTimeout(() =>{
          setLoadingButton(false)
        },2000)
      }
      
    }
     }
    const handleCategoryChange= (value) => {
          setMonthlyFee(value)
    }
    return (
        <div className="bg-background-gradient min-h-screen p-5 text-black" >
        <div className="shadow-custom-backend rounded">
        <div className=" bg-white p-6 ">
                    <div className="flex flex-col lg:flex-row gap-5 justify-between items-center">
                        <h1 className="font-normal text-2xl">Transaction Entry</h1>
                     <div className="flex gap-5">
                     <Link to="/dashboard/TransectionList" className="border-2 font-base  rounded-lg bg:button-orange-backend hover:border-[#007BFF] duration-500 transition-all hover:bg-[#007BFF] text-white  px-5 py-2 lg:text-xl">Transection List</Link>
                        <Link to="/dashboard/transection/categoryList" className="border-2 font-base  rounded-lg bg:button-orange-backend hover:border-[#007BFF] duration-500 transition-all hover:bg-[#007BFF] text-white  px-5 py-2 lg:text-xl">Transection Category</Link>
                     </div>
                    </div>
                    
                    </div>
                    <hr className="border w-full mx-auto " />
                    <form onSubmit={handleSubmit} className="bg-white p-6">
                      <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5 items-center justify-between">

                      <div className=" w-full mt-2">
              <label
                className="text-[16px] font-medium text-black w-full"
              >
             Category
              </label>
              
                        <div className="flex flex-col sm:flex-row gap-8 items-center  ">
                  
           <select id="dropdown2" name="category" onChange={(e) => handleCategoryChange(e.target.value)} className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E]" >
           <option value="Monthly Fee">Monthly Fee</option>
           <option value="Admission Fee">Admission Fee</option>
           <option value="Model test">Model test</option>

           {/* {categories?.map((category ) => <><option className="text-black hover:bg-blue-600" key={category?._id} value={category?.category}>{category?.category}</option></>)} */}
                   
                  
                  
  </select>
        
                 </div>
            </div>
            <div className="mt-2">
                 <label
                className="text-[16px] font-medium text-black w-full "
              >
             Class
              </label>
                        <div className="flex flex-col sm:flex-row gap-8 items-center ">
                  
           <select id="dropdown" name="studentClass" onChange={(e) => handleClassBatches(e.target.value)}  className="block border-[1px]  p-1  lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] font-medium outline-none  " required>
        
           <option value="সপ্তম">সপ্তম</option>
                   <option value="অষ্টম">অষ্টম</option>
                   <option value="নবম">নবম</option>
                   <option value="দশম">দশম</option>
                   <option value="একাদশ - দ্বাদশ">একাদশ - দ্বাদশ</option>
  </select>
           </div>
                 </div>
           {
             <>
            
            <div className=" w-full mt-2">
              <label
                className="text-[16px] font-medium text-black w-full"
              >
             Batch
              </label>
              
                        <div className="flex flex-col sm:flex-row gap-8 items-center  ">
                  
           <select id="dropdown1" name="batch" onChange={(e) => handleBatchChange(e.target.value)} className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E]" >
           <option className="text-black hover:bg-blue-600"  value="...">...</option>
           {classBatches?.map((category ) => <>
           <option className="text-black hover:bg-blue-600" key={category?._id} value={category?.batchTitle}>{category?.batchTitle}</option>
           </>)}
                   
                  
                  
  </select>
        
                 </div>
            </div>
<div className=" w-full mt-2">
  <label
            className="text-[16px] font-medium text-black w-full"
          >
         Addmission
          </label>
    <ReactSelect
        options={studentOptions}
        onChange={handleStudentChange}
        styles={selectCustomStyles}
        value={studentSelectedOption} // Set the value of the selected option
      />
  </div>
{
  monthlyFee === "Monthly Fee" && <>
  
 <div className=" w-full mt-2">
  <label
            className="text-[16px] font-medium text-black w-full"
          >
       Due  Months
          </label>
    <ReactSelect
        options={duesMonthOptions}
        onChange={handleDuesMonthChange}
        styles={selectCustomStyles}
        value={duesMonthSelectedOption}
        isMulti // Set the value of the selected option
      />
  </div>
 <div className=" w-full mt-2">
  <label
            className="text-[16px] font-medium text-black w-full"
          >
       Monthly Exam Fee
          </label>
    <ReactSelect
        options={duesMonthlyFeeOptions}
        onChange={handleDuesMonthlyFeeChange}
        styles={selectCustomStyles}
        value={duesMonthlyFeeSelectedOption}
        isMulti // Set the value of the selected option
      />
  </div>
</>
}
  
  </>
           }
      <div className=" w-full mt-2">
              <label
                className="text-[16px] font-medium text-black w-full"
              >
            Payment Date
              </label>
              <input
                type="date"
                name="date"
                required
                className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E]"
              />
            </div>
 

            <div className="mt-8">
                 <label
                className="text-[16px] font-medium text-black w-full "
              >
              Transection Mode
              </label>
                        <div className="flex flex-col sm:flex-row gap-8 items-center  mb-8">
                  
           <select id="dropdown" name="transectionMode"  className="block border-[1px]  p-1  lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] font-medium outline-none  " required>
        
           <option value="Cash">Cash</option>
                   <option value="Bkash">Bkash</option>
                   <option value="Nagad">Nagad</option>
                   <option value="Rocket">Rocket</option>
                   <option value="Bank">Bank</option>
  </select>
           </div>
                 </div>
        
                
        
                 <div className=" w-full my-2">
              <label
                className="text-[16px] font-medium text-black w-full "
              >
             Cash Received 
              </label>
              <input
                type="number"
                name="cashReceived"
                required
                className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E]"
              />
            </div>
                       
            <div className=" w-full my-2">
              <label
                className="text-[16px] font-medium text-black w-full"
              >
              Description
              </label>
              <input
                type="text"
                name="description"
     
                className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E]"
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
                        


<div>
{
  studentSelectedOption && <div className=" w-full my-2">
  <ul>
    <li>Total Due : {totalDue}</li>
    <li>Mothly Fee Due : {monthDue}</li>
    <li>Monthly Exam Fee Due : {monthFeeDue}</li>
    <li>Model test Due : 0</li>

   
  </ul>
  </div>
}
</div>
              
        

            <hr className="border w-full mx-auto " />
            <div className="flex gap-5 items-center my-5">
            <button 
  type="submit" 
  className={`rounded px-5 py-2 hover:border-[#007BFF] duration-500 transition-all hover:bg-[#007BFF] border-2 flex gap-2  bg-button-gradient-backend text-white items-center btn  w-fit  my-5 ${loadingButton ? 'opacity-50 cursor-not-allowed bg-[#1486DB] disabled:[#1486DB]' : 'bg-[#1486DB] disabled:[#1486DB]'}`} 
  disabled={loadingButton}
>
  {loadingButton ? "Save..." : "Save"} <FaRegSave />
</button>
            <button className=" rounded bg-[#6C757D] hover:bg-slate-600 duration-500 transition-all text-white px-5 py-2 ">Reset</button>
        </div>
                        </form>
        </div>
                        <Toaster />
            </div>
    );
};

export default TransectionEntry;