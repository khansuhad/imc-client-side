import { Link } from "react-router-dom";
import useAllStudents from "../../../Hock/useAllStudent";



const AllStudents = () => {
  const {allStudents} = useAllStudents();
  console.log(allStudents);
    const AllStudents = 10 ;
    const students = [...Array(AllStudents).keys()];
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
                name="name"
                required
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
                required
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
                name="name"
                required
                className="block border border-[#5E1675] rounded-lg py-2 px-2 mt-2 w-8/12"
              />
            </div>
        </div>
</div>

<hr className="my-10 border-1 border-slate-800 text-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-5 justify-center">
            {
                students?.map((student , index) => <Link to="/dashboard/allstudent/suhadahmodkhan" key={index}>
                           <div className="card lg:w-80 bg-base-100 shadow-xl">
  <figure><img src="https://i.postimg.cc/8z2QBq2P/Whats-App-Image-2023-12-19-at-4-48-51-AM.jpg" alt="Shoes" className="h-44" /></figure>
  <div className="card-body text-center">
    <h2 className="font-bold text-xl">Suhad ahmod khan {index}</h2>
    <p>Class : 9</p>
    <p>Phone Number : 01646556476</p>
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