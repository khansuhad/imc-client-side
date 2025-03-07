"use client"
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";

import { fetchNotices } from "../../redux/features/notice/noticeSlice/noticeSlice";
import useAxiosPublic from "../../hooks/useAxiosPublic";




const Notices = () => {
    const deleteProfileSuccessToast = () =>
    toast.success("Deleted successfully", {
        duration: 5000
      });
  const updateProfileErrorToast = () => toast.error("Profile can't update");
    const useAxios = useAxiosPublic();

   const dispatch = useDispatch();
   const { notices, status } = useSelector((state) => state.notices);

   useEffect(() => {
     dispatch(fetchNotices({ axiosInstance :useAxios })); // Fetch students whenever the searchTerm changes
   }, [dispatch, useAxios]);
   const refetchNotices = () => {
     dispatch(fetchNotices({ axiosInstance :useAxios })); // Trigger refetch by dispatching fetchCourses
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
        useAxios.delete(`/notices/${id}`)
        .then(res => {
            
            deleteProfileSuccessToast();
            refetchNotices();
        })
     } 
   });
    
  }

    return (
        <div className=" p-5 min-h-screen lg:space-y-20 space-y-10 2xl:px-[300px]">
            
          <div className="bg-white p-5  space-y-10">
          <div className="flex lg:flex-row gap-5 flex-col items-center justify-between lg:px-10 text-black font-semibold ">
                <div>
                    <h3 className="font-bold lg:text-3xl ">  Notice List</h3>
                </div>


            </div>
           
            <div className="overflow-x-auto lg:px-10">
                <table className="table table-xs w-full table-auto ">
                    <thead className=" lg:text-2xl bg-button-gradient-backend text-white">
                        <tr >
                            <th>SL No</th>
                            <th>Notice Title</th>

                            <th>Notice Date</th>
                            <th>File</th>

                        </tr>
                    </thead>
                    <tbody>
                        {notices.map((data, index) => (
                            <tr className="text-black  bg-white shadow-custom-backend rounded-lg my-10" key={index}>
                                <td className="lg:text-xl py-5">{index < 10 && '0'}{index + 1}</td>
                                <td className="lg:text-xl py-5">{data.noticeTitle}</td>
                                <td className="lg:text-xl py-5">{moment(data.noticeDate).format("DD MMM YYYY")}</td>
                                <td className="lg:text-xl py-5"><a href={data.pdfUrl} className="underline" target="_blank">Link</a></td>



                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
            <Toaster />
          
        </div>
    );
};

export default Notices;