import axios from 'axios';
import  { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import useAxiosPublic from '../../../../Hock/useAxiosPublic';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClassBatches, fetchDuesAlert } from '../../../../Redux/Features/Batch/BatchSlice/BatchSlice';
import { useReactToPrint } from 'react-to-print';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchAdmissions } from '../../../../Redux/Features/Admissions/AdmissionsSlice/AdmissionsSlice';


const DuesAlert = () => {
  const contentRef = useRef(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [smsSendCount , setSmsSendCount] = useState(0)
  const [selectAll, setSelectAll] = useState(false);
  const [smsLoading ,setSmsLoading] = useState(false)
  const [batch,setBatch] = useState()
  const [studentClass,setStudentClass] = useState("সপ্তম")
  const axiosInstance = useAxiosPublic()
  const dispatch = useDispatch()
  const {classBatches,duesAlert} = useSelector((state) => state.batches)
  console.log(duesAlert);
  console.log(classBatches);
 const handleClassBatches = (studentClass) => {
    console.log(studentClass);
    setSelectAll(false)
    dispatch(fetchClassBatches({data: {searchTerm : studentClass}, axiosInstance : axiosInstance}))
 }
 useEffect(() => {
  dispatch(fetchClassBatches({data: {searchTerm : ""}, axiosInstance : axiosInstance}))
 },[dispatch,axiosInstance])
 const handleSearchDuesReport = (e) => {
e.preventDefault();
const form = e.target ;
const studentClass = form.studentClass.value;
const batch = form.batch.value ;
console.log(batch);
dispatch(fetchDuesAlert({data: {batch : batch ,studentClass :studentClass}, axiosInstance : axiosInstance}))
 }
 const reactToPrintFn = useReactToPrint({contentRef , documentTitle: `dues report ${studentClass} ${batch}.pdf`});
   // Handle individual row selection
   const handleRowSelect = (data) => {
    if (selectedRows.some((row) => row.registrationNo === data.registrationNo)) {
      setSelectedRows(selectedRows.filter((row) => row.registrationNo !== data.registrationNo));
    } else {
      setSelectedRows([...selectedRows, data]);
    }
  };
   const refetchAdmissions = () => {
        dispatch(fetchAdmissions({data : {searchTerm :""} , axiosInstance :axiosInstance })); // Trigger refetch by dispatching fetchCourses
      };
    const handleDelete = (id) => {
      const result = Swal.fire({
       title: "Do you want to delete the changes?",
       showCancelButton: true,
       confirmButtonText: "Delete",
       customClass: {
        confirmButton: 'custom-confirm-btn',
        cancelButton: 'custom-cancel-btn'
      },
     }).then((result) => {
       /* Read more about isConfirmed, isDenied below */
       if (result.isConfirmed) {
        axiosInstance.delete(`/admissions-delete/${id}`)
        .then(res => {
            
            refetchAdmissions();
        })
       } 
     });
      
    }
  // Handle Select All checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]); // Uncheck all
    } else {
      setSelectedRows(duesAlert); // Select all
    }
    setSelectAll(!selectAll);
  };
const handleStudentClass = (value) =>{
setStudentClass(value)
setBatch("")
}
const handleSendSms = () => {

        const result = Swal.fire({
         title: "Do you want to send message?",
         showCancelButton: true,
         confirmButtonText: "Send",
         customClass: {
          confirmButton: 'custom-confirm-btn',
          cancelButton: 'custom-cancel-btn'
        },
       }).then((result) => {
         /* Read more about isConfirmed, isDenied below */
         if (result.isConfirmed) {
          setSmsLoading(true)
          for(let i = 0 ; selectedRows.length - 1 >= i ; i++){
            if(selectedRows[0]?.mobile){
              sendSMS(selectedRows[i]?.mobile, selectedRows[i]?.studentNickname,selectedRows[i]?.batch,selectedRows[i]?.registrationNo,selectedRows[i]?.duesMonth)
            }
            sendSMS(selectedRows[i]?.guardiansMobile, selectedRows[i]?.studentNickname,selectedRows[i]?.batch,selectedRows[i]?.registrationNo,selectedRows[i]?.duesMonth ,selectedRows[i])
            toast.success("send message successfully!")
          }
        setTimeout(() => {
          setSmsLoading(false)
        },3000)
         } 
       });
        
      

}
const formatMonth = (month) => {
  const [name, year] = month.split(' ');
  return `${name.toLowerCase().slice(0, 3)}/${year.slice(2)}`;
};

