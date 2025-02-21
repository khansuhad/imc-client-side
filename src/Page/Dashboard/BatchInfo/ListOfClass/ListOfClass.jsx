
import { Toaster } from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import useListOfClasses from "../../../../Hock/ListOfClasses";



const ListOfClasses = () => {


  const {listOfClasses} = useListOfClasses()

    return (
        <div className="bg-background-gradient p-5 min-h-screen">
            
          <div className="bg-white p-5  space-y-10">
          <div className="flex lg:flex-row gap-5 flex-col items-center justify-between lg:px-10 text-black font-semibold ">
                <div>
                    <h3 className="font-bold lg:text-3xl ">  Class List</h3>
                </div>
            </div>
           
            <div className="overflow-x-auto lg:px-10">
                <table className="table table-xs ">
                    <thead className=" lg:text-2xl bg-button-gradient-backend text-white">
                        <tr >
                            <th>SL No</th>
                            <th>Class Title</th>
                            <th>Total Batch</th>
                            <th>Total Students</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOfClasses.map((data, index) => (
                            <tr className="text-black  bg-white shadow-custom-backend rounded-lg my-10" key={index}>
                                <td className="lg:text-xl py-5">{index < 10 && '0'}{index + 1}</td>
                                <td className="lg:text-xl py-5">{data.studentClass}</td>
                                <td className="lg:text-xl py-5">{data?.totalBatches}</td>
 <td className="lg:text-xl py-5 text-center">{data?.totalStudents}</td>
                                <td className="lg:text-xl py-5 flex items-start justify-center gap-5">
                                    <Link to={`/dashboard/class-wise-batch/${data?.studentClass}`}><FaEye className="cursor-pointer bg-white shadow-custom-backend p-2 rounded-lg hover:bg-green-600 transition-all duration-300 text-[40px]"></FaEye></Link>
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

export default ListOfClasses;