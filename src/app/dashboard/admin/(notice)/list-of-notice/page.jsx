"use client"
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { fetchNotices } from "../../../../../redux/features/notice/noticeSlice/noticeSlice";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";



const ListOfNotice = () => {
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
        <div className="bg-background-gradient p-5 min-h-screen">
            
          <div className="bg-white p-5  space-y-10">
          <div className="flex lg:flex-row gap-5 flex-col items-center justify-between lg:px-10 text-black font-semibold ">
                <div>
                    <h3 className="font-bold lg:text-3xl ">  Notice List</h3>
                </div>


            </div>
           
            <div className="overflow-x-auto lg:px-10">
                <table className="table table-xs w-full table-auto ">
                    <thead className=" lg:text-2xl bg-button-gradient-backend text-white w-screen">
                        <tr >
                            <th>SL No</th>
                            <th>Notice Title</th>

                            <th>Notice Date</th>
                            <th>File</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notices.map((data, index) => (
                            <tr className="text-black  bg-white shadow-custom-backend rounded-lg my-10" key={index}>
                                <td className="lg:text-xl text-center p-5">{index < 10 && '0'}{index + 1}</td>
                                <td className="lg:text-xl text-center p-5">{data.noticeTitle}</td>
                                <td className="lg:text-xl text-center p-5">{moment(data.noticeDate).format("DD MMM YYYY")}</td>
                                <td className="lg:text-xl text-center p-5"><a href={data.pdfUrl} className="underline" target="_blank">Link</a></td>


                                <td className="lg:text-xl p-5 flex items-start justify-center gap-5">
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleDelete(data._id)} className="cursor-pointer bg-white shadow-custom-backend p-2 rounded-lg hover:bg-red-600 transition-all duration-300" width="40" height="40" viewBox="0 0 32 32" fill="none">
<rect width="32" height="32" fill="white"/>
<path d="M13.3333 6.66667H18.6666C18.6666 5.95942 18.3857 5.28115 17.8856 4.78105C17.3855 4.28095 16.7072 4 16 4C15.2927 4 14.6144 4.28095 14.1143 4.78105C13.6142 5.28115 13.3333 5.95942 13.3333 6.66667ZM11.3333 6.66667C11.3333 6.05383 11.454 5.447 11.6885 4.88081C11.923 4.31463 12.2668 3.80018 12.7001 3.36684C13.1335 2.9335 13.6479 2.58975 14.2141 2.35523C14.7803 2.12071 15.3871 2 16 2C16.6128 2 17.2196 2.12071 17.7858 2.35523C18.352 2.58975 18.8665 2.9335 19.2998 3.36684C19.7331 3.80018 20.0769 4.31463 20.3114 4.88081C20.5459 5.447 20.6666 6.05383 20.6666 6.66667h48.3333C28.5985 6.66667 28.8529 6.77202 29.0404 6.95956C29.2279 7.1471 29.3333 7.40145 29.3333 7.66667C29.3333 7.93188 29.2279 8.18624 29.0404 8.37377C28.8529 8.56131 28.5985 8.66667 28.3333 8.66667h46.5733L25.0133 24.8147C24.8936 26.052 24.3174 27.2003 23.3969 28.0358C22.4764 28.8712 21.2777 29.3338 20.0346 29.3333H11.9653C10.7224 29.3335 9.52409 28.8707 8.60389 28.0353C7.68369 27.1999 7.1076 26.0517 6.98796 24.8147L5.42663 8.66667H3.66663C3.40141 8.66667 3.14706 8.56131 2.95952 8.37377C2.77198 8.18624 2.66663 7.93188 2.66663 7.66667C2.66663 7.40145 2.77198 7.1471 2.95952 6.95956C3.14706 6.77202 3.40141 6.66667 3.66663 6.66667H11.3333ZM14 13C14 12.7348 13.8946 12.4804 13.7071 12.2929C13.5195 12.1054 13.2652 12 13 12C12.7347 12 12.4804 12.1054 12.2929 12.2929C12.1053 12.4804 12 12.7348 12 13V23C12 23.2652 12.1053 23.5196 12.2929 23.7071C12.4804 23.8946 12.7347 24 13 24C13.2652 24 13.5195 23.8946 13.7071 23.7071C13.8946 23.5196 14 23.2652 14 23V13ZM19 12C18.7347 12 18.4804 12.1054 18.2929 12.2929C18.1053 12.4804 18 12.7348 18 13V23C18 23.2652 18.1053 23.5196 18.2929 23.7071C18.4804 23.8946 18.7347 24 19 24C19.2652 24 19.5195 23.8946 19.7071 23.7071C19.8946 23.5196 20 23.2652 20 23V13C20 12.7348 19.8946 12.4804 19.7071 12.2929C19.5195 12.1054 19.2652 12 19 12Z" fill="#1E293B"/>
</svg>
                                   
  
                                </td>
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

export default ListOfNotice;