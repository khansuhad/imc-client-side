import { Link, useNavigate, useParams } from "react-router-dom";

import ReactSelect from "react-select";

import { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import moment from "moment";

import { FaRegSave } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import useAxiosPublic from "../../../../Hock/useAxiosPublic";
import { fetchBatches, fetchBatchesStudents } from "../../../../Redux/Features/Batch/BatchSlice/BatchSlice";
import { fetchStudentDetails } from "../../../../Redux/Features/Admissions/AdmissionsSlice/AdmissionsSlice";
import { fetchTransectionDetails } from "../../../../Redux/Features/Fees/TransectionsSlice/TransectionsSlice";


const TransectionsEdit = () => {
    const selectCustomStyles = {
        control: (provided) => ({
          ...provided,
         
          border: '1px solid #9E9E9E',
           /* Tailwind class `p-1` */
          fontWeight: '300', /* Tailwind class `font-light` */
          fontSize: '16px', /* Tailwind class `lg:text-[16px]` */
          marginTop: '0.25rem', /* Tailwind class `mt-2` */
          width:' 100%', /* Tailwind class `w-full` */
          borderRadius: '0.175rem', /* Tailwind class `rounded` */
          
        }),
        
      };
    const params = useParams()
      const useAXios = useAxiosPublic();
      const dispatch = useDispatch()
      const {batches,batchesStudents} = useSelector((state) => state.batches)
      const {studentInfo} = useSelector((state) => state.admissions)
      const {transectionDetails} = useSelector((state) => state.transections)
      console.log(transectionDetails);
      const navigate = useNavigate();
      const updateProfileSuccessToast = () =>
        toast.success("created successfully");
      const updateProfileErrorToast = () => toast.error("Profile can't update");
      const [monthlyFee,setMonthlyFee] = useState(true)
      const [loadingButton , setLoadingButton] = useState(false)
    
      const [income , setIncome] = useState(true)
      const [studentOptions , setStudentOptions] = useState([])
      const [batchSelected, setBatchSelected] = useState("")
      const [duesMonthOptions, setDuesMonthOptions] = useState([])
      console.log(duesMonthOptions);
      useEffect(() => {
    
        
        let student = { value : `${transectionDetails?.studentSelectedInfo?.value}` , label : `${transectionDetails?.studentSelectedInfo?.label}`}
         
   
        setStudentSelectedOption(student)
            //   const duesMonth = []
            //   if(transectionDetails?.dueMonthSelectedInfo?.length > 0) {
            //     for(let i = 0 ; i <= transectionDetails?.dueMonthSelectedInfo?.length - 1 ; i++)
            //   {
            //     let batch = { value : `${ transectionDetails?.dueMonthSelectedInfo[i]?.value}` , label : `${transectionDetails?.dueMonthSelectedInfo[i]?.label} `}
            //     duesMonth.push(batch)
            //   }
            //   }
            //   setDuesMonthOptions(duesMonth)
      },[ batchesStudents,useAXios,studentInfo?.duesMonth,transectionDetails])
    useEffect(() => {
      dispatch(fetchBatches({data: {searchTerm : ""}, axiosInstance : useAXios}))
    
     
    
      //(batchesStudents.length);
    
          
    
    },[useAXios,dispatch])
    console.log(params?.id);
    useEffect(() => {
       const paramsId = params?.id
        dispatch(fetchTransectionDetails({data: {searchTerm : paramsId}, axiosInstance : useAXios}))
    },[params?.id,useAXios,dispatch])
            const [batchSelectedOption, setBatchSelectedOption] = useState('');
            const handleBatchChange = (selectedOption) => {
    
              dispatch(fetchBatchesStudents({data: {searchTerm : selectedOption}, axiosInstance : useAXios}))
            
           //(selectedOption);
            };
            const [studentSelectedOption, setStudentSelectedOption] = useState(transectionDetails?.studentSelectedInfo);
            const handleStudentChange = (selectedOption) => {
           dispatch(fetchStudentDetails({data: {searchTerm : selectedOption?.value}, axiosInstance : useAXios}))
              setStudentSelectedOption(selectedOption)
    
            };
            const [duesMonthSelectedOption, setDuesMonthSelectedOption] = useState(transectionDetails?.dueMonthSelectedInfo);
            const handleDuesMonthChange = (selectedOption) => {
      
           setDuesMonthSelectedOption(selectedOption)
    
            };
    
        // const handleIncomeChange = (value) =>{
        //     if(value === "Cash Received"){
        //       setIncome(true)
        //     }
        //     else{
        //       setIncome(false)
        //     }
        // }
    
        const handleSubmit = (e) =>{
            e.preventDefault();
            // setLoadingButton(true)
            const form = e.target;
            console.log(studentSelectedOption.value);
            const student = batchesStudents?.find(student => student._id == studentSelectedOption.value)
           if(typeof(studentSelectedOption.value) == 'string' ){
            const date = form.date.value;
            const category = form.category.value;
            const batch = form.batch.value
            const description = form.description.value;
            const transectionMode = form.transectionMode.value;
            const duesMonth = duesMonthSelectedOption?.map(month => {return month.value})
            const cashReceived = form.cashReceived.value;
                const year = moment().format('YYYY')
                   const invoiceNumber = `#CIT${year}-`
                   const formInfo = {batch,date,category ,description,transectionMode,cashReceived,duesMonth,registrationNo :student?.registrationNo }
            console.log(formInfo);
            useAXios.post(`/payment`,formInfo)
            .then(res => {
              // form.reset()
              toast.success("success")
            })
    
          //   .then(res => {
          //       const data = res?.data ;
          //       const {registrationNo ,...info } = data; 
          //       const formInfo ={ registrationNo, date ,invoiceDate,invoiceNumber, category, description , transectionMode , transectionType, cashReceived}
          //       //(formInfo);
              
          //       useAXios.post("/transections" , formInfo)
          // .then(res => {
          //   form.reset()
          //   setLoadingButton(false)
          //   setBatchSelectedOption('')
          //   setStudentSelectedOption('')
          //   updateProfileSuccessToast();
            
          // })
          //   })
          //  }
          
        }}
        const handleCategoryChange= (value) => {
            if(value === "Monthly Fee"){
              setMonthlyFee(true)
            }
            else{
              setMonthlyFee(false)
            }
        }
    return (
        <div className="bg-background-gradient min-h-screen p-5 text-black" >
        <div className="shadow-custom-backend rounded">
        <div className=" bg-white p-6 ">
                    <div className="flex flex-col lg:flex-row gap-5 justify-between items-center">
                        <h1 className="font-normal text-2xl">Transaction Entry</h1>
                     <div className="flex gap-5">
                     <Link to="/dashboard/TransectionList" className="border-2 font-base  rounded-lg bg:button-orange-backend hover:border-[#007BFF] duration-500 transition-all hover:bg-[#007BFF] text-white  px-5 py-2 lg:text-xl">Transection List</Link>
                        <Link to="/dashboard/transection/categoryList" className="border-2 font-base  rounded-lg bg:button-orange-backend hover:border-[#007BFF] duration-500 transition-all hover:bg-[#007BFF] text-white  px-5 py-2 lg:text-xl">Transection Category</Link>
                     </div>
                    </div>
                    
                    </div>
                    <hr className="border w-full mx-auto " />
                    <form onSubmit={handleSubmit} className="bg-white p-6">
                      <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5 items-center justify-between">

                      <div className=" w-full mt-2">
              <label
                className="text-[16px] font-medium text-black w-full"
              >
             Category
              </label>
              
                        <div className="flex flex-col sm:flex-row gap-8 items-center  ">
                  
           <select id="dropdown2" name="category" defaultValue={transectionDetails?.category} onChange={(e) => handleCategoryChange(e.target.value)} className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E]" >
           <option value="Monthly Fee">Monthly Fee</option>
           <option value="Admission Fee">Admission Fee</option>
           <option value="Exam Fee">Exam Fee</option>

           {/* {categories?.map((category ) => <><option className="text-black hover:bg-blue-600" key={category?._id} value={category?.category}>{category?.category}</option></>)} */}
                   
                  
                  
  </select>
        
                 </div>
            </div>
          
           {
             <>
            
            <div className=" w-full mt-2">
              <label
                className="text-[16px] font-medium text-black w-full"
              >
             Batch
              </label>
              
                        <div className="flex flex-col sm:flex-row gap-8 items-center  ">
                  
           <select id="dropdown1" name="batch" defaultValue={transectionDetails?.batch} onChange={(e) => handleBatchChange(e.target.value)} className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E]" >
            <option value="">...</option>
           {batches?.map((category ) => <>
           <option className="text-black hover:bg-blue-600" key={category?._id} value={category?.batchTitle}>{category?.batchTitle}</option>
           </>)}
                   
                  
                  
  </select>
        
                 </div>
            </div>
<div className=" w-full mt-2">
  <label
            className="text-[16px] font-medium text-black w-full"
          >
         Addmission
          </label>
    <ReactSelect
        options={studentOptions}
        onChange={handleStudentChange}
        styles={selectCustomStyles}
        value={studentSelectedOption} // Set the value of the selected option
      />
  </div>
{
  monthlyFee && <div className=" w-full mt-2">
  <label
            className="text-[16px] font-medium text-black w-full"
          >
       Due  Months
          </label>
    <ReactSelect
        options={duesMonthOptions}
        onChange={handleDuesMonthChange}
        styles={selectCustomStyles}
        // defaultValue={duesMonthSelectedOption}
        value={duesMonthSelectedOption}
        isMulti // Set the value of the selected option
      />
  </div>
}
  
  </>
           }
      <div className=" w-full mt-2">
              <label
                className="text-[16px] font-medium text-black w-full"
              >
            Payment Date
              </label>
              <input
                type="date"
                name="date"
                required
                defaultValue={transectionDetails?.date}
                className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E]"
              />
            </div>
 

            <div className="mt-8">
                 <label
                className="text-[16px] font-medium text-black w-full "
              >
              Transection Mode
              </label>
                        <div className="flex flex-col sm:flex-row gap-8 items-center  mb-8">
                  
           <select id="dropdown"  defaultValue={transectionDetails?.transectionMode} name="transectionMode"  className="block border-[1px]  p-1  lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] font-medium outline-none  " required>
        
           <option value="Cash">Cash</option>
                   <option value="Bkash">Bkash</option>
                   <option value="Nagad">Nagad</option>
                   <option value="Rocket">Rocket</option>
                   <option value="Bank">Bank</option>
  </select>
           </div>
                 </div>
        
                 <div className=" w-full my-2">
              <label
                className="text-[16px] font-medium text-black w-full "
              >
             Cash Received 
              </label>
              <input
                type="number"
                name="cashReceived"
                required
                defaultValue={transectionDetails?.cashReceived}
                className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E]"
              />
            </div>
                       
            <div className=" w-full my-2">
              <label
                className="text-[16px] font-medium text-black w-full"
              >
              Description
              </label>
              <input
                type="text"
                name="description"
                required
                defaultValue={transectionDetails?.description}
                className="block border-[1px]  p-1 font-light lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E]"
              />
            </div>
                      </div>
                        



              
        

            <hr className="border w-full mx-auto " />
            <div className="flex gap-5 items-center my-5">
            <button 
  type="submit" 
  className={`rounded px-5 py-2 hover:border-[#007BFF] duration-500 transition-all hover:bg-[#007BFF] border-2 flex gap-2  bg-button-gradient-backend text-white items-center btn  w-fit  my-5 ${loadingButton ? 'opacity-50 cursor-not-allowed bg-[#1486DB] disabled:[#1486DB]' : 'bg-[#1486DB] disabled:[#1486DB]'}`} 
//   disabled={loadingButton}
>
  {loadingButton ? "Save..." : "Save"} <FaRegSave />
</button>
            <button className=" rounded bg-[#6C757D] hover:bg-slate-600 duration-500 transition-all text-white px-5 py-2 ">Reset</button>
        </div>
                        </form>
        </div>
                        <Toaster />
            </div>
    );
};

export default TransectionsEdit;