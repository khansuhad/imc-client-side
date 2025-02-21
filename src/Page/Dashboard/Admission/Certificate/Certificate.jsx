import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import "./Certificate.css"
import { useLoaderData } from 'react-router-dom';
import logo from "../../../../assets/img/Creation Institute of Technology.svg"
import icon from "../../../../assets/img/Creation Institute of Technology- Icon.svg"
import line from  "../../../../assets/img/Certificate Line Design.svg"
import signature from "../../../../assets/img/Wasim Ahmed Nishan Sign.svg"

import moment from 'moment';
import QRCode from 'react-qr-code';
const Certificate = () => {
  const data = useLoaderData()
  const contentRef = useRef(null);
 
   const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: `${data?.registrationNo}-${data?.name}.pdf`,
    pageStyle: `
      @page {
        size: auto;
        margin: 0;
      }
     .scale {
        transform: scale(1.33); /* Increase scale to 120% */
        transform-origin: top left; /* Ensure it scales from the top-left corner */
      }
    `,
  });
  return (
    <div className='bg-button-gradient-backend min-h-screen'>
    
    <div >
    <div className=" flex justify-center  py-10 " >
    
    <div className="w-[841.89px] h-[595.28px] bg-white relative font-montserrat scale" ref={contentRef}  
    >
    <figure className="absolute left-[43px] top-[40px] w-[150px] h-[46px]">
      <img src={logo} alt="" />
    </figure>
    <div className="absolute left-[43px] top-[150px] space-y-[25px]">
    <div>
      <h1 className="font-medium">ID No</h1>
      <h1 className="font-semibold">{data?.registrationNo}</h1>
    </div>
    <div>
      <h1 className="font-medium">Batch No</h1>
      <h1 className="font-semibold">{data?.batch}</h1>
    </div>
    <div>
      <h1 className="font-medium">Date of Issue</h1>
      <h1 className="font-semibold">{moment(data?.issueDate).format("DD MMM YYYY") ||moment().format("DD MMM YYYY")}</h1>
    </div>
    </div>
    
    <div className="absolute left-[43px] top-[390px] ">
    <QRCode size={80} bgColor='white' fgColor='black' value={`https://www.creationit.info/student-verification/${data?.registrationNo}`}/>
    </div>
    <div className="absolute left-[292px] top-[150px]   ">
    <h1 className="text-[47px] ql-font-better-yesterday leading-[60px]">Certificate of</h1>
    <h1 className="text-[44px] font-montserrat text-[#139EE2] font-bold  leading-[15.239px]">TRAINING</h1>
    <div className="mt-[39px]">
      <h1 className="text-[14px] font-medium">this is to certify that</h1>
      <h1 className="text-[17px] font-bold">{data?.name}</h1>
      <h1 className="text-[14px] font-medium">has successfully completed the course of  </h1>
      <h1 className="text-[14px] font-semibold">{data?.course}</h1>
    </div>
    <div className="mt-[40px] flex gap-[43px]">
    <div className=" ">
    <figure className="w-[112px] h-[46px] ml-5 -mb-2"><img src={signature} alt="" /></figure>
    <h1 className="text-[9px] font-medium">Wasim Ahmed Nishan</h1>
    <h1 className="text-[7px] ml-5 font-medium" >Founder & CEO</h1>
    </div>
    <figure className="w-[98px] h-[95px]"><img src={icon} alt="" /></figure>
    </div>
    </div>
    <div className="absolute right-[179px] top-[30px]   ">
    <h1 className="text-[13px] font-medium font-raleway italic">Invest your <span className="text-[#139EE2]">future</span> and become an <span className="text-[#139EE2]">expert</span></h1>
    
    </div>
    <div className="absolute left-[43px] top-[510px]   ">
    <h1 className="text-[11px] font-medium">support@creationit.info | www.creationit.info</h1>
    <h1 className="text-[11px] font-medium">Shamshernagar Road, Maulvi Bazar, Bangladesh</h1>
    <h1 className="text-[9px] font-medium text-[#666666]">#This certificate has been electronically generated and does not require a physical seal</h1>
    </div>
    
    <figure className="absolute right-[41px] top-[37px] w-[114px] h-[530px]"> 
      <img src={line} alt="" />
    </figure>
    
    </div>
    
    </div>
    </div>
    <div className="flex justify-center items-center mt-5 ">
         <button onClick={reactToPrintFn} className=" flex justify-center items-center bg-button-gradient-backend text-white px-10 py-2 rounded">Print</button>
         
         </div>
    </div>
  );
};

export default Certificate;