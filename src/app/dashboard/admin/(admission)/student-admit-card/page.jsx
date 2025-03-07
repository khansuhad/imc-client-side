"use client"
import React, { useEffect, useRef, useState } from 'react';
import useAxiosPublic from '../../../../../hooks/useAxiosPublic';
import { useDispatch } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import moment from 'moment';
import axios from 'axios';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import AdmitCardPDF from '../../../(DashboardComponents)/AdminNavItems/AdmitCard';

const Page = () => {
    const useAXios = useAxiosPublic();
  const dispatch = useDispatch();
      const [idNo, setIdNo] = useState("");
      const [studentInfo,setStudentInfo] = useState({})
      console.log(studentInfo);
      const [studentInfo2, setStudentInfo2] = useState({
        name:studentInfo?.name,
        fathersOrHusbandName: studentInfo?.fathersOrHusbandName,
        studentSchool: studentInfo?.studentSchool,
        rollNo: studentInfo?.rollNo,
        registrationNo:studentInfo?.registrationNo,
        group: studentInfo?.group,
      });
    
   
     useEffect(() => {
          if (typeof window !== "undefined") {
              const urlParams = new URLSearchParams(window.location.search);
              setIdNo(urlParams.get("id"));
          }
      }, []);
        useEffect(() => {
            const fetchData =async( ) =>{
                const res = await useAXios.get(`/admissions/${idNo}`)
            setStudentInfo(res?.data)
            }
            fetchData()
        }, [dispatch, useAXios,idNo]);
         const contentRef = useRef(null);
      const reactToPrintFn = useReactToPrint({contentRef, documentTitle: `${studentInfo?.name} admit card.pdf`,
        pageStyle: `
        @page {
          size: auto;
          margin: 0;
        }
       .scale {
          transform: scale(1.34); /* Increase scale to 120% */
          transform-origin: top ; /* Ensure it scales from the top-left corner */
        }
      `,
      });
    return (
        <div className="py-20 bg-background-gradient min-h-screen">
                 <div>
                  <PDFViewer width="100%" height="50%">
                    <AdmitCardPDF studentInfo={studentInfo}/>
                  </PDFViewer>
                 </div>
                 <PDFDownloadLink document={<AdmitCardPDF/>} fileName='admit card.pdf'>
                 <button  className=" flex justify-center items-center bg-button-gradient-backend text-white px-10 py-2 rounded">Download Admit Card</button>
                 </PDFDownloadLink>
                
                   <div
                    
                      className="mx-auto border p-5  text-[#5E6470] font-inter scale relative"
                      ref={contentRef}
                      style={{
                        width: "591px", // A4 width
                        height: "418px", // A4 height 
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
                  <div className='border h-full p-5 '>
                     <div className='flex gap-10'>
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
                        <div className="mt-5 text-[10px] grid grid-cols-3 gap-5 justify-between text-black font-medium">
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

<div className='text-[9px]'>

<div className='grid grid-cols-4  mt-2 text-black font-semibold'>
 <div className='col-span-4'>
 <h2 className='text-center my-3 text-[12px]'>Subject & Subject code</h2>
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
  <div className='flex justify-end text-[10px] mt-3'>
 <div className='text-center text-black font-medium'>
 <h2>Ahmad ali</h2>
 <h2>Director, Infinity math center</h2>
 </div>
  </div>
</div>
                  </div>

                    </div>
                  
                   
                      <div className="flex justify-center items-center mt-5 ">
                   <button onClick={reactToPrintFn} className=" flex justify-center items-center bg-button-gradient-backend text-white px-10 py-2 rounded">Print</button>
                   </div>
                   </div>
    );
};

export default Page;