import { Link } from "react-router-dom";
import useAllStudents from "../../../Hock/useAllStudent";
import { useState } from "react";



const AllStudents = () => {
  const {allStudents} = useAllStudents();
  const [filter, setFilter] = useState({});
  console.log(filter);
 const handleClass = (e) =>{
e.preventDefault();
const form = e.target;
const studentClass = form.studentClass.value;
const name = form.name.value;
const id = form.id.value;
const filter = {studentClass, name , id}
setFilter(filter);
}

    return (
       <div className="bg-[#EEEEEE]">
         <div className=" w-[95%] mx-auto">
         <h1 className="text-3xl font-semibold text-center my-10"> All Student </h1>
<form onSubmit={handleClass} className="my-4">
    <h1 className="font-medium text-2xl text-center ">Filter by :</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-5">
            <div className="  flex items-center justify-center ">
              <label
                className="text-xl text-black mr-2 w-20"
              >
              ID:
              </label>
              <input
                type="text"
                name="id"
                  
                className="block border border-[#5E1675] rounded-lg py-2 px-2 mt-2 w-8/12"
              />
            </div>
            <div className="  flex items-center justify-center">
              <label
                className="text-xl text-black mr-2 w-20"
              >
              Name:
              </label>
              <input
                type="text"
                name="name"
               
                className="block border border-[#5E1675] rounded-lg py-2 px-2 mt-2 w-8/12"
              />
            </div>
            <div className="  flex items-center justify-center">
              <label
                className="text-xl text-black mr-2 w-20"
              >
               Class:
              </label>
              <input
                type="text"
                name="studentClass"
  
                className="block border border-[#5E1675] rounded-lg py-2 px-2 mt-2 w-8/12"
              />
            </div>
        </div>
        <div className="w-[50%] mx-auto">
          <button type="submit"  className="btn btn-primary w-full">Filter</button>
        </div>
</form>

<hr className="my-10 border-1 border-slate-800 text-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-5 justify-center">
            {
                allStudents?.map((student) => <Link to={`/dashboard/student/${student._id}`} key={student?._id}>
                           <div className="card lg:w-80 bg-base-100 shadow-xl">
  <figure><img src="https://i.postimg.cc/d1r3c0FG/Whats-App-Image-2023-12-19-at-4-48-51-AM.jpg" alt="Shoes" className="h-44" /></figure>
  <div className="card-body text-center">
    <h2 className="font-bold text-xl">{student?.name}</h2>
    <p>Class : {student?.studentClass}</p>
    <p>Phone Number : {student?.parentsPhoneNumber}</p>
  </div>
</div>
                </Link> )
            }
        </div>

  
        </div>
       </div>
    );
};

export default AllStudents;