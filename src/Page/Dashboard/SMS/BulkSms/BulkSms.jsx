import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClassBatches, fetchDuesAlert } from '../../../../Redux/Features/Batch/BatchSlice/BatchSlice';
import { useReactToPrint } from 'react-to-print';
import Swal from 'sweetalert2';
import JoditEditor from 'jodit-react';
import useAxiosPublic from '../../../../Hock/useAxiosPublic';
import { Link } from 'react-router-dom';

const BulkSms = () => {
  const contentRef = useRef(null);
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [batch, setBatch] = useState('');
  const [studentClass, setStudentClass] = useState("সপ্তম");
console.log(selectedRows);
  const axiosInstance = useAxiosPublic();
  const dispatch = useDispatch();
  const { classBatches, duesAlert } = useSelector((state) => state.batches);

  // Fetch batches based on selected class
  const handleClassBatches = (studentClass) => {
    setSelectedRows([])
    setSelectAll(false);
    dispatch(fetchClassBatches({ data: { searchTerm: studentClass }, axiosInstance }));
  };
  const handleRowSelect = (data) => {
    if (selectedRows.some((row) => row.registrationNo === data.registrationNo)) {
      setSelectedRows(selectedRows.filter((row) => row.registrationNo !== data.registrationNo));
    } else {
      setSelectedRows([...selectedRows, data]);
    }
  };
  // Initial Load of All Batches
  useEffect(() => {
    dispatch(fetchClassBatches({ data: { searchTerm: "সপ্তম"}, axiosInstance }));
  }, [dispatch, axiosInstance]);

  // Handle Search for Dues Report
  const handleSearchDuesReport = (e) => {
    e.preventDefault();
    setSelectedRows([])
    const form = e.target;
    const studentClass = form.studentClass.value;
    const batch = form.batch.value;
    dispatch(fetchDuesAlert({ data: { batch, studentClass }, axiosInstance }));
  };

  // Handle Select All Rows
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(duesAlert);
    }
    setSelectAll(!selectAll);
  };

  // Handle Class Change
  const handleStudentClass = (value) => {
    setSelectedRows([])
    setStudentClass(value);
    setBatch('');
  };
  const stripHtmlTags = (htmlContent) => {
    // Convert <br>, <p>, and block elements to line breaks
    let formattedContent = htmlContent
      .replace(/<br\s*\/?>/gi, '\n')   // Convert <br> to newline
      .replace(/<\/p>|<\/div>|<\/h[1-6]>|<\/li>/gi, '\n') // Block elements to newline
      .replace(/<li>/gi, '• '); // Add bullet point for list items
    
    // Preserve bold and italic text by removing tags but keeping the text
    formattedContent = formattedContent
      .replace(/<\/?(b|strong)>/gi, '**')  // Bold text using ** (Markdown style)
      .replace(/<\/?(i|em)>/gi, '_');      // Italic text using _ (Markdown style)
  
    // Strip all other HTML tags
    formattedContent = formattedContent.replace(/<\/?[^>]+(>|$)/g, "");
  
    // Trim any extra spaces
    return formattedContent.trim();
  };
  const sendSMS = async (mobile ,message) => {

  
    try {
      const greenwebsms = new URLSearchParams();
      greenwebsms.append('token', '1196418472917392780491ebff42bd422c43a2fa2cc3d55be3c15');
      greenwebsms.append('to', mobile);
      greenwebsms.append('message', `${message}

  Thank you,
  Infinity Math Center`);
  
      const res = await axios.post('https://api.bdbulksms.net/api.php', greenwebsms);
      console.log(res);
  
      if (res?.status === 200) {
        await axiosInstance.post('/sms', {
          createdAt: new Date(),
          mobile,
          message: `${message}

          Thank you,
          Infinity Math Center`,
          messageType: 'Bulk SMS',
        });
      }
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
  };
const sendBulkSms = () =>{
  for(var i = 0 ; selectedRows?.length > 0 ; i++){
    sendSMS(selectedRows[i]?.guardiansMobile,stripHtmlTags(content))
    if(selectedRows[i]?.mobile){
      sendSMS(selectedRows[i]?.mobile,stripHtmlTags(content))
    }
  }
  console.log( stripHtmlTags(content))

}
  return (
    <div className='bg-white'>
      <Toaster />
      <div className="bg-background-gradient p-5 text-black">
        <div className="bg-white p-6 shadow-custom-backend rounded-lg">
          <h1 className="font-bold lg:text-3xl">Dues Alert</h1>
          <hr className="border w-full mx-auto my-5" />
          <form onSubmit={handleSearchDuesReport} className="p-6">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
              <div className="mt-2">
                <label className="text-[16px] font-medium text-black w-full">Class</label>
                <select 
                  name="studentClass" 
                  onChange={(e) => {
                    handleClassBatches(e.target.value);
                    handleStudentClass(e.target.value);
                  }} 
                  className="block border-[1px] p-1 lg:text-[16px] mt-2 w-full rounded border-[#9E9E9E] font-medium outline-none" 
                  defaultValue={"সপ্তম"} 
                  required
                >
                  <option value="সপ্তম">সপ্তম</option>
                  <option value="অষ্টম">অষ্টম</option>
                  <option value="নবম">নবম</option>
                  <option value="দশম">দশম</option>
                  <option value="একাদশ - দ্বাদশ">একাদশ - দ্বাদশ</option>
                </select>
              </div>
              <div className="mt-2 text-black">
                <label className="text-[16px] font-medium text-black w-full">Batch</label>
                <select
                  name="batch"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  className="block border-[1px] p-1 lg:text-[16px] mt-2 w-full rounded text-black border-[#9E9E9E] font-medium outline-none"
                 
                >
                  <option value="false" selected>False</option>
                  {classBatches && classBatches.length > 0 ? (
                    classBatches.map((batch) => (
                      <option key={batch._id} value={batch.batchTitle} >{batch.batchTitle}</option>
                    ))
                  ) : (
                    <option value="" disabled>No batches available</option>
                  )}
                </select>
              </div>
            </div>
            <button type="submit" className="rounded px-5 py-2 bg-blue-700 text-white items-center btn w-fit my-5">
              Search
            </button>
          </form>

          <div className="p-6">
            <label className="text-[16px] font-medium text-black w-full">Compose Message</label>
            <JoditEditor
              ref={editor}
              value={content}
              onBlur={(newContent) => setContent(newContent)}
              config={{
                readonly: false,
                height: 300,
                placeholder: "Type your message here...",
              }}
            />
          </div>
          <button type="button" onClick={() => sendBulkSms()} className="rounded px-5 py-2 bg-orange-500 text-white items-center btn w-fit my-5">
              Send Bulk Sms
            </button>
        </div>

          <div className='mt-10'>
                        {
                            duesAlert?.length > 0 &&    <div className="overflow-x-auto lg:px-10">
                                            <table className="table table-xs ">
                                                <thead className=" lg:text-xl bg-button-gradient-backend text-white">
                                                    <tr >
                                                    <th>
                          <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                          />{" "}
                          Select All
                        </th>
                                                        <th>Reg No.</th>
                                                        <th>Id No.</th>
                                                        <th>Name</th>
                                                        <th>Batch</th>
                                                        <th>Mobile</th>
                                                        <th>Guardian&rsquo;s Mobile</th>
                                                        <th>Total Monthly Fee</th>
                                                        <th>Total Exam Fee</th>
                                                        <th>Total Due</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                { duesAlert?.map((data, index) => <>
                                                      { <tr className="text-black  bg-white shadow-custom-backend rounded-lg my-10" key={index}>
                                                           <td className="lg:text-xl py-5 text-center">
                            <input
                              type="checkbox"
                              checked={selectedRows.some((row) => row.registrationNo === data.registrationNo)}
                              onChange={() => handleRowSelect(data)}
                            />
                          </td>
                                                            <td className="lg:text-xl py-5">{data.registrationNo}</td>
                                                            <td className="lg:text-xl py-5">{data.rollNo}</td>
                             <td className="lg:text-xl py-5 ">{data?.name}</td>
                             <td className="lg:text-xl py-5 ">{data?.batch}</td>
                             <td className="lg:text-xl py-5 text-center">{data?.mobile}</td>
                             <td className="lg:text-xl py-5 text-center">{data?.guardiansMobile}</td>
                             <td className="lg:text-xl py-5 text-center">{data?.duesMonth?.reduce((prev,cur) => prev + Number(cur.fee) ,0)}</td>
                             <td className="lg:text-xl py-5 text-center">{data?.duesBatchMonthlyFee?.reduce((prev,cur) => prev + Number(cur.fee) ,0)}</td>
                             <td className="lg:text-xl py-5 text-center">{data?.duesMonth?.reduce((prev,cur) => prev + Number(cur.fee) ,0) +  data?.duesBatchMonthlyFee?.reduce((prev,cur) => prev + cur.fee ,0)}</td>
                             <td className="lg:text-xl py-5  dropdown dropdown-end ">
                                                        
                                                        <div tabIndex={0} role="button" className="btn m-1">Option</div>
                                                        <ul tabIndex={0} className="dropdown-content  right-10 z-[10] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                          {/* <li><Link to={`/dashboard/student-profile-details/${data?.registrationNo}`}>Profile</Link></li> */}
                                                          {/* <li><Link to={`/id-card/${data?._id}`}>ID Card</Link></li> */}
                                 
                                                       
                                                          <li><Link to={`/dashboard/student-payment-history/${data?.email}`}>Payment Hisroty</Link></li>
                                                          <li><Link to={`/dashboard/fees-entry?_id=${data?._id}`}>Payment</Link></li>
                                                          <li>
                                                              {/* Open the modal using document.getElementById('ID').showModal() method */}
                                                      {/* <button  onClick={()=> handleCourseCompleted(data?._id)}>Course Completed</button> */}
                                                      </li>
                                                          <li><Link to={`/dashboard/admission-edit/${data._id}`}>Update Information</Link></li>
                                                       
                                                        </ul>
                                                      
                                                                                    </td>       
                                                        </tr>}
                                                    
                                                    </>)}
                                                    
                                                
                                                </tbody>
                                            </table>
                                        </div>
                        }
                      </div>
      </div>
    </div>
  );
};

export default BulkSms;
