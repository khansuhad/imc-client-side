import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import logo from "../../../../assets/img/logo.png"
import { useLoaderData } from "react-router-dom";
import moment from "moment";

const Invoice = () => {
    const data = useLoaderData();

    const contentRef = useRef(null);
      const reactToPrintFn = useReactToPrint({contentRef, documentTitle: `${data?.invoiceNumber}.pdf`,
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
                 
              
                   <div
                    
                      className="mx-auto border pl-[41px] pr-[35px] py-[27px]  text-[#5E6470] font-inter scale"
                      ref={contentRef}
                      style={{
                        width: "591px", // A4 width
                        height: "418px", // A4 height 
                        backgroundColor: "#fff",
                        
                      }}
                    >
                      <div className="flex justify-between items-center gap-4 mb-2">
                      <figure className="w-[163.336px] h-[63.787px]">  <img
                          src={logo} // Replace with your image URL
                          alt="Student"
                          className=" object-cover rounded "
                          
                        /></figure>
                        <div className="text-right text-[10px]">
                          <h1 className="text-[10px]">
                          01777 560463
                          </h1>
                          <h1 className="text-[10px]">
                          support@creationit.info
                          </h1>
                          <h1 className="text-[10px]">
                          Shamshernagar Road, Moulvibazar
                          </h1>
                         
                        </div>
                      </div>
              <div className="h-[277px] border-[0.5px] rounded-[12px] border-[#D7DAE0] p-[16px]">
                      <div className="text-[10px] grid grid-cols-2 gap-[10px]">
                       <div>
                         <h1>Billed to,</h1>
                         <h1 className="text-black font-semibold">{data?.name}</h1>
                         <h1>{data?.course}</h1>
                         <h1>Batch No: {data?.batch}
                      </h1>
                         <h1>
                         Mobile No: {data?.mobile}</h1>
                       </div>
                      <div className="grid grid-cols-2">
                      <div>
                         <h1>Invoice number</h1>
                         <h1 className="text-black font-semibold">{data?.invoiceNumber}</h1>
                       </div>
                       <div className="text-left  flex flex-col items-end"><div><h1>Invoice date</h1>
                       <h1 className="text-black font-semibold">{moment(data?.invoiceDate).format("DD MMM YYYY")}</h1></div></div>
                      </div>
                      </div>
                      <div className="mt-[25px]">
                       <div className="text-[10px] grid grid-cols-3 gap-[10px]">
                         <h1 className="text-black font-semibold uppercase">Details</h1>
                         <h1 className="text-center text-black font-semibold uppercase">Mode</h1>
                         <h1 className="text-right text-black font-semibold uppercase">Amount</h1>
                       </div>
                       <hr  className="my-[4px] w-full h-[0.5px] bg-[#D7DAE0]"/>
                       <div className="text-[10px] grid grid-cols-3 gap-[10px]">
                         <h1>Course Fee</h1>
                         <h1 className="text-center">{data?.paymentMode}</h1>
                         <h1 className="text-right">{data?.amount}</h1>
                       </div>
                       <hr  className="my-[8px] w-full h-[0.5px] bg-[#D7DAE0]"/>
                       <div className="text-[10px] grid grid-cols-3 gap-[10px]">
                         <h1 className="col-span-2 text-black font-semibold">Remarks</h1>
                         <div className="col-span-1 flex justify-between">
                         <h1 className="text-left text-black font-semibold">Total</h1>
                         <h1 className="text-right text-black font-semibold">{data?.amount}</h1>
                         </div>
                       </div>
                      </div>
                      <div className="flex justify-between mt-[43px]">
                       <div>
                         <h1 className="text-[10px] text-black font-semibold">Thank you for your Payment.</h1>
                         <h1 className="text-[8px]">We look forward to supporting your success at Creation Institute</h1>
                       </div>
                       <div>
                       <div className="mt-[5px]">
                   <h1 className="px-3 py-1 border-t-[1px] border-[#84818A] text-[9px] text-black font-medium">Authorized Signature</h1>
                 </div>
                       </div>
                      </div>
              </div>
          
       
                      <div className="flex justify-center items-center text-[12px] mt-[10px]">
                        <h1 className="text-[8px] text-[#84818A]">www.creationit.info | Printing Time: {moment().format("DD MMM YYYY")}  | {moment().format("h:mm:ss a")}</h1>
                      </div>
                      {/* <h3 className="text-lg font-semisemibold mt-4 mb-2">Payment Information</h3>
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

export default Invoice;