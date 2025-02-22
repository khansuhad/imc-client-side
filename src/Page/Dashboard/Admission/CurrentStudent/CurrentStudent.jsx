
import {  FaPlusCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPublic from "../../../../Hock/useAxiosPublic";
import { fetchAdmissions } from "../../../../Redux/Features/Admissions/AdmissionsSlice/AdmissionsSlice";



const CurrentStudent = () => {
  const navigate = useNavigate();
  const updateProfileSuccessToast = () =>
    toast.success("updated successfully");
  const deleteProfileSuccessToast = () =>
    toast.success("deleted successfully");
  const updateProfileErrorToast = () => toast.error("Profile can't update");
    const useAxios = useAxiosPublic();
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
    const { currentStudents, status } = useSelector((state) => state.admissions);
    useEffect(() => {
      dispatch(fetchAdmissions({data : {searchTerm :searchTerm} , axiosInstance :useAxios })); // Fetch students whenever the searchTerm changes
    }, [dispatch, searchTerm,useAxios]);
    const refetchAdmissions = () => {
      dispatch(fetchAdmissions({data : {searchTerm :searchTerm} , axiosInstance :useAxios })); // Trigger refetch by dispatching fetchCourses
    };
    const [attendanceRecord,setAttendanceRecord] = useState([])
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
        useAxios.delete(`/admissions-delete/${id}`)
        .then(res => {
            
            deleteProfileSuccessToast();
            refetchAdmissions();
        })
       } 
     });
      
    }
  const handleSearchAttendance = (studentId) => {
    setAttendanceRecord([])
    useAxios.get(`/student-attendance-history?studentId=${studentId}`)
    .then(res => {
setAttendanceRecord(res?.data)
    })
  }

   const handleCourseCompleted = (id) => {
    useAxios.patch(`/course-completed-update/${id}`)
    .then(res => {
            toast.success('successfully added in course completed')
            refetchAdmissions();
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
       <div className="flex lg:flex-row flex-col items-center   justify-between lg:px-10 text-black font-semibold p-5 lg:my-10">
            <div>
                <h3 className="font-bold lg:text-3xl mb-2">Current Students</h3>
            </div>

            <div className="flex flex-col lg:flex-row gap-5 items-center">
            <div className="">
            <label className="  ">
                <input type="text" className="grow input  input-bordered " placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} />
               
            </label>
        </div>
                <Link to="/dashboard/admission" className="btn bg-button-gradient-backend text-white"><FaPlusCircle></FaPlusCircle>New Addmission</Link>
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
                    {currentStudents.map((data, index) => (
                        <tr className="text-black  bg-white shadow-custom-backend rounded-lg my-10 " key={index}>
                            <td className="lg:text-xl py-5">{data?.registrationNo}</td>
                            <td className="lg:text-xl py-5">{data?.rollNo}</td>
                            <td className="lg:text-xl py-5">{moment(data.enrollDate).format("DD MMM YYYY")}</td>
                            <td className="lg:text-xl py-5">{data.name}</td>
                            <td className="lg:text-xl py-5">{data.batch}</td>
                            <td className="lg:text-xl py-5">{data.mobile}</td>
                            <td className="lg:text-xl py-5">{data.guardiansMobile}</td>
                            <td className="lg:text-xl py-5  dropdown dropdown-end ">
                           
  <div tabIndex={0} role="button" className="btn m-1">Option</div>
  <ul tabIndex={0} className="dropdown-content  right-10 z-[10] menu p-2 shadow bg-base-100 rounded-box w-52">
    {/* <li><Link to={`/dashboard/student-profile-details/${data?.registrationNo}`}>Profile</Link></li> */}
    {/* <li><Link to={`/id-card/${data?._id}`}>ID Card</Link></li> */}
    <li><a onClick={() => {
        handleSearchAttendance(data?.registrationNo)
        document.getElementById('attendance-backend').showModal()
    }}>Attendance Record</a></li>
 
    <li><Link to={`/dashboard/student-payment-history/${data?.email}`}>Payment Hisroty</Link></li>
    <li><Link to={`/dashboard/feesReceive?_id=${data?._id}`}>Payment</Link></li>
    <li>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
{/* <button  onClick={()=> handleCourseCompleted(data?._id)}>Course Completed</button> */}
</li>
    <li><Link to={`/dashboard/admission-edit/${data._id}`}>Update Information</Link></li>
    <li><a onClick={() => handleDelete(data?._id)}>Remove Student</a></li>
  </ul>

                              </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
       </div>
    
        <Toaster />
      
    </div>
    );
};

export default CurrentStudent;