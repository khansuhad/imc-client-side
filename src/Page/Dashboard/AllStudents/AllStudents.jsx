import { Link } from "react-router-dom";
import useAllStudents from "../../../Hock/useAllStudent";
import { useState } from "react";
import useStudentFilter from "../../../Hock/useStudentFilter";



const AllStudents = () => {
  const {allStudents} = useAllStudents();
  const [filter, setFilter] = useState({id: '', name: '', studentClass: '' });
  // console.log(filter);
  const { students, isLoadingStudents, isPendingStudents, refetchStudents } = useStudentFilter({ filter });
  console.log(students);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilter({ ...filter, [name]: value });
  };
  const handleFilter = () => {
    refetchStudents(); // Refetch data with updated filter parameters
  };

    return (
       <div className="bg-[#EEEEEE]">
         <div className=" w-[95%] mx-auto">
         <h1 className="text-3xl font-semibold text-center my-10"> All Student </h1>
<div className="my-4">
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
                value={filter.id} onChange={handleInputChange}
                className="block border border-[#5E1675] rounded-lg py-2 px-2 mt-2 w-8/12"
              />
            </div>
            <div className="  flex items-center justify-center">
              <label
                className="text-xl text-black mr-2 w-20"
              >
              NAME:
              </label>
              <input
                type="text"
                name="name"
                value={filter.name} onChange={handleInputChange}
                className="block border border-[#5E1675] rounded-lg py-2 px-2 mt-2 w-8/12"
              />
            </div>
            <div className="  flex items-center justify-center">
              <label
                className="text-xl text-black mr-2 w-20"
              >
               CLASS:
              </label>
              <input
                type="text"
                name="studentClass"
                value={filter.studentClass} onChange={handleInputChange}
                className="block border border-[#5E1675] rounded-lg py-2 px-2 mt-2 w-8/12"
              />
            </div>
        </div>
        <div className="w-[50%] mx-auto">
          <button type="submit" onClick={handleFilter} className="btn btn-primary w-full">Filter</button>
        </div>
</div>

<hr className="my-10 border-1 border-slate-800 text-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-5 justify-center">
            {
                students?.length === 0 ? allStudents?.map((student) => <Link to={`/dashboard/student/${student._id}`} key={student?._id}>
                           <div className="card lg:w-80 bg-base-100 shadow-xl">
  <figure><img src="https://i.postimg.cc/d1r3c0FG/Whats-App-Image-2023-12-19-at-4-48-51-AM.jpg" alt="Shoes" className="h-44" /></figure>
  <div className="card-body text-center">
    <h2 className="font-bold text-xl">{student?.name}</h2>
    <p>Class : {student?.studentClass}</p>
    <p>Phone Number : {student?.parentsPhoneNumber}</p>
  </div>
</div>
                </Link> ):
                students?.map((student) => <Link to={`/dashboard/student/${student._id}`} key={student?._id}>
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