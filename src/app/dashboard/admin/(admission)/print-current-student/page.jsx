"use client"
import React, { useRef, useEffect, useState } from "react";
;
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { fetchAdmissions } from "../../../../../redux/features/admissions/admissionSlice/admissionSlice";
import { fetchClassBatches, fetchDuesAlert } from "../../../../../redux/features/batch/batchSlice/batchSlice";
import { Toaster } from "react-hot-toast";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";

const PrintCurrentStudent = () => {

  const useAxios = useAxiosPublic();
  const dispatch = useDispatch();
  const [searchLoading,setSearchLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  const [batch, setBatch] = useState("");
  const [studentClass, setStudentClass] = useState("সপ্তম");
  const [selectedFields, setSelectedFields] = useState([]);

  const { currentStudents, status } = useSelector((state) => state.admissions);
  const { classBatches, duesAlert } = useSelector((state) => state.batches);

  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({
     contentRef,
    documentTitle: "Student Information.pdf"
  });
  const fieldLabels = {
    registrationNo: "Registration No",
    rollNo: "Id No",
    name: "Name",
    studentNickname: "Nickname",
    fathersOrHusbandName: "Father's Name",
    mothersName: "Mother's Name",
    mobile: "Mobile",
    guardiansMobile: "Guardian's Mobile",
    batch: "Batch",
    studentMonthlyFee: "Monthly Fee",
    bloodGroup: "Blood Group",
  };
  
  useEffect(() => {
    dispatch(fetchAdmissions({
      data: { searchTerm: searchTerm },
      axiosInstance: useAxios,
    }));
  }, [dispatch, searchTerm, useAxios]);

  const handleStudentClass = (value) => {
    setStudentClass(value);
    setBatch("");
  };

  const handleClassBatches = (studentClass) => {
    dispatch(fetchClassBatches({ data: { searchTerm: studentClass }, axiosInstance: useAxios }));
  };

  const handleSearchDuesReport = (e) => {
    e.preventDefault();
    setSearchLoading(true)
    const form = e.target;
    const studentClass = form.studentClass.value;
    const batch = form.batch.value;
    dispatch(fetchDuesAlert({ data: { batch: batch, studentClass: studentClass }, axiosInstance: useAxios }));
    setTimeout(() => {
      setSearchLoading(false)
    },2000)
  };

  const handleFieldChange = (field) => {
    setSelectedFields((prevSelected) =>
      prevSelected.includes(field)
        ? prevSelected.filter((f) => f !== field)
        : [...prevSelected, field]
    );
  };

  return (
    <div className="bg-background-gradient p-5 min-h-screen">
      <div className="bg-white p-5 space-y-10">
        <div className="flex lg:flex-row flex-col items-center justify-between lg:px-10 text-black font-semibold p-5 lg:my-10">
          <h3 className="font-bold lg:text-3xl mb-2">Current Students</h3>
        </div>

        <form onSubmit={handleSearchDuesReport} className="p-6 text-black">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            <div className="mt-2">
              <label className="text-[16px] font-medium text-black w-full">Class</label>
              <select
                id="dropdown"
                name="studentClass"
                onChange={(e) => {
                  handleClassBatches(e.target.value);
                  handleStudentClass(e.target.value);
                }}
                className="block border-[1px] p-1 lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] font-medium outline-none"
                defaultValue={"সপ্তম"}
                required
              >
                <option value="সপ্তম">সপ্তম</option>
                <option value="অষ্টম">অষ্টম</option>
                <option value="নবম">নবম</option>
                <option value="দশম">দশম</option>
                <option value="একাদশ - দ্বাদশ">একাদশ - দ্বাদশ</option>
              </select>
            </div>

            <div className="mt-2">
              <label className="text-[16px] font-medium text-black w-full">Batch No</label>
              <input
                list="batch"
                name="batch"
                onChange={(e) => setBatch(e.target.value)}
                placeholder="Type the batch name"
                className="block border-[1px] p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black"
              />
              <datalist id="batch">
                <option value="false" selected>Not Selected</option>
                {classBatches?.map(batch => (
                  <option key={batch?._id} value={batch?.batchTitle}>{batch?.batchTitle}</option>
                ))}
              </datalist>
            </div>
          </div>

          <button
            type="submit"
            className={`rounded px-5 py-2 hover:border-[#007BFF] duration-500 transition-all hover:bg-[#007BFF] border-2 flex gap-2  text-white items-center btn w-fit my-5 disabled:bg-gray-600 ${searchLoading ? "bg-gray-600 " : "bg-button-gradient-backend"}`}
            disabled={searchLoading}
          >
            {searchLoading ?  "Loading..." : 'Search'}
          </button>
        </form>

        <div className="bg-gray-100 p-4 rounded-md text-black">
          <h4 className="font-semibold mb-2">Select Fields to Print:</h4>
          <div className="flex flex-wrap gap-4">
            {[
              "registrationNo",
              "rollNo",
              "name",
              "studentNickname",
              "fathersOrHusbandName",
              "mothersName",
              "mobile",
              "guardiansMobile",
              "batch",
              "studentMonthlyFee",
              "bloodGroup",
            ].map((field) => (
              <label key={field} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={field}
                  onChange={() => handleFieldChange(field)}
                  checked={selectedFields.includes(field)}
                />
                {field}
              </label>
            ))}
          </div>
          <button
            onClick={handlePrint}
            className="btn mt-3 bg-blue-600 text-white"
          >
            Print Selected Fields
          </button>
        </div>

        <div className="hidden">
          <div className="bg-white py-5" ref={contentRef} style={{ width: "216mm", height: "295mm" }}>
            <div className="text-center mb-5">
              <h1 className="text-xl font-semibold">Infinity Math Center</h1>
              <h1 className="text-lg">Student Information</h1>
              <h2>Total Student: {duesAlert?.length}</h2>
            </div>
          <div className=" px-4">
          <table className="table table-xs">
              <thead className="bg-black text-white ">
                <tr>
                  {selectedFields.map((field) => (
                    <th key={field} className="text-center">{fieldLabels[field]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {duesAlert.map((data, index) => (
                  <tr className="text-black bg-white" key={index}>
                    {selectedFields.map((field) => (
                      <td key={field} className="text-center">{data[field]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default PrintCurrentStudent;
