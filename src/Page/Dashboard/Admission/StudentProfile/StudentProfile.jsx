import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import logo from "../../../../assets/img/creation.png"
import { useLoaderData } from "react-router-dom";
import moment from "moment";
const StudentProfile = () => {
    const data = useLoaderData();
 
    const contentRef = useRef(null);
      const reactToPrintFn = useReactToPrint({contentRef });
    return (
        <div className="py-20">
   
      <div
        ref={contentRef}
        className="mx-auto border px-14 py-20 font-poppins text-black"
        style={{
          width: "216mm", // A4 width
          height: "305mm", // A4 height
          backgroundColor: "#fff",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex justify-between items-center gap-4 mb-2">
          <img
            src={logo} // Replace with your image URL
            alt="Student"
            className=" object-cover rounded"
          />
          <div className="text-right text-[13px]">
            <h1 className="text-[13px]">
            01777 560463
            </h1>
            <h1 className="text-[13px]">
            support@creationit.info
            </h1>
            <h1 className="text-[13px]">
            Shamshernagar Road, Moulvibazar
            </h1>
           
          </div>
        </div>

        <hr  className="my-5 w-full"/>

        <div className="my-2 flex gap-10 w-[90%] mx-auto">
            <div>
            <figure>
            <img
            src={data?.photoURL} // Replace with your image URL
            alt="Student"
            className="rounded-full object-cover w-28 h-28 bg-cover bg-red-800"
          />
            </figure>
            </div>
            <div className="flex-1 text-[13px]">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h1 className="font-bold">{data?.name}</h1>
                  <h3>Student ID : {data?.registrationNo}</h3>
                </div>
                <div>
                  <h1 className="text-[#84818A]">Issue date</h1>
                  <h3>{moment().format("DD MMM, YYYY")}</h3>
                </div>
              </div>
              <div className="text-[13px]">
                <div className="py-1">
                  <h3 className="space-x-4 flex"> <h3 className="w-28 text-[#84818A]">Course</h3> <span className="mr-4">:</span><span>{data?.course}</span></h3>
                </div>
                <hr />
                <div className="py-1">
                  <h3 className="space-x-4 flex"> <h3 className="w-28 text-[#84818A]">Batch No</h3><span className="mr-4">:</span><span>{data?.batch}</span></h3>
                </div>
                <hr />
                <div className="py-1">
                  <h3 className="space-x-4 flex"> <h3 className="w-28 text-[#84818A]"> Mobile</h3><span className="mr-4">:</span><span>{data?.mobile}</span></h3>
                </div>
                <hr />
                <div className="py-1">
                  <h3 className="space-x-4 flex"> <h3 className="w-28 text-[#84818A]">Email</h3><span className="mr-4">:</span><span>{data?.email}</span></h3>
                </div>
             
              </div>
            </div>
        </div>
        <hr className="my-2 w-full"/>
        <div className="text-[13px]">
        <h1 className="text-[#2698D1] font-semibold mb-2 text-[15px]">Personal Information</h1>
          <div>
          <div className="flex gap-10 items-center">
          <h3 className=" flex w-[400px]"> <h3 className="w-[220px] text-[#84818A]">Father’s Name</h3><span className="mr-4">:</span><span>{data?.fathersOrHusbandName}</span></h3>
          <h3 className=" flex w-[300px]"> <h3 className="w-32 text-[#84818A]">Date of Birth</h3><span className="mr-4">:</span><span>{data?.dateOfBirth}</span></h3>
          </div>
          <div className="flex gap-10 items-center">
          <h3 className=" flex w-[400px]"> <h3 className="w-[220px] text-[#84818A]">Mother’s Name</h3><span className="mr-4">:</span><span>{data?.mothersName}</span></h3>
          <h3 className="  flex w-[300px]"> <h3 className="w-32 text-[#84818A]">Civil Status</h3><span className="mr-4">:</span><span>{data?.maritalStatus}</span></h3>
          </div>
          <div className="flex gap-10 items-center">
          <h3 className=" flex w-[400px]"> <h3 className="w-[220px] text-[#84818A]">Gaurdian&rsquo;s Mobile No</h3><span className="mr-4">:</span><span>{data?.guardiansMobile}</span></h3>
          <h3 className="  flex w-[300px]"> <h3 className="w-32 text-[#84818A]">Gender</h3><span className="mr-4">:</span><span>{data?.gender}</span></h3>
          </div>
          <div className="flex gap-10 items-center">
          <h3 className=" flex w-[400px]"> <h3 className="w-[220px] text-[#84818A]">Occupation</h3><span className="mr-4">:</span><span>{data?.occupation}</span></h3>
          <h3 className="  flex w-[300px]"> <h3 className="w-32 text-[#84818A]">Blood Group</h3><span className="mr-4">:</span><span>{data?.bloodGroup}</span></h3>
          </div>
          <div>
          <h3 className="flex "> <h3 className="w-[220px] text-[#84818A]">Educational Qualification</h3><span className="mr-4">:</span><span>{data?.highestEducationQualification}</span></h3>
          <h3 className="flex "> <h3 className="w-[220px] text-[#84818A]">Present Address</h3><span className="mr-4">:</span><span>{data?.presentAddress}</span></h3>
          <h3 className="flex "> <h3 className="w-[220px] text-[#84818A]">Permanent Address</h3><span className="mr-4">:</span><span>{data?.permanentAddress}</span></h3>
          </div>
          </div>
        </div>
        <hr className="my-2 w-full"/>
        <div className="text-[13px]">
        <div className="flex gap-10 items-center">
          <h3 className=" flex w-[400px]"> <h3 className="w-[220px] text-[#84818A]">Certificate Type</h3><span className="mr-4">:</span><span>{data?.type}</span></h3>
          <h3 className=" flex w-[300px]"> <h3 className="w-32 text-[#84818A]">Session Start</h3><span className="mr-4">:</span><span>{data?.sessionStart}</span></h3>
          </div>
          <div className="flex gap-10 items-center">
          <h3 className=" flex w-[400px]"> <h3 className="w-[220px] text-[#84818A]">Reference Name</h3><span className="mr-4">:</span><span>{data?.reference}</span></h3>
          <h3 className=" flex w-[300px]"> <h3 className="w-32 text-[#84818A]">Mobile</h3><span className="mr-4">:</span><span>{data?.referenceMobile}</span></h3>
          </div>
        </div>
        <hr className="my-2 w-full"/>
        <div className="text-[13px]">
        <h1 className="text-[#2698D1] font-semibold mb-2 text-[15px]">Account</h1>
          <div>
          <div>
          <h3 className="flex "> <h3 className="w-[220px] text-[#84818A]">Course Fee</h3><span className="mr-4">:</span><span>{data?.fee}</span></h3>
          <h3 className="flex "> <h3 className="w-[220px] text-[#84818A]">Discount</h3><span className="mr-4">:</span><span>{data?.discount}</span></h3>

          </div>
          <div className="flex gap-10 items-center">
          <h3 className=" flex w-[400px]"> <h3 className="w-[220px] text-[#84818A]">Payable Amount</h3><span className="mr-4">:</span><span>{data?.payable}</span></h3>
          <h3 className=" flex w-[400px]"> <h3 className="w-[177px] text-[#84818A]">Paid Amount</h3><span className="mr-4">:</span><span>{data?.paidAmount}</span></h3>
          </div>
          <div className="flex gap-10 items-center">
          <h3 className=" flex w-[400px]"> <h3 className="w-[220px] text-[#84818A]">Down payment</h3><span className="mr-4">:</span><span>{data?.downPayment}</span></h3>
          <h3 className=" flex w-[400px]"> <h3 className="w-[177px] text-[#84818A]">Down payment Date</h3><span className="mr-4">:</span><span>{data?.downPaymentDate}</span></h3>
          </div>
          <div className="flex gap-10 items-center">
          <h3 className=" flex w-[400px]"> <h3 className="w-[220px] text-[#84818A]">1st Installment</h3><span className="mr-4">:</span><span>{data?.firstInstallment}</span></h3>
          <h3 className="  flex w-[400px]"> <h3 className="w-[177px] text-[#84818A]">1st Installment Date</h3><span className="mr-4">:</span><span>{data?.firstInstallmentDate}</span></h3>
          </div>
          <div className="flex gap-10 items-center">
          <h3 className=" flex w-[400px]"> <h3 className="w-[220px] text-[#84818A]">2nd Installment</h3><span className="mr-4">:</span><span>{data?.secondInstallment}</span></h3>
          <h3 className="  flex w-[400px]"> <h3 className="w-[177px] text-[#84818A] ">2nd Installment Date</h3><span className="mr-4">:</span><span>{data?.secondInstallmentDate}</span></h3>
          </div>
          </div>
        </div>
        <hr className="my-2 w-full"/>

        <div>
        <div className="flex gap-10 items-center">
          <h3 className=" flex w-[400px]"></h3>
          <div className="flex justify-center items-center">
          <h3 className="  flex w-[300px] items-center justify-center"> <h3 className="w-32 text-[#84818A]">Payment Status</h3><span className="mr-4">:</span>  <div className="flex justify-center ">
                                            {
                                                data?.due <= 0 ? <button className="bg-gradient-to-r from-[#3abf72] to-[#03ab27] font-medium  rounded-3xl px-4 py-1 text-white">Paid</button> :<button className="bg-gradient-to-r from-[#FC7727] to-[#F69401]  font-medium  rounded-3xl px-4 py-1 text-white">Due</button>
                                            }
                                        </div></h3>
          </div>
          </div>
        </div>
        <hr className="my-2 w-full"/>
        <div className="text-[13px]">
        <h1 className="text-[#2698D1] font-semibold mb-2 text-[15px]">Attendance Information </h1>
         
          <h3 className=" flex w-[400px]"> <h3 className="w-[220px] text-[#84818A]">Total Present</h3><span className="mr-4">:</span><span>{data?.studentAttendanceRecord?.totalPresent > 0 ? data?.studentAttendanceRecord?.totalPresent : 0} Days</span></h3>
          <h3 className=" flex w-[400px]"> <h3 className="w-[220px] text-[#84818A]">Total Absent</h3><span className="mr-4">:</span><span>{data?.studentAttendanceRecord?.totalPresent > 0 ? data?.studentAttendanceRecord?.totalAbsent : 0} Days</span></h3>

          <div className="flex gap-10 mt-20 items-center">
          <h3 className=" flex w-[290px]"> </h3>
          <div className="flex gap-14 ">
            <h1 className="px-3 py-1 border-t-[1px] border-[#84818A] text-[12px] text-[#84818A]" >Student Signature</h1>
            <h1 className="px-3 py-1 border-t-[1px] border-[#84818A] text-[12px] text-[#84818A]">Authorized Signature</h1>
          </div>
          </div>
        </div>
        <hr className="my-2 w-full border-black"/>
        <div className="flex justify-center items-center text-[12px] ">
          <h1 className="text-[10px] text-[#84818A]">www.creationit.info | Printing Time: {moment().format("DD MMM YYYY")}  | {moment().format("h:mm:ss a")}</h1>
        </div>
        {/* <h3 className="text-lg font-semibold mt-4 mb-2">Payment Information</h3>
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 p-2">Month</th>
              <th className="border border-gray-400 p-2">Amount</th>
              <th className="border border-gray-400 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-400 p-2">January</td>
              <td className="border border-gray-400 p-2">$100</td>
              <td className="border border-gray-400 p-2 text-green-500">
                Paid
              </td>
            </tr>
            <tr>
              <td className="border border-gray-400 p-2">February</td>
              <td className="border border-gray-400 p-2">$100</td>
              <td className="border border-gray-400 p-2 text-red-500">
                Pending
              </td>
            </tr>
          </tbody>
        </table>

        <h1 className="mt-6 text-sm text-gray-500">
          * This document is auto-generated and used for record purposes only.
        </h1> */}
      </div>
        <div className="flex justify-center items-center mt-5 ">
     <button onClick={reactToPrintFn} className=" flex justify-center items-center bg-button-gradient-backend text-white px-10 py-2 rounded">Print</button>
     </div>
     </div>
    );
};

export default StudentProfile;