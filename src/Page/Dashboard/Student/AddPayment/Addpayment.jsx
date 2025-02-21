import { useEffect, useState } from "react";
import useAxiosPublic from "../../../../Hock/useAxiosPublic";
import useStudentDetails from "../../../../Hock/useStudentDetails";
import { useLoaderData } from "react-router-dom";
import ReactSelect from "react-select";

const Addpayment = () => {
  const useAxios = useAxiosPublic();
  const data = useLoaderData();
  const {studentDetails} = useStudentDetails(data?._id)
  const [totalAmount , setTotalAmount] = useState(0)
  const [transectionDetails , setTransectionDetails] = useState('')
  console.log(studentDetails);
  const [monthsOptions , setMonthsOptions] = useState([])
  console.log(monthsOptions);
  const [monthsSelectedOption, setMonthsSelectedOption] = useState([]);
  console.log(monthsSelectedOption)
  const handleMonthChange = (selectedOption) => {
    setMonthsSelectedOption(selectedOption)
 console.log(selectedOption);
  };
  useEffect(() => {
    const totalAmount = monthsSelectedOption.length  * 1000 ;
    setTotalAmount(totalAmount)
    const studentsLength = studentDetails?.dueMonth?.length ; 
    console.log(studentsLength);
    const months = []
    
          if(studentsLength > 0) {
            for(let i = 0 ; i <= studentsLength - 1 ; i++)
          {
            let month = { value : `${studentDetails?.dueMonth[i]}` , label : `${studentDetails?.dueMonth[i]}/1000 taka `}
            months.push(month)
          }
          }
          setMonthsOptions(months)
  },[monthsSelectedOption.length , studentDetails?.dueMonth])
  const handleForm = (e) =>{
    e.preventDefault();
    const form = e.target;
    const transectionDetails = form.transectionDetails.value;
    const collection = form.collection.value;
    const totalPayableAmount = form.totalPayableAmount.value;
    const date = form.date.value;
    const receiver = form.receiver.value;
    const sector = monthsSelectedOption ;
    
    const formInfo = {transectionDetails,collection,totalPayableAmount,date,receiver, sector }
    console.log(formInfo);
 
    useAxios.post("/addpayment",formInfo)
    .then(res => {
      console.log(res?.data);
    })

  }
    return (
        <div>
        <h1 className="text-3xl font-semibold text-center mt-10">Add payment </h1>
        <div className="lg:px-12 px-4 mt-20">
  <div className="md:w-2/3 mx-auto mb-20">
    <form onSubmit={handleForm}>
      <div className="flex flex-col lg:flex-row gap-8 items-center mb-8">
        <div className="lg:w-1/2 w-full">
          <label
            className="text-base text-black w-full"
          >
           Transection details
          </label>
          <div className="flex flex-col sm:flex-row gap-8 items-center ">
                  
                  <select id="dropdown1" name="transectionDetails" className="block border-2  p-3 lg:text-[18px] mt-2 w-full rounded-lg border-[#9E9E9E] text-black" onChange={(e) => setTransectionDetails(e.target.value)}>
                  <option selected disabled >Select...</option> 
                          <option value="Monthly Fee">Monthly Fee</option>
                          <option value="Exam Fee">Exam Fee</option>
                         
         </select>
                  </div>
        </div>
    {
      transectionDetails == "Monthly Fee" ?     <div className="lg:w-1/2 w-full">
      <label

        className="text-base text-black w-full"
      >
        Total amount
      </label>
      <input
        type="number"
required
        name="totalPayableAmount"
        value={totalAmount}
        readOnly
        className="block border border-[#5E1675] px-2 rounded-lg py-2 mt-2 w-full"
      />
    </div> :     <div className="lg:w-1/2 w-full">
          <label
  
            className="text-base text-black w-full"
          >
            Total amount
          </label>
          <input
            type="number"
  required
            name="totalPayableAmount"
            
            className="block border border-[#5E1675] px-2 rounded-lg py-2 mt-2 w-full"
          />
        </div>
    }
      </div>
      <div className="flex flex-col lg:flex-row gap-8 items-center mb-8">
        <div className="lg:w-1/2 w-full">
          <label
          
            className="text-base text-black w-full"
          >
          Collection
          </label>
          <input
            type="text"
       required
            name="collection"
            className="block border border-[#5E1675] px-2 rounded-lg py-2 mt-2 w-full"
          />
        </div>
        <div className="lg:w-1/2 w-full">
          <label
          
            className="text-base text-black w-full"
          >
            date
          </label>
          <input
            type="date"
      
            name="date"
            className="block border border-[#5E1675] px-2 rounded-lg py-2 mt-2 w-full"
          />
        </div>
      </div>
    
      {
        transectionDetails == "Monthly Fee" ? <div className=" ">
        
        <label
            className="text-xl font-normal text-black w-full"
          >
         Month
          </label>
      <ReactSelect
      isMulti
        options={monthsOptions}
        onChange={handleMonthChange}
        value={monthsSelectedOption} // Set the value of the selected option
      />
    
  
</div> : <>  <div className="lg:w-1/2 w-full">
          <label
          
            className="text-base text-black w-full"
          >
            Sector
          </label>
          <input
            type="text"
            onChange={(e) => setMonthsSelectedOption([e.target.value])}
            name="sector"
            className="block border border-[#5E1675] px-2 rounded-lg py-2 mt-2 w-full"
          />
        </div></>
      }

    <div className=" w-full my-8">
          <label
          
            className="text-base text-black w-full"
          >
           Receiver
          </label>
          <input
            type="text"
      
            name="receiver"
            className="block border border-[#5E1675] px-2 rounded-lg py-2 mt-2 w-full"
          />
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

export default Addpayment;