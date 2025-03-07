"use client"
import toast from "react-hot-toast";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSmsHistory } from "../../../../../redux/features/sms/smsSlice/smsSlice";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";




const SmsHistory = () => {
    const deleteProfileSuccessToast = () =>
        toast.success("Deleted successfully", {
            duration: 5000
          });
    // //(info);

        const useAxios = useAxiosPublic()
        const dispatch = useDispatch();
        const { smsHistory, status } = useSelector((state) => state.sms);
    console.log(smsHistory);
        useEffect(() => {
          dispatch(fetchSmsHistory(useAxios)); // Fetch students whenever the searchTerm changes
        }, [dispatch,useAxios]);

 
    return (
        <div className="bg-background-gradient p-5 min-h-screen">
           
           <div className="bg-white p-5  space-y-10">
           <div className="flex lg:flex-row flex-col items-center   justify-between lg:px-10 text-black font-semibold p-5 lg:my-10">
                <div>
                    <h3 className="font-bold lg:text-3xl mb-2">Sms List</h3>
                </div>

            
            </div>
        
            <div className="overflow-x-auto lg:px-10">
                <table className="table table-xs w-full table-auto">
                    <thead className=" lg:text-2xl bg-button-gradient-backend text-white">
                        <tr>
                            <th>Reg No.</th>
                            <th>Name</th>
                            <th>Batch</th>
                            <th>Mobile</th>
                            <th>Date</th>
                            <th>Message Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {smsHistory.map((data, index) => (
                            <tr className="text-black  bg-white shadow-custom-backend rounded-lg my-10 " key={index}>
                                <td className="lg:text-xl p-5">{data?.registrationNo}</td>
                                <td className="lg:text-xl p-5">{data.nickname}</td>
                                <td className="lg:text-xl p-5">{data.batch}</td>
                                <td className="lg:text-xl p-5">{data.mobile}</td>
                                <td className="lg:text-xl p-5">{moment(data.createdAt).format("DD MMM YYYY")}</td>
                                <td className="lg:text-xl p-5">{data.messageType}</td>
    


                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
           </div>
         
        </div>
    );
};

export default SmsHistory;