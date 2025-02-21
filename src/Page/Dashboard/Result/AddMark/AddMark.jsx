import {  useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import useStudentClassFilter from "../../../../Hock/useStudentClassFilter";




const AddMark = () => {
    const [data , setData] = useState({});
    const [marks , setMarks] = useState([]);
 
    const test = useLoaderData()
    console.log(test);
//  const studentClass = test.testClass ;
//     const {students} = useStudentClassFilter(studentClass)
//     const mark = [...marks]
//  console.log(mark);
    

    // const handleInputChange = (index , studentId,testId, value) => {
    //     setMarks(prevMarks => {
    //         const updatedMarks = prevMarks ? [...prevMarks] : [];
            
    //         // Create a copy of the previous marks array or initialize as empty array
    //         updatedMarks[index] = {
    //             studentId: studentId,
    //             marks: value,
    //             testId: testId
    //         };
    //         return updatedMarks;
    //     });
    // };
    
   
    return (
      <>
      
      <div className="w-[90%] mx-auto">
      <table className="table border ">
{/* head */}
<thead className="md:text-xl font-bold text-white border-2 bg-slate-700 dark:text-white">
<tr className="text-center">
<th>Name</th>
<th>School</th>
<th>parents Name</th>
<th>Mark</th>
<th>Action</th>
</tr>
</thead>
<tbody className=" ">
{
test?.data?.map((student , index) =>   <tr className={` ${index % 2 ==! 0 ?  'bg-gray-100 text-center' : 'bg-white text-center'} `} key={student?._id}>
<td>
<Link to={`/dashboard/add-mark/${student?._id}`} className="underline">{student?.name}</Link>
</td>
<td>
{student?.school}
</td>
<td>{student?.parentsName}</td>
<td><input type="number" className="border border-black" /></td>
<td></td>


</tr>)
}

</tbody>
</table>

</div>
      
      </>
    );
};

export default AddMark;