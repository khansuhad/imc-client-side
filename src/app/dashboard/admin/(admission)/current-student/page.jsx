"use client";
import { useRef } from "react";
import { FaPlusCircle } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdmissions } from "../../../../../redux/features/admissions/admissionSlice/admissionSlice";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import Link from "next/link";
import { useReactToPrint } from "react-to-print";

const CurrentStudent = () => {
  const updateProfileSuccessToast = () => toast.success("Updated successfully");
  const deleteProfileSuccessToast = () => toast.success("Deleted successfully");
  const updateProfileErrorToast = () => toast.error("Profile can't update");
  const useAxios = useAxiosPublic();
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { currentStudents, status } = useSelector((state) => state.admissions);

  useEffect(() => {
    dispatch(fetchAdmissions({ data: { searchTerm }, axiosInstance: useAxios }));
  }, [dispatch, searchTerm, useAxios]);

  const refetchAdmissions = () => {
    dispatch(fetchAdmissions({ data: { searchTerm }, axiosInstance: useAxios }));
  };

  const [attendanceRecord, setAttendanceRecord] = useState([]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Do you want to delete the changes?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      customClass: {
        confirmButton: "custom-confirm-btn",
        cancelButton: "custom-cancel-btn",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        useAxios.delete(`/admissions-delete/${id}`).then((res) => {
          deleteProfileSuccessToast();
          refetchAdmissions();
        });
      }
    });
  };

  const handleSearchAttendance = (studentId) => {
    setAttendanceRecord([]);
    useAxios.get(`/student-attendance-history?studentId=${studentId}`).then((res) => {
      setAttendanceRecord(res?.data);
    });
  };

  const handleCourseCompleted = (id) => {
    useAxios.patch(`/course-completed-update/${id}`).then((res) => {
      toast.success("Successfully added to course completed");
      refetchAdmissions();
    });
  };

  // Filter students for নবম and দশম classes
  const filteredStudents = currentStudents.filter(
    (student) => student.batchInfo.studentClass === "নবম" || student.batchInfo.studentClass === "দশম"
  );

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({
  contentRef,
    documentTitle: "student's admit card.pdf",
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        .admit-card-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          page-break-inside: avoid; /* Prevent splitting across pages */
        }
        .admit-card {
          width: 100%; /* Half of A4 width */
          height: 540px; /* A4 height */
          margin-bottom: 20px; /* Space between rows */
          page-break-inside: avoid; /* Prevent splitting across pages */
        }
      }
    `,
  });

  return (
    <div className="bg-background-gradient p-5 min-h-screen">
      {/* Attendance Modal */}
      <dialog id="attendance-backend" className="modal">
        <div className="modal-box w-screen bg-white">
          <form method="dialog">
            <button className="btn btn-sm btn-circle border-[2px] border-red-600 text-red-600 absolute right-2 top-2">✕</button>
          </form>
          <div className="flex flex-col text-left space-y-1 w-full h-full p-5 text-black">
            <h1>Registration Number: <span className="font-medium text-lg">{attendanceRecord?.studentId}</span></h1>
            <h1>Total Present: <span className="font-medium text-lg">{attendanceRecord?.totalPresent > 0 ? attendanceRecord?.totalPresent : 0} days</span></h1>
            <h1>Total Absent: <span className="font-medium text-lg">{attendanceRecord?.totalAbsent > 0 ? attendanceRecord?.totalAbsent : 0} days</span></h1>
            <div>
              <h1>Attendance Record:</h1>
              <div className="flex gap-3 flex-wrap mt-1">
                {attendanceRecord?.attendanceRecord?.map((attendance) => (
                  <h1 key={attendance?.date} className={`${attendance?.attendance === "present" ? "bg-green-600 px-3 py-1 text-white w-fit rounded-3xl" : "bg-red-600 px-3 py-1 text-white w-fit rounded-3xl"}`}>
                    {moment(attendance?.date).format("DD MMM YYYY")}
                  </h1>
                ))}
              </div>
            </div>
          </div>
        </div>
      </dialog>

      {/* Main Content */}
      <div className="bg-white p-5 space-y-10">
        <div className="flex lg:flex-row flex-col items-center justify-between lg:px-10 text-black font-semibold p-5 lg:my-10">
          <div>
            <h3 className="font-bold lg:text-3xl mb-2">Current Students</h3>
          </div>
          <div className="flex flex-col lg:flex-row gap-5 items-center">
            <div>
              <label>
                <input type="text" className="grow input input-bordered" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} />
              </label>
            </div>
            <button type="button" onClick={reactToPrintFn} className="btn bg-button-gradient-backend text-white px-3 py-1">
              Print Admit Card
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="md:overflow-visible overflow-x-auto lg:px-10">
          <table className="table table-xs w-full table-auto">
            <thead className="lg:text-2xl bg-button-gradient-backend text-white">
              <tr>
                <th>Registration No.</th>
                <th>Id No.</th>
                <th>Date</th>
                <th>Student Name</th>
                <th>Batch</th>
                <th>Mobile</th>
                <th>Guardian’s Mobile</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((data, index) => (
                <tr className="text-black bg-white shadow-custom-backend rounded-lg my-10" key={index}>
                  <td className="lg:text-xl py-5">{data?.registrationNo}</td>
                  <td className="lg:text-xl py-5">{data?.rollNo}</td>
                  <td className="lg:text-xl py-5">{moment(data.enrollDate).format("DD MMM YYYY")}</td>
                  <td className="lg:text-xl py-5">{data.name}</td>
                  <td className="lg:text-xl py-5">{data.batch}</td>
                  <td className="lg:text-xl py-5">{data.mobile}</td>
                  <td className="lg:text-xl py-5">{data.guardiansMobile}</td>
                  <td className="lg:text-xl p-5 dropdown dropdown-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="bg-slate-400 text-white px-3 py-1 rounded-lg active:bg-slate-700">Options</DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>My Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Link href={`/dashboard/admin/student-admit-card?id=${data?._id}`}>Admit Card</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href={`/dashboard/admin/student-payment-history/${data?._id}`}>Payment History</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href={`/dashboard/admin/fees-entry?_id=${data?._id}`}>Payment</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href={`/dashboard/admin/admission-edit/${data._id}`}>Update Information</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <a onClick={() => handleDelete(data?._id)}>Remove Student</a>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hidden Admit Card Section for Printing */}
      <div className="hidden">
        <div className="py-20 bg-background-gradient min-h-screen">
          <div ref={contentRef} className="admit-card-container">
            {filteredStudents.map((studentInfo, index) => (
              <div
                    
              className="admit-card border p-5  text-[#5E6470] font-inter scale relative"
              style={{
                backgroundColor: "#fff",
                
              }}
            >
                        <figure
    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-9 z-10"
    style={{
      opacity: 0.1, // Watermark opacity
      pointerEvents: 'none', // Prevents blocking interaction
    }}
  >
    <img
      src={`/assets/images/Logo-removebg-preview.png`} // Replace with your image URL
      alt="Watermark"
      className="object-cover w-[200px] h-[200px]"
    />
  </figure>
          <div className='border h-full p-5'>
             <div className='flex gap-40'>
             <figure className="">  <img
                  src={`/assets/images/Logo.webp`} // Replace with your image URL
                  alt="Student"
                  className=" object-cover rounded w-[70px] h-[70px] "
                  
                /></figure>
                <div className='text-center text-black'>
                    <h1 className='font-bold'>INFINITY MATH CENTER, MOULVIBAZAR</h1>
                    <p className='font-semibold'>SSC 2025 BATCH</p>

                    <div className='flex justify-center mt-5'> 
                        <h2 className='px-5 py-2 bg-red-600 text-white w-fit '>Admit Card</h2>
                    </div>
                </div>
                </div>
                <div className="mt-5  grid grid-cols-3 gap-5 justify-between text-black font-medium text-[14px]">
<div className="grid grid-cols-[150px_10px_auto] gap-x-2 col-span-2">
<span className="text-left">Examiner name</span>
<span className="text-center">:</span>
<span className="text-left">{studentInfo?.name}</span>

<span className="text-left">Father's name</span>
<span className="text-center">:</span>
<span className="text-left">{studentInfo?.fathersOrHusbandName}</span>

<span className="text-left">Educational Institution</span>
<span className="text-center">:</span>
<span className="text-left">{studentInfo?.studentSchool}</span>
</div>

<div className="grid grid-cols-[60px_10px_auto] gap-x-2  col-span-1">
<span className="text-left">Id No</span>
<span className="text-center">:</span>
<span className="text-center">{studentInfo?.rollNo}</span>

<span className="text-left">Reg. No</span>
<span className="text-center">:</span>
<span className="text-center">{studentInfo?.registrationNo}</span>

<span className="text-left">Group</span>
<span className="text-center">:</span>
<span className="text-center">{studentInfo?.group}</span>
</div>
</div>

<div className="text-[14px]">

<div className='grid grid-cols-4  mt-2 text-black'>
<div className='col-span-4'>
<h2 className='text-center my-6 text-base'>Subject & Subject code</h2>
<div className='flex gap-2'>
<div className='space-y-2 '>
<h3>Bangla 1st paper-101,</h3>
<h3>English 2nd paper-108,</h3>
<h3>{studentInfo?.group=== 'Science' && "Higher math-126"}{studentInfo?.group=== 'Business Studies' && "General science-127"}{studentInfo?.group=== 'Arts' && "Economics-141"},</h3>
<h3>{studentInfo?.group=== 'Science' && "Biology-138"}{studentInfo?.group=== 'Business Studies' && "Finance and banking-152"}{studentInfo?.group=== 'Arts' && "Geography and environment-110"},</h3>
</div>
<div className='space-y-2 '>
<h3>Bangla 2nd paper-102,</h3>
<h3>General math-109,</h3>
<h3>{studentInfo?.group=== 'Science' && "Physics-136"}{studentInfo?.group=== 'Business Studies' && "Business entrepreneurship-143"}{studentInfo?.group=== 'Arts' && "Civics and citizenship-140"},</h3>
<h3>{studentInfo?.group=== 'Science' && "Bangladesh and global studies-150"}{studentInfo?.group=== 'Business Studies' || studentInfo?.group=== 'Arts' && "Information and communication technology-154"},</h3>
</div>
<div className='space-y-2 '>
<h3>English 1st paper-107,</h3>
<h3>Religion and moral education-111,</h3>
<h3>{studentInfo?.group=== 'Science' && "Chemistry-137"}{studentInfo?.group=== 'Business Studies' && "Accounting-146"},</h3>
<h3>{studentInfo?.group=== 'Science' && "Information and communication technology-154"},</h3>
</div>
</div>
</div>

<div className='col-span-1'></div>
</div>
</div>
<div>
<div className='flex justify-end  mt-3'>
<div className='text-center text-black font-medium'>
<h2>Ahmad ali</h2>
<h2>Director, Infinity math center</h2>
</div>
</div>
</div>
          </div>

            </div>
            ))}
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default CurrentStudent;