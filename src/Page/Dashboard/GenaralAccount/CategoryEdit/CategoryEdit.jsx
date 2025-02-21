import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const CategoryEdit = () => {
  const navigate = useNavigate();
  const updateProfileSuccessToast = () =>
    toast.success("updated successfully");
  const updateProfileErrorToast = () => toast.error("Profile can't update");
    const useAXios = useAxiosSecure();
    const param = useParams();

    const id = param.id;
    const handleSubmit = (e) =>{
        e.preventDefault();
        const form = e.target;
        const category = form.category.value;
        const formInfo = {category}
        useAXios.patch(`/transectionCategories/${id}` , formInfo)
      .then(res => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "updated Successfully",
          showConfirmButton: false,
          timer: 1500
        });
        navigate("/dashboard/transectionList")
        
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
            <button type="submit" className=" rounded px-5 py-2 hover:border-[#007BFF] duration-500 transition-all hover:bg-[#007BFF] border-2 flex gap-2  bg-button-gradient-backend text-white items-center">Save <FaRegSave /></button>
            <button className=" rounded bg-[#6C757D] hover:bg-slate-600 duration-500 transition-all text-white px-5 py-2 ">Reset</button>
        </div>
        </div>
        <Toaster />
</form>
    );
};

export default CategoryEdit;