"use client"

import { useDispatch, useSelector } from "react-redux";
import { use, useEffect } from "react";

import moment from "moment";
import useAxiosPublic from "../../../../../../hooks/useAxiosPublic";
import { fetchStudentPaymentHistory } from "../../../../../../redux/features/fees/feesSlice/feesSlice";
import { fetchStudentDetails } from "../../../../../../redux/features/admissions/admissionSlice/admissionSlice";



const PaymentHistory = ({params}) => {
      const unwrapParams = use(params)
      const id = unwrapParams.id
    const axiosInstance = useAxiosPublic()

    const { studentInfo  } = useSelector((state) => state.admissions);
    const { studentPaymentHistory, status } = useSelector((state) => state.fees);
    console.log(studentPaymentHistory);
    const dispatch = useDispatch()
    useEffect(() =>{
            dispatch(fetchStudentPaymentHistory({data : {searchTerm : studentInfo?.registrationNo } ,axiosInstance : axiosInstance}))
            dispatch(fetchStudentDetails({data : {searchTerm : id } ,axiosInstance : axiosInstance}))
    },[id , dispatch,axiosInstance,studentInfo?.registrationNo])
    return (
         <>
                   <main className="bg-background-gradient h-full p-5 lg:p-10">
                       <header className=" ">
       
                           <section>
                               <div>
                                   <div className="pl-12 bg-white p-5 ">
                                       <h1 className="text-[#A0A6B1] font-semibold">Account Management</h1>
                                   </div>
                               </div>
                           </section>
       
                           <section className="bg-white p-5 my-5 lg:grid grid-cols-8 xl:gap-32">
       
                               <div className="text-[#676D7C] bg-[#F7F9FB] pl-[30px] py-5 col-span-3 md:col-span-3  ">
                                   <h1>CIT {studentInfo?.registrationNo}</h1>
                                   <h1>{studentInfo?.name}</h1>
                                   <h1>Batch : {studentInfo?.batch}</h1>
                                   <h1>Guardian Mobile : {studentInfo?.guardiansMobile}</h1>

                                 
                               </div>
       
             
       
                           </section>
       
                           <div className="mb-5">
                               <div className="pl-12 bg-[#E5EAEF] p-5 ">
                                   <h1 className="text-[#A0A6B1] font-semibold">Fees List</h1>
                               </div>
                           </div>
       
                           <section>
       
                               <div className=" space-y-5">
       
                                   <div className="space-y-5">
                                      {
                                       studentPaymentHistory.length > 0 &&  <>
                                       {
                                           studentPaymentHistory?.map(data => <div key={data._id} className="flex flex-col 2xl:flex-row xl:flex-row lg:flex-col md:flex-col items-start justify-between px-5 bg-white">
                                               <div className="  my-5 py-10 flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row justify-center lg:gap-[50px]" >
                                                   <div className="flex flex-col justify-center items-center my-5 lg:my-0 ">
                                                       <h1 className="text-[#676D7C] mb-3">IMC {studentInfo?.registrationNo}</h1>
                                                       <div>
                                                           <button className="bg-button-gradient-backend px-[20px] py-[8px] rounded-xl text-white font-semibold"> {data?.category}</button>
                                                       </div>
                                                   </div>
               
                                                   <div>
               
                                                       <div className="text-[#676D7C] ">
                                                           
                                                           <div className="flex justify-between gap-5">
                                                               <h1>Payment Date</h1>
                                                               <h1>{moment(data?.date).format("DD MMM YYYY")}</h1>
                                                           </div>
                                                           <hr />
                                                           <div className="flex justify-between">
                                                               <h1>Transaction</h1>
                                                               <h1>{data?.transectionMode}</h1>
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
                                                               <h1>Paid Monthly Fee</h1>
                                                               <h1>{data?.duesMonthPayment?.map(month => {return month.month})}</h1>
                                                           </div>
                                                           <hr />
                                                           <div className="flex gap-[100px] ">
                                                               <h1>Paid Exam Monthly Fee</h1>
                                                               <h1>{data?.duesBatchMonthlyFeePayment?.map(month => {return month.month})}</h1>
                                                           </div>
                                                           <hr />
                                                           <div className="flex justify-between">
                                                               <h1>Total Paid Amount</h1>
                                                               <h1>{data?.cashReceived}</h1>
                                                           </div>
                                                           <hr />

               
               
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