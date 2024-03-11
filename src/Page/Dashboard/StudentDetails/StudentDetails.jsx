import { Link } from "react-router-dom";
import STable from "./Table/STable";

const StudentDetails = () => {
    return (
        <div>
                   <h1 className="text-3xl font-semibold text-center my-20">Suahd ahmod khan&rsquo;s Information </h1>
            <div className="lg:h-30vh flex justify-between w-[90%]   mx-auto items-center ">
                <div >
                    <h1 className="text-xl font-semibold my-2">Name : Suhad Ahmod khan</h1>
                    <h1 className="text-xl font-medium  my-2">Id : 243025</h1>
                    <h1 className="text-xl font-medium  my-2">Phone Number : 01646556476 </h1>
                    <h1 className="text-xl font-medium  my-2">Class  : Nine 2024</h1>
                    <h1 className="text-xl font-medium  my-2">Parent&rsquo;s Name  : Abdul hafiz khan</h1>
                    <h1 className="text-xl font-medium  my-2">Admission Date  : 12-06-2024 </h1>
                    <div className="flex gap-5 my-2 ">
                    <Link to="/dashboard/updateStudentDetails/suhadahmodkhan" className="btn btn-primary">Edit Profile</Link>
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