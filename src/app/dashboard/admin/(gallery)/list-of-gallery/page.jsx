"use client"
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import {fetchGallery } from "../../../../../redux/features/gallery/gallerySlice/gallerySlice"
import { MdOutlineDelete } from "react-icons/md";
import galleryCss from "./list-of-gallery.module.css"

const ListOfGallery = () => {
    const deleteProfileSuccessToast = () =>
    toast.success("Deleted successfully", {
        duration: 5000
      });
  const updateProfileErrorToast = () => toast.error("Profile can't update");
    const useAxios = useAxiosPublic();

   const dispatch = useDispatch();
   const { gallery, status } = useSelector((state) => state.gallery);

   useEffect(() => {
     dispatch(fetchGallery({ axiosInstance :useAxios })); // Fetch students whenever the searchTerm changes
   }, [dispatch, useAxios]);
   const refetchGallery = () => {
     dispatch(fetchGallery({ axiosInstance :useAxios })); // Trigger refetch by dispatching fetchCourses
   };
   const handleDelete = (id) => {
    const result = Swal.fire({
     title: "Do you want to delete the changes?",
     showCancelButton: true,
     confirmButtonText: "Delete",
     customClass: {
        confirmButton: 'custom-confirm-btn',
        cancelButton: 'custom-cancel-btn'
      },
   }).then((result) => {
     /* Read more about isConfirmed, isDenied below */
     if (result.isConfirmed) {
        useAxios.delete(`/gallery/${id}`)
        .then(res => {
            
            deleteProfileSuccessToast();
            refetchGallery();
        })
     } 
   });
    
  }

    return (
        <div className="bg-background-gradient p-5 min-h-screen">
            
          <div className="bg-white p-5  space-y-10">
          <div className="flex lg:flex-row gap-5 flex-col items-center justify-between lg:px-10 text-black font-semibold ">
                <div>
                    <h3 className="font-bold lg:text-3xl ">  Gallery </h3>
                </div>


            </div>
           
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 mt-5">

{gallery.map((gallery, index) => (
   <div key={index}  className={`p-3 bg-white course-entry-shadow w-fit rounded-lg   ${galleryCss['software-hover']} cursor-pointer`}>
  <div  key={index} className="relative items-center bg-white w-fit ">
    
    <img src={gallery.imageUrl} alt="" className="aspect-square relative" />
    <p>{gallery.description}</p>
    <div>
        
                          <MdOutlineDelete onClick={() =>handleDelete(gallery?._id)} className={`cursor-pointer 
                            ${galleryCss['software-delete']}   hidden bg-[red] text-white mt-2 py-3 aspect-square w-full h-full absolute rounded-lg bottom-0 right-0 z-10`}></MdOutlineDelete>
                          </div>
  </div>
 </div>

))}

</div>
          </div>
            <Toaster />
          
        </div>
    );
};

export default ListOfGallery;