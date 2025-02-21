import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStudenentTransectionsByEmail } from '../../../../Hooks/useStudentTransectios';
import { useStudentFeesByEmail } from '../../../../Hooks/useStudentFees';
import { useGetStudentInfoByEmail } from '../../../../Hooks/useGetStudentInfo';
import moment from 'moment';

const PaymentHistory = () => {
    const paramsId = useParams()
    const {studentInfo} = useGetStudentInfoByEmail({email : paramsId?.id});
    const {studentFees} = useStudentFeesByEmail({email : paramsId?.id})
    const {studenentTransections} = useStudenentTransectionsByEmail({email : paramsId?.id})

    return (
         <>
                   <main className="bg-[#F5F6F9] h-full px-5 lg:px-10">
                       <header className="my-5 ">
       
                           <section>
                               <div>
                                   <div className="pl-12 bg-white p-5 ">
                                       <h1 className="text-[#A0A6B1] font-semibold">Account Management / <span className="text-[#2698D1]">Dashboard</span></h1>
                                   </div>
                               </div>
                           </section>
       
                           <section className="bg-white p-5 my-5 lg:grid grid-cols-8 xl:gap-32">
       
                               <div className="text-[#676D7C] bg-[#F7F9FB] pl-[30px] py-5 col-span-3 md:col-span-3  ">
                                   <h1>CIT {studentInfo?.registrationNo}</h1>
                                   <h1>{studentInfo?.course}</h1>
                                   <h1>Batch : {studentInfo?.batch}</h1>
                                   <h1>Approximate Start Date  : <span className="text-black font-semibold ml-2">
                                       {studentInfo?.sessionStart}</span></h1>
                                 
                               </div>
       
                               <div className="col-span-5 mt-5 lg:mt-0">
                                   <div className="flex lg:flex-col xl:flex-row md:flex-row flex-col 2xl:flex-row items-center gap-20">
                                       <div className="text-[#676D7C] lg:text-xl flex-1">
                                           <div className="flex justify-between">
                                               <h1>Course Fee</h1>
                                               <h1>{studentInfo?.fee}</h1>
                                           </div>
                                          
                                          
                                           <hr />
                                           <div className="flex justify-between">
                                               <h1>Discount (Fixed Amount)</h1>
                                               <h1>{studentInfo?.discount}</h1>
                                           </div>
                                           <hr />
                                           <div className="flex justify-between">
                                               <h1>Total Payable Amount</h1>
                                               <h1>{studentInfo?.fee - studentInfo?.discount}</h1>
                                           </div>
                                           <hr />
                                           <div className="flex justify-between">
                                               <h1>Due </h1>
                                               <h1>{studentInfo?.due}</h1>
                                           </div>
       
                                       </div>
                                       
                                   </div>
                               </div>
       
                           </section>
       
                           <div className="mb-5">
                               <div className="pl-12 bg-[#E5EAEF] p-5 ">
                                   <h1 className="text-[#A0A6B1] font-semibold">Installment List</h1>
                               </div>
                           </div>
       
                           <section>
       
                               <div className=" space-y-5">
       
                                   <div className="space-y-5">
                                      {
                                       studentFees.length > 0 &&  <>
                                       {
                                           studentFees?.map(data => <div key={data._id} className="flex flex-col 2xl:flex-row xl:flex-row lg:flex-col md:flex-col items-start justify-between px-5 bg-white">
                                               <div className="  my-5 py-10 flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row justify-center lg:gap-[50px]" >
                                                   <div className="flex flex-col justify-center items-center my-5 lg:my-0 ">
                                                       <h1 className="text-[#676D7C] mb-3">CIT {data?.studentInfo?.registrationNo}</h1>
                                                       <div>
                                                           <button className="bg-gradient-to-b from-[#70C6F1] to-[#1795D4] px-[20px] py-[8px] rounded-xl text-white font-semibold">Course Fee</button>
                                                       </div>
                                                   </div>
               
                                                   <div>
               
                                                       <div className="text-[#676D7C] ">
                                                           <div className="flex gap-[100px] ">
                                                               <h1>Invoice Date</h1>
                                                               <h1>{data?.feeInfo?.invoiceDate}</h1>
                                                           </div>
                                                           <hr />
                                                           <div className="flex justify-between">
                                                               <h1>Payment Date</h1>
                                                               <h1>{data?.feeInfo?.date}</h1>
                                                           </div>
                                                           <hr />
                                                           <div className="flex justify-between">
                                                               <h1>Transaction</h1>
                                                               <h1>{data?.feeInfo?.paymentMode}</h1>
                                                           </div>
                                                           <hr />
                                                           <div className="flex justify-between">
                                                               <h1>Payment</h1>
                                                               <div>
                                                                   <button className="bg-[#28d241] px-[20px] py-[4px] rounded-xl text-white font-semibold">paid</button>
                                                               </div>
                                                           </div>
               
               
               
                                                       </div>
               
                                                   </div>
                                               </div>
               
                                               <div className="  my-5 py-10 flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row items-center 2xl:gap-[100px] lg:gap-[200px] md:gap-[200px] xl:gap-[50px]" >
               
                                                   <div>
               
                                                       <div className="text-[#676D7C] ">
                                                           <div className="flex gap-[100px] ">
                                                               <h1>Payable Amount</h1>
                                                               <h1>{data?.amountInfo?.totalPayableAmount}</h1>
                                                           </div>
                                                           <hr />
                                                           <div className="flex justify-between">
                                                               <h1>paid Amount</h1>
                                                               <h1>{data?.feeInfo?.amount}</h1>
                                                           </div>
                                                           <hr />
                                                           <div className="flex justify-between">
                                                               <h1>Due</h1>
                                                               <h1>{data?.amountInfo?.due}</h1>
                                                           </div>
               
               
                                                       </div>
               
                                                   </div>
               
                                                   <div>
                                                   
                                                       <div>
                                                           <Link to={`/fees-invoice/${data?.feeInfo?._id}`} className="bg-gradient-to-b from-[#70C6F1] to-[#1795D4] px-[20px] py-[8px] rounded-xl text-white font-semibold">Invoice</Link>
                                                       </div>
                                                   </div>
               
               
                                               </div>
                                           </div>)
                                       }
                                       
                                       </>
                                      }
       
                                     
                                   </div>
       
       
       
                               </div>
       
                           </section>
                           <div className="my-5">
                               <div className="pl-12 bg-[#E5EAEF] p-5 ">
                                   <h1 className="text-[#A0A6B1] font-semibold">Genaral transections List</h1>
                               </div>
                           </div>
       
                           <section>
       
                               <div className=" space-y-5">
       
                                   <div className="space-y-5">
                                      {
                                       studenentTransections.length > 0 &&  <>
                                       {
                                           studenentTransections?.map(data => <div key={data._id} className="flex flex-col 2xl:flex-row xl:flex-row lg:flex-col md:flex-col items-start justify-between px-5 bg-white">
                                               <div className="  my-5 py-10 flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row justify-center lg:gap-[50px]" >
                                                   <div className="flex flex-col justify-center items-center my-5 lg:my-0 ">
                                                       <h1 className="text-[#676D7C] mb-3">CIT {studentInfo?.registrationNo}</h1>
                                                       <div>
                                                           <button className="bg-gradient-to-b from-[#70C6F1] to-[#1795D4] px-[20px] py-[8px] rounded-xl text-white font-semibold">{data?.category}</button>
                                                       </div>
                                                   </div>
               
                                                   <div>
               
                                                       <div className="text-[#676D7C] ">
                                                           <div className="flex gap-[100px]">
                                                               <h1>Invoice Date</h1>
                                                               <h1>{moment(data?.invoiceDate).format("DD MMM YYYY")}</h1>
                                                           </div>
                                                           <hr />
                                                           <div className="flex justify-between">
                                                               <h1>Payment Date</h1>
                                                               <h1>{moment(data?.date).format("DD MMM YYYY")}</h1>
                                                           </div>
                                                           <hr />
                                                           <div className="flex justify-between">
                                                               <h1>Transaction</h1>
                                                               <h1>{data?.transectionType}</h1>
                                                           </div>
                                                           <hr />
                                                           <div className="flex justify-between">
                                                               <h1>Payment</h1>
                                                               <div>
                                                                   <button className="bg-[#28d241] px-[20px] py-[4px] rounded-xl text-white font-semibold">paid</button>
                                                               </div>
                                                           </div>
               
               
               
                                                       </div>
               
                                                   </div>
                                               </div>
               
                                               <div className="  my-5 py-10 flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row items-center 2xl:gap-[100px] lg:gap-[200px] md:gap-[200px] xl:gap-[50px]" >
               
                                                   <div>
               
                                                       <div className="text-[#676D7C] ">
                                                           <div className="flex gap-[150px] ">
                                                               <h1>Invoice No.</h1>
                                                               <h1>{data?.invoiceNumber}</h1>
                                                           </div>
                                                           <hr />
                                                           <div className="flex justify-between">
                                                               <h1>paid Amount</h1>
                                                               <h1>{data?.cashReceived
                                                               }</h1>
                                                           </div>
                                                           <hr />
                                                           <div className="flex justify-between">
                                                               <h1>Due</h1>
                                                               <h1>0</h1>
                                                           </div>
               
               
                                                       </div>
               
                                                   </div>
               
                                                   <div>
                                                   
                                                       <div>
                                                           <Link to={`/general-invoice/${data?._id}`}  className="bg-gradient-to-b from-[#70C6F1] to-[#1795D4] px-[20px] py-[8px] rounded-xl text-white font-semibold">Invoice</Link>
                                                       </div>
                                                   </div>
               
               
                                               </div>
                                           </div>)
                                       }
                                       
                                       </>
                                      }
       
                                     
                                   </div>
       
       
       
                               </div>
       
                           </section>
       
                         
       
       
                       </header>
                   </main>
               </>
    );
};

export default PaymentHistory;