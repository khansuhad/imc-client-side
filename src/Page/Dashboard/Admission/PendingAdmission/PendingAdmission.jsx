import { FaPlusCircle } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import usePendingAdmissions from "../../../../Hooks/usePendingAdmissions";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const PendingAdmission = () => {
 const {pendingAdmissions , refetchPendingAdmissions} = usePendingAdmissions()
 const useAxios = useAxiosSecure();
 const handleDelete = (id) => {
    useAxios.delete(`/pending-admissions/${id}`)
    .then(res => { 
        refetchPendingAdmissions();})
   }
    return (
        <div className="bg-background-gradient p-5 min-h-screen">
       
          
        
          <div className="bg-white p-5  space-y-10">
          <div  className="flex lg:flex-row flex-col items-center   justify-between lg:px-10 text-black font-semibold p-5 lg:my-10">
                <div>
                    <h3 className="font-bold lg:text-3xl mb-2">  Pending Admission </h3>
                </div>

                <div className="flex flex-col lg:flex-row gap-5 items-center">
                <div className="">
                <label className="input input-bordered flex items-center justify-end gap-2 ">
                    <input type="text" className="grow input  input-bordered " placeholder="Search" />
                   
                </label>
            </div>
                    <Link to="/dashboard/admission" className="btn bg-button-gradient-backend text-white"><FaPlusCircle></FaPlusCircle>Add Admission</Link>
                </div>
            </div>
      
            <div className="overflow-x-auto lg:px-10">
                <table className="table table-xs ">
                    <thead className=" lg:text-2xl bg-button-gradient-backend text-white">
                        <tr>
                            <th></th>
                            <th>Date</th>
                            <th>Student name</th>
                            <th>course</th>
                            <th>Mobile</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingAdmissions.map((data, index) => (
                            <tr className="text-black  bg-white shadow-custom-backend rounded-lg my-10 " key={index}>
                                <td className="lg:text-xl py-5">{index + 1}</td>
                                <td className="lg:text-xl py-5">{data.applyDate}</td>
                                <td className="lg:text-xl py-5">{data.name}</td>
                                <td className="lg:text-xl py-5">{data.course}</td>
                                <td className="lg:text-xl py-5">+{data.mobile}</td>
                                <td className="lg:text-xl py-5 flex gap-5 justify-center">
                                    <Link to={`/dashboard/admissions/${data?._id}`} className="px-2 py-1 bg-green-500 hover:bg-green-700 transition-all duration-300 text-white rounded">Approve</Link>
                                    <button onClick={() => handleDelete(data?._id)} className="px-2 py-1 bg-red-500 hover:bg-red-700 transition-all duration-300 text-white rounded">Reject</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
          
           
        </div>
    );
};

export default PendingAdmission;