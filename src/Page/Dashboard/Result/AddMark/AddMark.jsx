import {  useState } from "react";
import { useLoaderData } from "react-router-dom";
import useStudentClassFilter from "../../../../Hock/useStudentClassFilter";




const AddMark = () => {
    const [data , setData] = useState({});
    const [marks , setMarks] = useState([]);
 
    const test = useLoaderData()
 const studentClass = test.testClass ;
    const {students} = useStudentClassFilter(studentClass)
    const mark = [...marks]
 console.log(mark);
    

    const handleInputChange = (index , studentId, value) => {
        setMarks(prevMarks => {
            const updatedMarks = prevMarks ? [...prevMarks] : [];
            console.log(updatedMarks);
            // Create a copy of the previous marks array or initialize as empty array
            updatedMarks[index] = {
                studentId: studentId,
                marks: value
            };
            return updatedMarks;
        });
    };
    
   
    return (
        <div>
            addMArk
            {
          <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-5 justify-center">
          {
        students?.map((student , index) => <div key={student?._id}>
                         <div className="card lg:w-80 bg-base-100 shadow-xl">
<figure><img src="https://i.postimg.cc/d1r3c0FG/Whats-App-Image-2023-12-19-at-4-48-51-AM.jpg" alt="Shoes" className="h-44" /></figure>
<div className="card-body text-center">
  <h2 className="font-bold text-xl">{student?.name}</h2>
  <p>Class : {student?.studentClass}</p>
  <p>Phone Number : {student?.parentsPhoneNumber}</p>
  <input className="input outline-2 border-2 border-black outline-lime-700" type="text" onChange={(e) => handleInputChange(index,student?._id, e.target.value)} />
</div>
</div>
              </div> ) 
             
          }
         
      </div>
      
        }
        <button>Submit </button>
        </div>
    );
};

export default AddMark;