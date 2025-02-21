import { useState } from "react";
import useAxiosPublic from "../../../../Hock/useAxiosPublic";
import useAllTests from "../../../../Hock/useAllTests";


const CreateTest = () => {
    const useAxios = useAxiosPublic();
    const [lastData , setLastData] = useState({})
    console.log(lastData);
    const [allStudentData , setAllStudentData] = useState({})
    console.log(allStudentData);
    const [marksData , setMarksData] = useState([])
    console.log(marksData);
    const {test ,refetchtests} = useAllTests()
    const handleCreateTest = (e) =>{
        e.preventDefault();
        const form = e.target ;
        const testName = form.testName.value ;
        const date = form.date.value ;
        const subjectName = form.subjectName.value ;
        const testClass = form.testClass.value ;
const testInfo = { testClass , testName , date , subjectName} ;
      console.log(testInfo);
      useAxios.post("/createTests" , testInfo)
      .then(res => {
        refetchtests();
        console.log(res?.data);
        useAxios.get("/tests/lastindex")
        .then(res => {  
          console.log(res?.data);
          setLastData(res?.data)
          useAxios.get(`/createTests/allStudents/${lastData?._id}`)
          .then(res=> {
            console.log(res?.data);
              setAllStudentData(res?.data)
              let addMarks = []
              console.log(addMarks);
              for(var i = 0 ; i < allStudentData?.students?.length ; i++) {
                    const info = {
                      studentId : allStudentData?.students[i]?._id,
                      mark : 0
    
                    };
                    addMarks.push(info)
                    
              }
                setMarksData(addMarks)
                console.log(marksData);
                useAxios.post("/test-marks", {marksData : marksData , testId : allStudentData?.testInfo?._id,})
                .then(res => {
                  console.log(res?.data);
                })
          })
        })
      })

   
     
       
    }
    return (
        <div>
        <h1 className="text-3xl font-semibold text-center mt-10">Create Test </h1>
        <div className="lg:px-12 px-4 mt-20">
  <div className="md:w-2/3 mx-auto mb-20">
    <form onSubmit={handleCreateTest}>
      <div className="flex flex-col lg:flex-row gap-8 items-center mb-8">
        <div className="lg:w-1/2 w-full">
          <label
            className="text-base text-black w-full"
          >
        Test Name
          </label>
          <input
            type="text"
            name="testName"
            required
            className="block border border-[#5E1675] rounded-lg py-2 px-2 mt-2 w-full"
          />
        </div>
        <div className="lg:w-1/2 w-full">
          <label
  
            className="text-base text-black w-full"
          >
           Subject Name
          </label>
          <input
            type="text"
  required
            name="subjectName"
            className="block border border-[#5E1675] px-2 rounded-lg py-2 mt-2 w-full"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 items-center mb-8">
        <div className="lg:w-1/2 w-full">
          <label
          
            className="text-base text-black w-full"
          >
         Class
          </label>
          <input
            type="number"
       required
            name="testClass"
            className="block border border-[#5E1675] px-2 rounded-lg py-2 mt-2 w-full"
          />
        </div>
        <div className="lg:w-1/2 w-full">
          <label
          
            className="text-base text-black w-full"
          >
        Date
          </label>
          <input
            type="date"
      
            name="date"
            className="block border border-[#5E1675] px-2 rounded-lg py-2 mt-2 w-full"
          />
        </div>
      </div>
   
      <div className="w-36 mx-auto border rounded-lg">
      <input type="submit" value="Submit" className="btn-primary py-3 bg-primary px-8 text-white font-medium rounded-b-md cursor-pointer inline-block w-full "/>
      </div>
    </form>
  </div>
  
</div>

    </div>
    );
};

export default CreateTest;