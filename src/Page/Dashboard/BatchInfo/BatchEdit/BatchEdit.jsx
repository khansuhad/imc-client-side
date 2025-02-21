import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";


import { FaRegSave } from "react-icons/fa";
import useAxiosPublic from "../../../../Hock/useAxiosPublic";
import { useState } from "react";

const BatchEdit = () => {
   const [loadingButton , setLoadingButton] = useState(false)
  const data = useLoaderData();
 console.log(data);
  const selectCustomStyles = {
    control: (provided) => ({
      ...provided,
     
      border: '1px solid #9E9E9E',
       /* Tailwind class `p-1` */
      fontWeight: '300', /* Tailwind class `font-light` */
      fontSize: '16px', /* Tailwind class `lg:text-[16px]` */
      marginTop: '0.25rem', /* Tailwind class `mt-2` */
      width:' 100%', /* Tailwind class `w-full` */
      borderRadius: '0.175rem', /* Tailwind class `rounded` */
      
    }),
    
  };
  const navigate = useNavigate();
  const updateProfileSuccessToast = () =>
    toast.success("updated successfully", {
      duration: 5000
    });
  const updateProfileErrorToast = () => toast.error("Profile can't update", {
    duration: 5000
  });
    const useAxios = useAxiosPublic();
    const param = useParams();

    const id = param.id;
    const handleUpdate =  (e) => {
        e.preventDefault();
        const form = e.target;
        const batchTitle = form.batchTitle.value;
        const classTime = form.classTime.value;
        const studentClass = form.studentClass.value;
        const batchMonthlyFee = Number(form.batchMonthlyFee.value);
        const batchModelTestFee= Number(form.batchModelTestFee.value);
        const classDay = form.classDay.value;
        const startDate = form.startDate.value;
        const status = form.status.value;
        const formInfo = {status ,classTime, batchTitle,batchMonthlyFee,batchModelTestFee, studentClass, classDay, startDate}
        //(formInfo);
        useAxios.patch(`/batches/${id}`, formInfo)
        .then(res => {
            
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "updated Successfully",
              showConfirmButton: false,
              timer: 1500
            });
            navigate("/dashboard/list-of-batch")
        })
    }
    return (
      <div className="bg-background-gradient p-5 text-black" >
      <div className=" bg-white p-6 shadow-custom-backend rounded-lg">
              <div className="flex justify-between gap-2 items-center">
                  <h1 className="font-bold lg:text-3xl ">Batch Information</h1>
                  <Link to="/dashboard/list-of-batch" className="  bg-button-gradient-backend hover:border-[#007BFF] duration-500 transition-all hover:bg-[#007BFF] border-2 text-white  rounded lg:px-5 lg:py-2  text-[12px] lg:text-base p-1">Batch List</Link>
              </div>
              <hr className="border w-full mx-auto my-5" />
              <form onSubmit={handleUpdate} className=" p-6">
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
                  
                  <div className=" w-full mt-2">
        <label
          className="text-[16px] font-medium text-black w-full"
        >
        Batch Title
        </label>
        <input
          type="text"
          name="batchTitle"
          readOnly
          defaultValue={data?.batchTitle}
          placeholder="GD-2247"
          className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E]"
        />
      </div>
                  <div className=" w-full mt-2">
        <label
          className="text-[16px] font-medium text-black w-full"
        >
      Class Time
        </label>
        <input
          type="text"
          name="classTime"
          defaultValue={data?.classTime}
          placeholder="বিকাল ০৪:০০ - ০৫:৩০ টা"
          className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E]"
        />
      </div>
      <div className="mt-2">
                 <label
                className="text-[16px] font-medium text-black w-full "
              >
             Class
              </label>
                        <div className="flex flex-col sm:flex-row gap-8 items-center  mb-8">
                  
           <select id="dropdown" name="studentClass" defaultValue={data?.studentClass} className="block border-[1px]  p-1  lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] font-medium outline-none  " required>
        
           <option value="সপ্তম">সপ্তম</option>
                   <option value="অষ্টম">অষ্টম</option>
                   <option value="নবম">নবম</option>
                   <option value="দশম">দশম</option>
                   <option value="একাদশ - দ্বাদশ">একাদশ - দ্বাদশ</option>
  </select>
           </div>
                 </div>
                  <div className=" w-full mt-2">
        <label
          className="text-[16px] font-medium text-black w-full"
        >
      Class day
        </label>
        <input
          type="text"
          name="classDay"
         placeholder="শনি,সোম, বুধ" 
         defaultValue={data?.classDay}
          className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E]"
        />
      </div>
                  <div className=" w-full mt-2">
        <label
          className="text-[16px] font-medium text-black w-full"
        >
      Monthly fee
        </label>
        <input
          type="number"
          name="batchMonthlyFee"
         placeholder="1000" 
         defaultValue={data?.batchMonthlyFee}
          className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E]"
        />
      </div>
                  <div className=" w-full mt-2">
        <label
          className="text-[16px] font-medium text-black w-full"
        >
      Model test fee
        </label>
        <input
          type="number"
          name="batchModelTestFee"
         placeholder="200" 
         defaultValue={data?.batchModelTestFee}
          className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E]"
        />
      </div>
                  <div className=" w-full mt-2">
        <label
          className="text-[16px] font-medium text-black w-full"
        >
      Starting Date
        </label>
        <input
          type="date"
          name="startDate"
          placeholder="শনিবার ৩০ মে"
          defaultValue={data?.startDate}
          className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E]"
        />
      </div>

        <div className="mt-2">
               <label
              className="text-[16px] font-medium text-black w-full "
            >
            Status
            </label>
                      <div className="flex flex-col sm:flex-row gap-8 items-center ">
                
         <select id="dropdown2"  defaultValue={data?.status} name="status"  placeholder="Ongoing" className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] text-black" >
         <option >...</option> 
                 <option value="Ongoing">Ongoing</option>
                 <option value="Pending">Pending</option>
                 <option value="Closed">Closed</option>
                 
</select>
         </div>
               </div>
                  </div>
                  
   

      <hr className="border w-full mx-auto my-5" />

      <div className="flex gap-5 items-center">
      <button 
type="submit" 
className={`rounded px-5 py-2 hover:border-[#007BFF] duration-500 transition-all hover:bg-[#007BFF] border-2 flex gap-2  bg-button-gradient-backend text-white items-center btn  w-fit  my-5 ${loadingButton ? 'opacity-50 cursor-not-allowed bg-[#1486DB] disabled:[#1486DB]' : 'bg-[#1486DB] disabled:[#1486DB]'}`} 
//   disabled={loadingButton}
>
{loadingButton ? "Save..." : "Save"} <FaRegSave />
</button>
          <button className=" rounded bg-[#6C757D] hover:bg-slate-600 duration-500 transition-all text-white px-5 py-2 ">Reset</button>
      </div>
                  </form>
              </div>
             
                  <Toaster />
      </div>
         
    );
};

export default BatchEdit;