import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaRegSave } from "react-icons/fa";
import { useState } from "react";


const AddCategory = () => {
  const navigate = useNavigate();
  const updateProfileSuccessToast = () =>
    toast.success("created successfully");
  const [loadingButton , setLoadingButton] = useState(false)
  const updateProfileErrorToast = () => toast.error("Profile can't update");
    const useAXios = useAxiosSecure();
    const handleSubmit = (e) =>{
        e.preventDefault();
        setLoadingButton(true)
        const form = e.target;
        const category = form.category.value;
        const formInfo = {category}
        useAXios.post("/transectionCategories" , formInfo)
      .then(res => {
        updateProfileSuccessToast();
        navigate("/dashboard/transectionEntry")
        
      })
    }
    return (
        <form onSubmit={handleSubmit} className="bg-background-gradient min-h-screen p-5 text-black" >
                <div className=" bg-white p-6 ">
                <div className=" w-full mt-2">
              <label
                className="text-[16px] font-medium text-black w-full"
              >
            Category
              </label>
              <input
                type="text"
                name="category"
                required
                className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E]"
              />
            </div>
            <hr className="border-2 my-5 w-full mx-auto " />
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
                </div>
                <Toaster /> </form>
    );
};

export default AddCategory;