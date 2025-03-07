"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClassBatches, fetchDuesAlert } from '../../../../../redux/features/batch/batchSlice/batchSlice';
import useAxiosPublic from '../../../../../hooks/useAxiosPublic';
import { useForm } from 'react-hook-form';

import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Input from '../../../../components/ReuseableInputs/ReuseableInput';
import SingleSelect from '../../../../components/ReuseableInputs/SingleSelectOption';

const BulkSms = () => {
  const [content, setContent] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [batch, setBatch] = useState('');
  const [studentClass, setStudentClass] = useState("সপ্তম");
  const [sendSmsLoading, setSendSmsLoading] = useState(false);

  const axiosInstance = useAxiosPublic();
  const dispatch = useDispatch();
  const { classBatches, duesAlert } = useSelector((state) => state.batches);

  // Initialize React Hook Form
  const { register, handleSubmit, reset,control } = useForm();

  const handleClassBatches = (studentClass) => {
    setSelectedRows([]);
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

  useEffect(() => {
    dispatch(fetchClassBatches({ data: { searchTerm: studentClass }, axiosInstance }));
  }, [dispatch, axiosInstance, studentClass]);

  const handleSearchDuesReport = (data) => {
    setSelectedRows([]);
    const { studentClass, batch } = data;
    dispatch(fetchDuesAlert({ data: { batch, studentClass }, axiosInstance }));
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(duesAlert);
    }
    setSelectAll(!selectAll);
  };

  const handleStudentClass = (value) => {
    setSelectedRows([]);
    setStudentClass(value);
    setBatch('');
  };

  const sendSMS = async (mobile, message) => {
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

  const sendBulkSms = () => {
    setSendSmsLoading(true);
    const allGuardiansMobile = selectedRows
      .map((student) => student?.guardiansMobile)
      .filter((mobile) => mobile)
      .join(',');

    const allStudentMobile = selectedRows
      .map((student) => student?.mobile)
      .filter((mobile) => mobile)
      .join(',');

    sendSMS(allGuardiansMobile, content);
    sendSMS(allStudentMobile, content);

    setSelectedRows([]);
    setContent('');
    setBatch('');
    setStudentClass("সপ্তম");
    dispatch(fetchDuesAlert({ data: {} }, axiosInstance));

    setTimeout(() => {
      setSendSmsLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-white">
      <Toaster />
      <div className="bg-background-gradient p-5 text-black">
        <div className="bg-white p-6 shadow-custom-backend rounded-lg">
          <h1 className="font-bold lg:text-3xl">Bulk SMS</h1>
          <hr className="border w-full mx-auto my-5" />
          <form onSubmit={handleSubmit(handleSearchDuesReport)} className="p-6">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            <SingleSelect
              control={control}
              name="studentClass"
              label="Class"
              onChange={(e) => {
                handleClassBatches(e.target.value);
                handleStudentClass(e.target.value);
              }}
              defaultValue="সপ্তম"
              options={[
                { value: "সপ্তম", label: "সপ্তম" },
                { value: "অষ্টম", label: "অষ্টম" },
                { value: "নবম", label: "নবম" },
                { value: "দশম", label: "দশম" },
                { value: "একাদশ - দ্বাদশ", label: "একাদশ - দ্বাদশ" },
              ]}
              rules={{ required: "Class is required" }}
            />
             <SingleSelect
              control={control}
              name="batch"
              label="Batch"

              defaultValue="false"
              options={[
                { value: "false", label: "False" },  // Adding the "False" option explicitly
                ...classBatches.map((batch) => ({
                  value: batch.batchTitle,
                  label: batch.batchTitle,
                }))
              ]}

            />
            </div>
            <button type="submit" className="rounded px-5 py-2 bg-blue-700 text-white items-center btn w-fit my-5">
              Search
            </button>
          </form>

          <div className="p-6">
            <label className="text-[16px] font-medium text-black w-full">Compose Message</label>
            <textarea
              name="message"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="block border-[1px] p-1 lg:text-[16px] mt-2 w-full rounded text-black border-[#9E9E9E] font-medium outline-none"
              cols={5}
              rows={5}
              placeholder="Write your message"
            />
          </div>
          <button
            type="button"
            onClick={() => sendBulkSms()}
            disabled={sendSmsLoading}
            className="rounded px-5 py-2 bg-orange-500 text-white items-center btn w-fit my-5"
          >
            {sendSmsLoading ? "Loading..." : "Send Bulk Sms"}
          </button>
        </div>

        <div className="mt-10">
          {duesAlert?.length > 0 && (
            <div className="overflow-x-auto lg:px-10">
              <div className="inline-block min-w-full shadow-custom-backend rounded-lg">
                <div className="overflow-y-auto ">
                  <table className="min-w-full">
                    <thead className="lg:text-xl slider-background text-white">
                      <tr>
                        <th className=" text-left">
                          <input type="checkbox" checked={selectAll} onChange={handleSelectAll} /> Select All
                        </th>
                        <th className=" text-left">Reg No.</th>
                        <th className=" text-left">Id No.</th>
                        <th className=" text-left">Name</th>
                        <th className=" text-left">Batch</th>
                        <th className=" text-left">Mobile</th>
                        <th className=" text-left">Guardian&rsquo;s Mobile</th>
                        <th className=" text-left">Total Monthly Fee</th>
                        <th className=" text-left">Total Exam Fee</th>
                        <th className=" text-left">Total Due</th>
                        <th className=" text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {duesAlert?.map((data, index) => (
                        <tr key={index} className="text-black">
                          <td className="p-5 ">
                            <input
                              type="checkbox"
                              checked={selectedRows.some((row) => row.registrationNo === data.registrationNo)}
                              onChange={() => handleRowSelect(data)}
                            />
                          </td>
                          <td className="p-5">{data.registrationNo}</td>
                          <td className="p-5">{data.rollNo}</td>
                          <td className="p-5">{data.name}</td>
                          <td className="p-5">{data.batch}</td>
                          <td className="p-5 ">{data.mobile}</td>
                          <td className="p-5 ">{data.guardiansMobile}</td>
                          <td className="p-5 ">
                            {data.duesMonth?.reduce((prev, cur) => prev + Number(cur.fee), 0)}
                          </td>
                          <td className="p-5 ">
                            {data.duesBatchMonthlyFee?.reduce((prev, cur) => prev + Number(cur.fee), 0)}
                          </td>
                          <td className=" ">
                            {data.duesMonth?.reduce((prev, cur) => prev + Number(cur.fee), 0) +
                              data.duesBatchMonthlyFee?.reduce((prev, cur) => prev + cur.fee, 0)}
                          </td>
                          <td className="lg:text-xl p-5 dropdown dropdown-end">
                            <DropdownMenu>
                              <DropdownMenuTrigger className="bg-slate-400 text-white px-3 py-1 rounded-lg active:bg-slate-700">
                                Options
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuLabel>My Options</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <li>
                                    <Link href={`/dashboard/admin/student-payment-history/${data?._id}`}>Payment History</Link>
                                  </li>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <li>
                                    <Link href={`/dashboard/admin/fees-entry?_id=${data?._id}`}>Payment</Link>
                                  </li>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <li>
                                    <Link href={`/dashboard/admin/admission-edit/${data._id}`}>Update Information</Link>
                                  </li>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkSms;
