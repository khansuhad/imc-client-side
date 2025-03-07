"use client"
import axios from 'axios';
import  { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import { useDispatch, useSelector } from 'react-redux';
import { fetchClassBatches, fetchDuesAlert } from '../../../../../redux/features/batch/batchSlice/batchSlice';
import { useReactToPrint } from 'react-to-print';

import Swal from 'sweetalert2';
import { fetchAdmissions } from '../../../../../redux/features/admissions/admissionSlice/admissionSlice';
import useAxiosPublic from '../../../../../hooks/useAxiosPublic';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import SingleSelect from '../../../../components/ReuseableInputs/SingleSelectOption';


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
 const { register, handleSubmit, reset,control } = useForm();
 const handleClassBatches = (studentClass) => {
    console.log(studentClass);
    setSelectAll(false)
    dispatch(fetchClassBatches({data: {searchTerm : studentClass}, axiosInstance : axiosInstance}))
 }
 useEffect(() => {
  dispatch(fetchClassBatches({data: {searchTerm : ""}, axiosInstance : axiosInstance}))
 },[dispatch,axiosInstance])
 const handleSearchDuesReport = (data) => {
  setSelectedRows([]);
  const { studentClass, batch } = data;
  dispatch(fetchDuesAlert({ data: { batch, studentClass }, axiosInstance }));
};
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
      const filteredRows = duesAlert?.filter((data) => 
        data?.duesMonth?.reduce((prev, cur) => prev + Number(cur.fee), 0) +  
        data?.duesBatchMonthlyFee?.reduce((prev, cur) => prev + cur.fee, 0) > 0
      );
      setSelectedRows(filteredRows); // Select all
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
          console.log(selectedRows.length);
          for(let i = 0 ; selectedRows.length - 1 >= i ; i++){
            if(selectedRows[i]?.mobile){
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
    ? `${duesMonth?.length} মাসের বেতন`
    : '';
  
  const duesBatchText = allData?.duesBatchMonthlyFee?.reduce((prev, cur) => prev + Number(cur.fee), 0) > 0 
    ? `এবং ${allData?.duesBatchMonthlyFee?.length} মাসের Exam ফি বকেয়া রয়েছে`
    : '';

  try {
    const greenwebsms = new URLSearchParams();
    greenwebsms.append('token', '1196418472917392780491ebff42bd422c43a2fa2cc3d55be3c15');
    greenwebsms.append('to', mobile);
    greenwebsms.append('message', `প্রিয় ${nickname}, আপনার ${duesMonthText} ${duesBatchText}, যা মোট ${totalTaka} টাকা। অনুগ্রহ করে দ্রুত ফি পরিশোধ করে শিক্ষাগত কার্যক্রমে অব্যাহত সহায়তা করুন।
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
        message: `প্রিয় ${nickname}, আপনার ${duesMonthText} ${duesBatchText}, যা মোট ${totalTaka} টাকা। অনুগ্রহ করে দ্রুত ফি পরিশোধ করে শিক্ষাগত কার্যক্রমে অব্যাহত সহায়তা করুন।
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
                <form onSubmit={handleSubmit(handleSearchDuesReport)} className="p-6">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            <SingleSelect
              control={control}
              name="studentClass"
              label="Class"
              onChange={(e) => {
                handleClassBatches(e.target.value);
                handleStudentClass(e.target.value);
              }}
              defaultValue="সপ্তম"
              options={[
                { value: "সপ্তম", label: "সপ্তম" },
                { value: "অষ্টম", label: "অষ্টম" },
                { value: "নবম", label: "নবম" },
                { value: "দশম", label: "দশম" },
                { value: "একাদশ - দ্বাদশ", label: "একাদশ - দ্বাদশ" },
              ]}
              rules={{ required: "Class is required" }}
            />
             <SingleSelect
              control={control}
              name="batch"
              label="Batch"

              defaultValue="false"
              options={[
                { value: "false", label: "False" },  // Adding the "False" option explicitly
                ...classBatches.map((batch) => ({
                  value: batch.batchTitle,
                  label: batch.batchTitle,
                }))
              ]}

            />
            </div>
            <button type="submit" className="rounded px-5 py-2 bg-blue-700 text-white items-center btn w-fit my-5">
              Search
            </button>
          </form>
                </div>
              <div className='mt-10'>
                {
                    duesAlert?.length > 0 &&    <div className="overflow-x-auto lg:px-10">
                                    <table className="table table-xs w-full table-auto ">
                                        <thead className=" lg:text-xl slider-background text-white">
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
                                                <th>Total Monthly Fee</th>
                                                <th>Total Exam Fee</th>
                                                <th>Total Due</th>
                                                <th>Mobile</th>
                                                <th>Guardian&rsquo;s Mobile</th>
                                                <th>Batch</th>                 
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        { duesAlert?.map((data, index) => <>
                                              {data?.duesMonth?.reduce((prev,cur) => prev + Number(cur.fee) ,0) +  
                                              data?.duesBatchMonthlyFee?.reduce((prev,cur) => prev + cur.fee ,0) > 0 &&  <tr className="text-black  bg-white shadow-custom-backend rounded-lg my-10" key={index}>
                                                   <td className="lg:text-xl p-5 text-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.some((row) => row.registrationNo === data.registrationNo)}
                      onChange={() => handleRowSelect(data)}
                    />
                  </td>
                                                    <td className="lg:text-xl text-center p-5">{data.registrationNo}</td>
                                                    <td className="lg:text-xl text-center p-5">{data.rollNo}</td>
                     <td className="lg:text-xl p-5 text-center">{data?.name}</td>
                     <td className="lg:text-xl p-5 text-center">{data?.duesMonth?.reduce((prev,cur) => prev + Number(cur.fee) ,0)}</td>
                     <td className="lg:text-xl p-5 text-center">{data?.duesBatchMonthlyFee?.reduce((prev,cur) => prev + Number(cur.fee) ,0)}</td>
                     <td className="lg:text-xl p-5 text-center">{data?.duesMonth?.reduce((prev,cur) => prev + Number(cur.fee) ,0) +  data?.duesBatchMonthlyFee?.reduce((prev,cur) => prev + cur.fee ,0)}</td>
                     <td className="lg:text-xl p-5 text-center">{data?.mobile}</td>
                     <td className="lg:text-xl p-5 text-center">{data?.guardiansMobile}</td>
                     <td className="lg:text-xl p-5 text-center">{data?.batch}</td>

                                                                            <td className="lg:text-xl p-5  dropdown dropdown-end ">
                                                                              
                                                                            <DropdownMenu>
  <DropdownMenuTrigger className="bg-slate-400 text-white  px-3 py-1 rounded-lg active:bg-slate-700">Options</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Options</DropdownMenuLabel>
    <DropdownMenuSeparator />
         {/* <li><Link href={`/dashboard/student-profile-details/${data?.registrationNo}`}>Profile</Link></li> */}
                                                  {/* <li><Link href={`/id-card/${data?._id}`}>ID Card</Link></li> */}
                         
                                               
                                                 
                                                

                                                 
                                               
    <DropdownMenuItem> <li><Link href={`/dashboard/admin/student-payment-history/${data?._id}`}>Payment Hisroty</Link></li></DropdownMenuItem>
    <DropdownMenuItem> <li><Link href={`/dashboard/admin/fees-entry?_id=${data?._id}`}>Payment</Link></li></DropdownMenuItem>
    <DropdownMenuItem> <li><Link href={`/dashboard/admin/admission-edit/${data._id}`}>Update Information</Link></li></DropdownMenuItem>
    <DropdownMenuItem>   <li><a onClick={() => handleDelete(data?._id)}>Remove Student</a></li></DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>


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
       <div className='   font-poppins text-black px-2 bg-white p-5 '
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
                                    <table className="table table-xs w-full table-auto ">
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
                                       
                                                    <td className="lg:text-xl p-5">{data.registrationNo}</td>
                                                    <td className="lg:text-xl p-5">{data.rollNo}</td>
                     <td className="lg:text-xl p-5 ">{data?.name}</td>
                     <td className="lg:text-xl p-5 ">{data?.batch}</td>
                     <td className="lg:text-xl p-5 text-center">{data?.mobile}</td>
                     <td className="lg:text-xl p-5 text-center">{data?.guardiansMobile}</td>
                     <td className="lg:text-xl p-5 text-center">{data?.duesMonth?.reduce((prev,cur) => prev + Number(cur.fee) ,0)}</td>
                     <td className="lg:text-xl p-5 text-center">{data?.duesBatchMonthlyFee?.reduce((prev,cur) => prev + Number(cur.fee) ,0)}</td>
                     <td className="lg:text-xl p-5 text-center">{data?.duesMonth?.reduce((prev,cur) => prev + Number(cur.fee) ,0) +  data?.duesBatchMonthlyFee?.reduce((prev,cur) => prev + cur.fee ,0)}</td>
                       
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