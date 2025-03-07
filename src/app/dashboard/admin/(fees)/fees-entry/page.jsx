"use client"

import ReactSelect from "react-select";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic"
import { FaRegSave } from "react-icons/fa";
import { fetchBatchDetails, fetchBatches,  fetchClassStudents } from "../../../../../redux/features/batch/batchSlice/batchSlice";
import { fetchStudentDetails } from "../../../../../redux/features/admissions/admissionSlice/admissionSlice";
import { fetchFeesCount } from "../../../../../redux/features/fees/feesSlice/feesSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { reactSelectFormatOne, reactSelectFormatTwo } from "../../../../components/ReactSelectManipulate/reactSelectManipulate";
import { useForm } from "react-hook-form";
import SingleSelect from "../../../../components/ReuseableInputs/SingleSelectOption";
import Input from "../../../../components/ReuseableInputs/ReuseableInput";

const FeesEntry = () => {
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

  const useAXios = useAxiosPublic();
  const dispatch = useDispatch()
  const {batchDetails} = useSelector((state) => state.batches)
  const {feesCount} = useSelector((state) => state.fees)
  const {studentInfo} = useSelector((state) => state.admissions)
  const [monthlyFee,setMonthlyFee] = useState("Monthly Fee")
  const [loadingButton , setLoadingButton] = useState(false)
  const [studentOptions , setStudentOptions] = useState([])
  const [duesMonthOptions, setDuesMonthOptions] = useState([])
  const [duesMonthlyFeeOptions, setDuesMonthlyFeeOptions] = useState([])
  const axiosInstance = useAxiosPublic()
  const [studentSelected, setStudentSelected] = useState(false)
  const {classStudents} = useSelector((state) => state.batches)
  const [_id, setId] = useState(null);
  useEffect(() => {
      if (typeof window !== "undefined") {
          const urlParams = new URLSearchParams(window.location.search);
          setId(urlParams.get("_id"));
      }
  }, []);
 const handleClassStudents = (studentClass) => {
  console.log(studentClass)
    dispatch(fetchClassStudents({data: {searchTerm : studentClass}, axiosInstance : axiosInstance}))
    setStudentSelectedOption("")
    setDuesMonthSelectedOption("")
    setDuesMonthlyFeeSelectedOption("")
    setDuesMonthlyFeeOptions([])
    setDuesMonthOptions([])
 }
 useEffect(() => { 
  dispatch(fetchClassStudents({data: {searchTerm : "সপ্তম"}, axiosInstance : axiosInstance}))
 },[axiosInstance,dispatch])
 useEffect(() =>{
  if(_id){
    dispatch(fetchStudentDetails({data: {searchTerm : _id}, axiosInstance : useAXios}))
    setStudentSelectedOption({ value : `${studentInfo?._id}` , label : `${studentInfo?.registrationNo}/${studentInfo?.name} `})
    setStudentSelected(true)
  }
 },[_id,dispatch,studentInfo?._id,studentInfo?.name,studentInfo?.registrationNo,useAXios])
  useEffect(()  => {
 
          const student = reactSelectFormatOne(classStudents,"_id",["registrationNo","name"])
          setStudentOptions(student)
          const duesMonthOptions = reactSelectFormatTwo(studentInfo?.duesMonth, ["month", "fee"], ["month", "fee"]);
          setDuesMonthOptions(duesMonthOptions)
          console.log(batchDetails);
          const duesMonthlyFee = reactSelectFormatTwo(studentInfo?.duesBatchMonthlyFee, ["month", "fee"], ["month", "fee"])
          setDuesMonthlyFeeOptions(duesMonthlyFee)
          console.log(batchDetails);
  },[ classStudents,useAXios,studentInfo?.duesMonth,studentInfo?.duesBatchMonthlyFee,batchDetails?.batchMonthlyFee,batchDetails,axiosInstance,dispatch])
useEffect(() => {
  dispatch(fetchFeesCount({data: {searchTerm : ""}, axiosInstance : useAXios}))
},[useAXios,dispatch])

       
        const [studentSelectedOption, setStudentSelectedOption] = useState('');
        const handleStudentChange = (selectedOption) => {
       dispatch(fetchStudentDetails({data: {searchTerm : selectedOption?.value}, axiosInstance : useAXios}))
          setStudentSelectedOption(selectedOption)
        };
        const [duesMonthSelectedOption, setDuesMonthSelectedOption] = useState([]);
        const handleDuesMonthChange = (selectedOption) => {
  
       setDuesMonthSelectedOption(selectedOption)

        };
        const [duesMonthlyFeeSelectedOption, setDuesMonthlyFeeSelectedOption] = useState([]);
        console.log(duesMonthlyFeeSelectedOption);
        const handleDuesMonthlyFeeChange = (selectedOption) => {
       setDuesMonthlyFeeSelectedOption(selectedOption)
        };
        const formatMonth = (month) => {
          const [name, year] = month.split(' ');
          return `${name.toLowerCase().slice(0, 3)}/${year.slice(2)}`;
        };
        const sendSMS = async ( allData ,duesMonth ,duesBatchMonthlyFee,mobile) => {
          const duesMonthText = duesMonth?.reduce((prev, cur) => prev + Number(cur.fee), 0) > 0 
            ? `${duesMonth?.map(item => formatMonth(item?.month)).join(', ')} এর বেতন ${duesMonth?.reduce((prev, cur) => prev + Number(cur.fee), 0)} টাকা`
            : '';
 
          const duesBatchText = duesBatchMonthlyFee?.reduce((prev, cur) => prev + Number(cur.fee), 0) > 0 
            ? `Exam ফি ${duesBatchMonthlyFee?.reduce((prev, cur) => prev + Number(cur.fee), 0)}৳`
            : '';
        
          try {
            const greenwebsms = new URLSearchParams();
            greenwebsms.append('token', '1196418472917392780491ebff42bd422c43a2fa2cc3d55be3c15');
            greenwebsms.append('to', mobile);
            greenwebsms.append('message', `প্রিয় ${allData?.studentNickname}, আপনার ${duesMonthText} ${(duesMonth?.reduce((prev, cur) => prev + Number(cur.fee), 0) > 0  && duesBatchMonthlyFee?.reduce((prev, cur) => prev + Number(cur.fee), 0) > 0)  ? `এবং ` : ``} ${duesBatchText} পরিশোধের জন্য ধন্যবাদ। ${(allData?.duesMonth?.reduce((prev,cur) => prev + Number(cur.fee) ,0) +  allData?.duesBatchMonthlyFee?.reduce((prev,cur) => prev + cur.fee ,0) ) - (duesMonth?.reduce((prev, cur) => prev + Number(cur.fee), 0) + duesBatchMonthlyFee?.reduce((prev, cur) => prev + Number(cur.fee), 0)) > 0 ? `Due রয়েছে ${(allData?.duesMonth?.reduce((prev,cur) => prev + Number(cur.fee) ,0) +  allData?.duesBatchMonthlyFee?.reduce((prev,cur) => prev + cur.fee ,0) ) - (duesMonth?.reduce((prev, cur) => prev + Number(cur.fee), 0) + duesBatchMonthlyFee?.reduce((prev, cur) => prev + Number(cur.fee), 0))} টাকা।` : ``}
ধন্যবাদান্তে,
ইনফিনিটি ম্যাথ সেন্টার`);
        
            const res = await axios.post('https://api.bdbulksms.net/api.php', greenwebsms);
            console.log(res);
        
            if (res?.status === 200) {

              await axiosInstance.post('/sms', {
                createdAt: new Date(),
                mobile,
                nickname:allData?.studentNickname,
                message: `প্রিয় ${allData?.studentNickname}, আপনার ${duesMonthText} ${(duesMonth?.reduce((prev, cur) => prev + Number(cur.fee), 0) > 0  && duesBatchMonthlyFee?.reduce((prev, cur) => prev + Number(cur.fee), 0) > 0)  ? `এবং ` : ``} ${duesBatchText} পরিশোধের জন্য ধন্যবাদ। ${(allData?.duesMonth?.reduce((prev,cur) => prev + Number(cur.fee) ,0) +  allData?.duesBatchMonthlyFee?.reduce((prev,cur) => prev + cur.fee ,0) ) - (duesMonth?.reduce((prev, cur) => prev + Number(cur.fee), 0) + duesBatchMonthlyFee?.reduce((prev, cur) => prev + Number(cur.fee), 0)) > 0 ? `Due রয়েছে ${(allData?.duesMonth?.reduce((prev,cur) => prev + Number(cur.fee) ,0) +  allData?.duesBatchMonthlyFee?.reduce((prev,cur) => prev + cur.fee ,0) ) - (duesMonth?.reduce((prev, cur) => prev + Number(cur.fee), 0) + duesBatchMonthlyFee?.reduce((prev, cur) => prev + Number(cur.fee), 0))} টাকা।` : ``}
ধন্যবাদান্তে,
ইনফিনিটি ম্যাথ সেন্টার`,
                messageType: 'Fees Receive',
                batch: allData?.batch,
                registrationNo: allData?.registrationNo
              });
            }
          } catch (error) {
            console.error("Error sending SMS:", error);
          }
        };

    const handleCategoryChange= (value) => {
      console.log(value);
          setMonthlyFee(value)
    }
      const { control, handleSubmit,register, reset } = useForm();
      const onSubmit = async (data) => {
        console.log(data); // Log the data for debugging
        setLoadingButton(true);
      
        try {
          const sendSms = data.sendSms; 
          console.log(data);// Get the sendSms value from the form data
          const student = !_id
            ? classStudents?.find((student) => student._id == studentSelectedOption.value)
            : studentInfo;
      
          if (typeof studentSelectedOption.value === 'string') {
            const { date, category, description, transectionMode, cashReceived } = data;
            const year = moment().format('YYYY');
            const invoiceNumber = `#IMC${year}-${feesCount?.length}`;
      
            let formInfo = {
              batch: student?.batch,
              date,
              category,
              description,
              transectionMode,
              cashReceived,
              registrationNo: student?.registrationNo,
              invoiceNumber,
            };
      
            // If category is "Monthly Fee", include additional fields
            if (category === 'Monthly Fee') {
              const duesMonth = duesMonthSelectedOption.length > 0 ? duesMonthSelectedOption.map((month) => month.value) : [];
              const duesBatchMonthlyFee = duesMonthlyFeeSelectedOption.length > 0 ? duesMonthlyFeeSelectedOption.map((month) => month.value) : [];
              formInfo = {
                ...formInfo,
                duesBatchMonthlyFeePayment: duesBatchMonthlyFee,
                duesMonthPayment: duesMonth,
              };
            }
      
            // API request URL
            const apiUrl = category === 'Monthly Fee' ? '/payment' : '/payment/admissions';
      
            // Making the POST request to the server
            const res = await useAXios.post(apiUrl, formInfo);
            console.log('API Response:', res?.data); // Log the response for debugging
      
            if (res?.data?.paymentResult?.insertedId) {
              if (!_id) {
                // After successful payment submission, dispatch an action to fetch updated student details
                dispatch(fetchStudentDetails({ data: { searchTerm: '' }, axiosInstance: useAXios }));
                setStudentSelectedOption('');
              }
      
              // Reset fields after successful submission
              setDuesMonthSelectedOption([]);
              setDuesMonthlyFeeSelectedOption([]);
              setDuesMonthlyFeeOptions([]);
              setDuesMonthOptions([]);
              setMonthlyFee('Monthly Fee');
      
              // Reset the form
              reset();
      
              // Show success message
              toast.success('Fees submitted successfully!');
      
              // Send SMS if the checkbox was checked
              if (sendSms) {
                const duesMonth = duesMonthSelectedOption.length > 0 ? duesMonthSelectedOption.map((month) => month.value) : [];
              const duesBatchMonthlyFee = duesMonthlyFeeSelectedOption.length > 0 ? duesMonthlyFeeSelectedOption.map((month) => month.value) : [];
                sendSMS(student, duesMonth, duesBatchMonthlyFee, student?.guardiansMobile);
              }
            }
          }
        } catch (error) {
          console.error('Error during fee submission:', error); // Log the error for debugging
          toast.error('Failed to submit fees.');
        } finally {
          setLoadingButton(false); // Reset loading state
        }
      };
      
    return (
      <div className="bg-background-gradient min-h-screen p-5 text-black">
      <div className="shadow-custom-backend rounded">
        <div className="bg-white p-6">
          <div className="flex flex-col lg:flex-row gap-5 justify-between items-center">
            <h1 className="font-normal text-2xl">Fees Entry</h1>
          </div>
        </div>
        <hr className="border w-full mx-auto" />
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6">
          <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5 items-center justify-between">
            <SingleSelect
              control={control}
              name="category"
              label="Category"
              defaultValue="Monthly Fee"
              options={[
                { value: "Monthly Fee", label: "Monthly Fee" },
                { value: "Admission Fee", label: "Admission Fee" },
                { value: "Model test", label: "Model test" },
              ]}
              rules={{ required: "Category is required" }}
              onChange={(e) => handleCategoryChange(e.target.value)}
            />

         { !studentSelected &&  <SingleSelect
              control={control}
              name="studentClass"
              label="Class"
              defaultValue="সপ্তম"
              options={[
                { value: "সপ্তম", label: "সপ্তম" },
                { value: "অষ্টম", label: "অষ্টম" },
                { value: "নবম", label: "নবম" },
                { value: "দশম", label: "দশম" },
                { value: "একাদশ - দ্বাদশ", label: "একাদশ - দ্বাদশ" },
              ]}
              rules={{ required: "Class is required" }}
              onChange={(e) => handleClassStudents(e.target.value)}
            />}

            <div className="w-full mt-2">
              <label className="text-[16px] font-medium text-black w-full">
                Admission
              </label>
              <ReactSelect
                options={studentOptions}
                onChange={handleStudentChange}
                value={studentSelectedOption}
                isDisabled={studentSelected}
              />
            </div>

            {monthlyFee === "Monthly Fee" && (
              <>
                <div className="w-full mt-2">
                  <label className="text-[16px] font-medium text-black w-full">
                    Due Months
                  </label>
                  <ReactSelect
                    options={duesMonthOptions}
                    onChange={handleDuesMonthChange}
                    value={duesMonthSelectedOption}
                    isMulti
                  />
                </div>

                <div className="w-full mt-2">
                  <label className="text-[16px] font-medium text-black w-full">
                    Monthly Exam Fee
                  </label>
                  <ReactSelect
                    options={duesMonthlyFeeOptions}
                    onChange={handleDuesMonthlyFeeChange}
                    value={duesMonthlyFeeSelectedOption}
                    isMulti
                  />
                </div>
              </>
            )}

            <Input
              control={control}
              name="date"
              label="Payment Date"
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              rules={{ required: "Payment Date is required" }}
            />

            <SingleSelect
              control={control}
              name="transectionMode"
              label="Transaction Mode"
              defaultValue="Cash"
              options={[
                { value: "Cash", label: "Cash" },
                { value: "Bkash", label: "Bkash" },
                { value: "Nagad", label: "Nagad" },
                { value: "Rocket", label: "Rocket" },
                { value: "Bank", label: "Bank" },
              ]}
              rules={{ required: "Transaction Mode is required" }}
            />

            <Input
              control={control}
              name="cashReceived"
              label="Cash Received"
              type="number"
              rules={{ required: "Cash Received is required" }}
            />

            <Input
              control={control}
              name="description"
              label="Description"
              type="text"
            />

            <div className="w-full mt-2">
              <label className="text-[16px] font-medium text-black w-full">
                Send SMS
              </label>
              <input
                type="checkbox"
                {...register('sendSms')}
                className="block border-[1px] p-1 font-light lg:text-[16px] ml-2 rounded border-[#9E9E9E] text-black"
              />
            </div>
          </div>

          {studentSelectedOption && (
            <div className="w-full my-2">
              <ul>
                <li>Total Due:{studentInfo?.duesMonth?.reduce((prev,cur) => prev + cur.fee ,0) + studentInfo?.duesBatchMonthlyFee?.reduce((prev,cur) => prev + cur.fee ,0)}</li>
                <li>Monthly Fee Due: {studentInfo?.duesMonth?.reduce((prev,cur) => prev + cur.fee ,0)}</li>
                <li>Monthly Exam Fee Due: {studentInfo?.duesBatchMonthlyFee?.reduce((prev,cur) => prev + cur?.fee ,0)}</li>
                <li>Model Test Due: 0</li>
              </ul>
            </div>
          )}

          <hr className="border w-full mx-auto" />
          <div className="flex gap-5 items-center my-5">
            <button
              type="submit"
              className={`rounded px-5 py-2 hover:border-[#007BFF] duration-500 transition-all hover:bg-[#007BFF] border-2 flex gap-2 bg-button-gradient-backend text-white items-center btn w-fit my-5 ${
                loadingButton
                  ? "opacity-50 cursor-not-allowed bg-[#1486DB]"
                  : "bg-[#1486DB]"
              }`}
              disabled={loadingButton}
            >
              {loadingButton ? "Save..." : "Save"} <FaRegSave />
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="rounded bg-[#6C757D] hover:bg-slate-600 duration-500 transition-all text-white px-5 py-2"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
    );
};

export default FeesEntry;