"use client"
import { use } from "react";
import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchBatchDetails, fetchBatchesStudents } from "../../../../../../redux/features/batch/batchSlice/batchSlice";
import useAxiosPublic from "../../../../../../hooks/useAxiosPublic";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



const BatchInfo = ({params}) => {
   
  const unwrappedParams = use(params); // Unwrapping the Promise
  const id = unwrappedParams.id;

    const {batchesStudents,batchDetails} = useSelector((state) => state.batches)
const dispatch = useDispatch()
const useAXios = useAxiosPublic()
      const [attendanceRecord,setAttendanceRecord] = useState([])
    useEffect( () => {
  dispatch(fetchBatchesStudents({data: {searchTerm : id}, axiosInstance : useAXios}))
  dispatch(fetchBatchDetails({data: {searchTerm : id}, axiosInstance : useAXios}))
    }, [dispatch,id,useAXios])
    const handleSearchAttendance = (studentId) => {
        setAttendanceRecord([])
        useAXios.get(`/student-attendance-history?studentId=${studentId}`)
        .then(res => {
    setAttendanceRecord(res?.data)
        })
      }
   
    return (
        <div className="bg-background-gradient p-5 min-h-screen">
       
          <dialog id="attendance-backend" className="modal  ">
                       <div className="modal-box w-screen bg-white">
                         <form method="dialog">
                           {/* Close button */}
                           <button className="btn btn-sm btn-circle border-[2px] border-red-600 text-red-600 absolute right-2 top-2">✕</button>
                         </form>
         
                         <div className="flex flex-col text-left space-y-1  w-full h-full p-5 text-black">
                         <h1>Registration Number : <span className="font-medium text-lg">{attendanceRecord?.studentId}</span></h1>
                         <h1>  Total Present : <span className="font-medium text-lg">{attendanceRecord?.totalPresent > 0 ? attendanceRecord?.totalPresent : 0 } days</span></h1>
                         <h1> Total Absent : <span className="font-medium text-lg">{attendanceRecord?.totalAbsent > 0 ? attendanceRecord?.totalAbsent : 0 } days</span></h1>
                         <div>
                             <h1>Attendance Record :</h1>
                           <div className="flex gap-3 flex-wrap mt-1">
                           {
                                 attendanceRecord?.attendanceRecord?.map(attendance => <h1 key={attendance?.date} className={`${attendance?.attendance === "present" ?  "bg-green-600 px-3 py-1 text-white w-fit rounded-3xl" : "bg-red-600 px-3 py-1 text-white w-fit rounded-3xl"}`}>{moment(attendance?.date).format('DD MMM YYYY')}</h1>)
                             }
                           </div>
                         </div>
                         </div>
         
                       </div>
                     </dialog>
          <div className="bg-white p-5  space-y-10">
          <div className="lg:px-10 text-black  bg-slate-100 p-5 my-10 flex flex-col lg:flex-row gap-10 justify-between items-center">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 font-normal">
              <div>
              <h1>Batch Name : {batchDetails?.batchTitle}</h1>
              <h1>Status : {batchDetails?.status} টা</h1>
              </div>
              <div>
              <h1>Monthly Fee : {batchDetails?.batchMonthlyFee}</h1>
              <h1>Model Test Fee : {batchDetails?.batchModelTestFee} টা</h1>
              </div>
               <div>
               <h1>Class  : {batchDetails?.studentClass}</h1>
               <h1>Start Date : {batchDetails?.startDate} টা</h1>
               </div>
               </div>
              
            </div>
          
          <div className=" md:overflow-visible overflow-x-auto lg:px-10">
                    <table className="table table-xs  ">
                        <thead className=" lg:text-2xl bg-button-gradient-backend text-white">
                            <tr>
                                <th>Registration No.</th>
                                <th>Id No.</th>
                                <th>Date</th>
                                <th>Student Name</th>
                                <th>Batch</th>
                                <th>Mobile</th>
                                <th>Guardian&rsquo;s Mobile</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody >
                            {batchesStudents.map((data, index) => (
                                <tr className="text-black  bg-white shadow-custom-backend rounded-lg my-10 " key={index}>
                                    <td className="lg:text-xl py-5">{data?.registrationNo}</td>
                                    <td className="lg:text-xl py-5">{data?.rollNo}</td>
                                    <td className="lg:text-xl py-5">{moment(data.enrollDate).format("DD MMM YYYY")}</td>
                                    <td className="lg:text-xl py-5">{data.name}</td>
                                    <td className="lg:text-xl py-5">{data.batch}</td>
                                    <td className="lg:text-xl py-5">{data.mobile}</td>
                                    <td className="lg:text-xl py-5">{data.guardiansMobile}</td>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
          </div>
          
       
        </div>
    );
};

export default BatchInfo;