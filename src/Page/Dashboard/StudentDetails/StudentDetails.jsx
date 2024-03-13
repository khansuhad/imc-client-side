import { Link, useParams } from "react-router-dom";
import STable from "./Table/STable";
import useStudentDetails from "../../../Hock/useStudentDetails";

const StudentDetails = () => {
    const params = useParams();
    const studentId = params?.studentId ;
    console.log(studentId);
   const {studentDetails} = useStudentDetails(studentId);
   
    return (
        <div>
                   <h1 className="text-3xl font-semibold text-center my-20">{studentDetails?.name}&rsquo;s Information </h1>
            <div className="lg:h-30vh flex justify-between w-[90%]   mx-auto items-center ">
                <div >
                    <h1 className="text-xl font-semibold my-2">Name : {studentDetails?.name}</h1>
                    <h1 className="text-xl font-medium  my-2">Id : 243025</h1>
                    <h1 className="text-xl font-medium  my-2">Phone Number : {studentDetails?.parentsPhoneNumber} </h1>
                    <h1 className="text-xl font-medium  my-2">Class  : {studentDetails?.studentClass} {studentDetails?.batch}</h1>
                    <h1 className="text-xl font-medium  my-2">Parent&rsquo;s Name  : {studentDetails?.parentsName}</h1>
                    <h1 className="text-xl font-medium  my-2">Admission Date  : {studentDetails?.admissionDate} </h1>
                    <div className="flex gap-5 my-2 ">
                    <Link to={`/dashboard/updateStudentDetails/${studentDetails?._id}`} className="btn btn-primary">Edit Profile</Link>
                    <Link to="/dashboard/addpayment/suhadahmodkhan" className="btn btn-primary">Add Payment</Link>
                </div>
                </div>
             
                   <div >
                    <figure >
                    <img className="w-40 h-48 " src="https://i.postimg.cc/8z2QBq2P/Whats-App-Image-2023-12-19-at-4-48-51-AM.jpg" alt="" />
                    </figure>
                   </div>
                
            </div>
            <hr className="my-10 border-1 border-slate-800 text-xl w-[90%] mx-auto" />


            <div className="overflow-x-auto p-5">
              
                <STable/>
            </div>
        </div>
    );
};

export default StudentDetails;