const sendSMS = async (mobile, nickname, batch, registrationNo, duesMonth, allData) => {
  const totalTaka = allData?.duesMonth?.reduce((prev, cur) => prev + Number(cur.fee), 0) + allData?.duesBatchMonthlyFee?.reduce((prev, cur) => prev + Number(cur.fee), 0);
  
  // Format the duesMonth and duesBatchMonthlyFee arrays
  const duesMonthText = duesMonth?.reduce((prev, cur) => prev + Number(cur.fee), 0) > 0 
    ? `${duesMonth?.map(item => formatMonth(item?.month)).join(', ')} মাসের বেতন`
    : '';
  
  const duesBatchText = allData?.duesBatchMonthlyFee?.reduce((prev, cur) => prev + Number(cur.fee), 0) > 0 
    ? `এবং ${allData?.duesBatchMonthlyFee?.map(item => formatMonth(item?.month)).join(', ')} মাসের পরীক্ষার ফি বকেয়া রয়েছে`
    : '';

  try {
    const greenwebsms = new URLSearchParams();
    greenwebsms.append('token', '1196418472917392780491ebff42bd422c43a2fa2cc3d55be3c15');
    greenwebsms.append('to', mobile);
    greenwebsms.append('message', `প্রিয় ${nickname},
আপনার ${duesMonthText} ${duesBatchText}, যা মোট ${totalTaka} টাকা। অনুগ্রহ করে দ্রুত ফি পরিশোধ করে শিক্ষাগত কার্যক্রমে অব্যাহত সহায়তা করুন।

ধন্যবাদান্তে,

ইনফিনিটি ম্যাথ সেন্টার`);

    const res = await axios.post('https://api.bdbulksms.net/api.php', greenwebsms);
    console.log(res);

    if (res?.status === 200) {
      setSmsSendCount(smsSendCount + 1);
      await axiosInstance.post('/sms', {
        createdAt: new Date(),
        mobile,
        nickname,
        message: `প্রিয় ${nickname},
আপনার ${duesMonthText} ${duesBatchText}, যা মোট ${totalTaka} টাকা। অনুগ্রহ করে দ্রুত ফি পরিশোধ করে শিক্ষাগত কার্যক্রমে অব্যাহত সহায়তা করুন।

ধন্যবাদান্তে,

ইনফিনিটি ম্যাথ সেন্টার`,
        messageType: 'Due',
        batch: batch,
        registrationNo: registrationNo
      });
    }
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
};

    return (
        <div className='bg-white'>
        <div className="bg-background-gradient p-5 text-black" >
        <div className=" bg-white p-6 shadow-custom-backend rounded-lg">
                <div className="flex justify-between gap-2 items-center">
                    <h1 className="font-bold lg:text-3xl ">Dues Alert</h1>

                </div>
                <hr className="border w-full mx-auto my-5" />
                <form onSubmit={handleSearchDuesReport} className=" p-6">
                    <div className="grid  md:grid-cols-2 grid-cols-1 gap-2">
                    


 
     
                    <div className="mt-2">
                 <label
                className="text-[16px] font-medium text-black w-full "
              >
             Class
              </label>
                        <div className="flex flex-col sm:flex-row gap-8 items-center  mb-8">
                  
           <select id="dropdown" name="studentClass" onChange={(e) => {
            handleClassBatches(e.target.value)
             handleStudentClass(e.target.value)
             }}  className="block border-[1px]  p-1  lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] font-medium outline-none  " defaultValue={"সপ্তম"} required>
        
           <option value="সপ্তম" selected>সপ্তম</option>
                   <option value="অষ্টম">অষ্টম</option>
                   <option value="নবম">নবম</option>
                   <option value="দশম">দশম</option>
                   <option value="একাদশ - দ্বাদশ">একাদশ - দ্বাদশ</option>
  </select>
           </div>
                 </div>
         
              
   
    
               
            

                 <div className="mt-2">
                 <label
                className="text-[16px] font-medium text-black w-full "
              >
         Batch No
              </label>
                        <div className="flex flex-col sm:flex-row gap-8 items-center ">
                     <input list="batch"  name="batch" onChange={(e) => {
            
             setBatch(e.target.value)
             }}  placeholder="Type the batch name" className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" />     
           <datalist id="batch"  > 
           <option  value="false" selected>Not Selected</option>
              {
       
       classBatches?.map(batch =>
                <option key={batch?._id} value={batch?.batchTitle}>{batch?.batchTitle}</option>
                )
              }
       

  </datalist>

           </div>
                 </div>
                    </div>
                    <div>

                    </div>
     

        <hr className="border w-full mx-auto my-5" />

        <div className="flex gap-5 items-center">
        <button 
  type="submit" 
  className={`rounded px-5 py-2 hover:border-[#007BFF] duration-500 transition-all hover:bg-[#007BFF] border-2 flex gap-2  bg-button-gradient-backend text-white items-center btn  w-fit  my-5`} 

>
Search
</button>
{
                    duesAlert?.length > 0 &&        <button 
                   onClick={reactToPrintFn}
                    className={`rounded px-5 py-2 hover:border-[#007BFF] duration-500 transition-all hover:bg-[#007BFF] border-2 flex gap-2  bg-blue-700  text-white items-center btn  w-fit  my-5`} 
                  
                  >
                  Print
                  </button> }
{
                    duesAlert?.length > 0 &&        <button 
                  onClick={ () => handleSendSms()}  
                    className={`rounded px-5 py-2 hover:border-[#007BFF] duration-500 transition-all hover:bg-[#007BFF] border-2 flex gap-2  bg-blue-700  text-white items-center btn  w-fit  my-5`} 
                  disabled={smsLoading}
                  >
                  {smsLoading ? "Loading..." : "Send SMS"}
                  </button> }
        </div>
                    </form>
                </div>
              <div className='mt-10'>
                {
                    duesAlert?.length > 0 &&    <div className="overflow-x-auto lg:px-10">
                                    <table className="table table-xs ">
                                        <thead className=" lg:text-xl bg-button-gradient-backend text-white">
                                            <tr >
                                            <th>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />{" "}
                  Select All
                </th>
                                                <th>Reg No.</th>
                                                <th>Id No.</th>
                                                <th>Name</th>
                                                <th>Batch</th>
                                                <th>Mobile</th>
                                                <th>Guardian&rsquo;s Mobile</th>
                                                <th>Total Monthly Fee</th>
                                                <th>Total Exam Fee</th>
                                                <th>Total Due</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        { duesAlert?.map((data, index) => <>
                                              {data?.duesMonth?.reduce((prev,cur) => prev + Number(cur.fee) ,0) +  
                                              data?.duesBatchMonthlyFee?.reduce((prev,cur) => prev + cur.fee ,0) > 0 &&  <tr className="text-black  bg-white shadow-custom-backend rounded-lg my-10" key={index}>
                                                   <td className="lg:text-xl py-5 text-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.some((row) => row.registrationNo === data.registrationNo)}
                      onChange={() => handleRowSelect(data)}
                    />
                  </td>
                                                    <td className="lg:text-xl py-5">{data.registrationNo}</td>
                                                    <td className="lg:text-xl py-5">{data.rollNo}</td>
                     <td className="lg:text-xl py-5 ">{data?.name}</td>
                     <td className="lg:text-xl py-5 ">{data?.batch}</td>
                     <td className="lg:text-xl py-5 text-center">{data?.mobile}</td>
                     <td className="lg:text-xl py-5 text-center">{data?.guardiansMobile}</td>
                     <td className="lg:text-xl py-5 text-center">{data?.duesMonth?.reduce((prev,cur) => prev + Number(cur.fee) ,0)}</td>
                     <td className="lg:text-xl py-5 text-center">{data?.duesBatchMonthlyFee?.reduce((prev,cur) => prev + Number(cur.fee) ,0)}</td>
                     <td className="lg:text-xl py-5 text-center">{data?.duesMonth?.reduce((prev,cur) => prev + Number(cur.fee) ,0) +  data?.duesBatchMonthlyFee?.reduce((prev,cur) => prev + cur.fee ,0)}</td>
                     <td className="lg:text-xl py-5  dropdown dropdown-end ">
                                                
                                                <div tabIndex={0} role="button" className="btn m-1">Option</div>
                                                <ul tabIndex={0} className="dropdown-content  right-10 z-[10] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                  {/* <li><Link to={`/dashboard/student-profile-details/${data?.registrationNo}`}>Profile</Link></li> */}
                                                  {/* <li><Link to={`/id-card/${data?._id}`}>ID Card</Link></li> */}
                         
                                               
                                                  <li><Link to={`/dashboard/student-payment-history/${data?.email}`}>Payment Hisroty</Link></li>
                                                  <li><Link to={`/dashboard/fees-entry?_id=${data?._id}`}>Payment</Link></li>
                                                  <li>
                                                      {/* Open the modal using document.getElementById('ID').showModal() method */}
                                              {/* <button  onClick={()=> handleCourseCompleted(data?._id)}>Course Completed</button> */}
                                              </li>
                                                  <li><Link to={`/dashboard/admission-edit/${data._id}`}>Update Information</Link></li>
                                                  <li><a onClick={() => handleDelete(data?._id)}>Remove Student</a></li>
                                                </ul>
                                              
                                                                            </td>       
                                                </tr>}
                                            
                                            </>)}
                                            
                                        
                                        </tbody>
                                    </table>
                                </div>
                }
              </div>
                    <Toaster />
        </div>
       <div className='hidden bg-white '>
       <div className='   font-poppins text-black px-2 bg-white py-5 '
 ref={contentRef}
         style={{
           width: "216mm",
           height:"295mm"
         }}>

                    <div className=' text-center mb-5'>
                    <h1 className='text-xl font-semibold'>Infinity Math Center</h1>
                    <h1 className='text-lg'>Dues Report</h1>
                    <h1 className='text-lg'>Class: {studentClass} {batch !== "false" && <span>, Batch: {batch}</span>}</h1>
                    
                    </div>
                {
                      <div className="overflow-x-auto lg:px-10 bg-white">
                                    <table className="table table-xs ">
                                        <thead className=" lg:text-xl bg-slate-300 text-white">
                                            <tr >
                                          
                                                <th>Reg</th>
                                                <th>Name</th>
                                                <th>Batch</th>
                                                <th>Mobile</th>
                                                <th>Guardian&rsquo;s Mobile</th>
                                                <th>Monthly Fee</th>
                                                <th>Exam Fee</th>
                                                <th>Due</th>
                                               <th>Total Due</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {duesAlert?.map((data, index) => <>
                                              {data?.duesMonth?.reduce((prev,cur) => prev + Number(cur.fee) ,0) +  data?.duesBatchMonthlyFee?.reduce((prev,cur) => prev + cur.fee ,0) > 0 &&  <tr className="text-black  bg-white shadow-custom-backend rounded-lg my-10" key={index}>
                                       
                                                    <td className="lg:text-xl py-5">{data.registrationNo}</td>
                                                    <td className="lg:text-xl py-5">{data.rollNo}</td>
                     <td className="lg:text-xl py-5 ">{data?.name}</td>
                     <td className="lg:text-xl py-5 ">{data?.batch}</td>
                     <td className="lg:text-xl py-5 text-center">{data?.mobile}</td>
                     <td className="lg:text-xl py-5 text-center">{data?.guardiansMobile}</td>
                     <td className="lg:text-xl py-5 text-center">{data?.duesMonth?.reduce((prev,cur) => prev + Number(cur.fee) ,0)}</td>
                     <td className="lg:text-xl py-5 text-center">{data?.duesBatchMonthlyFee?.reduce((prev,cur) => prev + Number(cur.fee) ,0)}</td>
                     <td className="lg:text-xl py-5 text-center">{data?.duesMonth?.reduce((prev,cur) => prev + Number(cur.fee) ,0) +  data?.duesBatchMonthlyFee?.reduce((prev,cur) => prev + cur.fee ,0)}</td>
                       
                                                </tr>}
                                            
                                            </>)}
                                        </tbody>
                                    </table>
                                </div>
                }
              </div>
        
        </div></div>
    );
};

export default DuesAlert;