'use client';
import { use } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClassBatches } from "../../../../../../redux/features/batch/batchSlice/batchSlice";

import Link from "next/link";
import useAxiosPublic from "../../../../../../hooks/useAxiosPublic";

const ClassWiseBatches = ({params}) => {
    const deleteProfileSuccessToast = () =>
        toast.success("Deleted successfully", { duration: 5000 });
    

    const useAxios = useAxiosPublic();
    const unwrappedParams = use(params); // Unwrapping the Promise
    const id = unwrappedParams.id;
    const dispatch = useDispatch();
    const { classBatches, status } = useSelector((state) => state.batches);

    useEffect(() => {
        if (id) {
            dispatch(fetchClassBatches({ data: { searchTerm: id }, axiosInstance: useAxios }));
        }
    }, [dispatch, id, useAxios]);

    const refetchBatches = () => {
        dispatch(fetchClassBatches({ data: { searchTerm: id }, axiosInstance: useAxios }));
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Do you want to delete this batch?",
            showCancelButton: true,
            confirmButtonText: "Delete",
            customClass: {
                confirmButton: 'custom-confirm-btn',
                cancelButton: 'custom-cancel-btn'
            },
        }).then((result) => {
            if (result.isConfirmed) {
                useAxios.delete(`/batches/${id}`).then(() => {
                    deleteProfileSuccessToast();
                    refetchBatches();
                });
            }
        });
    };

    return (
        <div className="bg-background-gradient p-5 min-h-screen">
            <div className="bg-white p-5 space-y-10">
                <div className="flex lg:flex-row gap-5 flex-col items-center justify-between lg:px-10 text-black font-semibold">
                    <h3 className="font-bold lg:text-3xl">Batch List</h3>
                </div>
                <div className="overflow-x-auto lg:px-10">
                    <table className="table table-xs w-full table-auto">
                        <thead className="lg:text-2xl bg-button-gradient-backend text-white">
                            <tr>
                                <th>SL No</th>
                                <th>Batch Title</th>
                                <th>Status</th>
                                <th>Total Students</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classBatches.map((data, index) => (
                                <tr className="text-black bg-white shadow-custom-backend rounded-lg my-10" key={data._id}>
                                    <td className="lg:text-xl py-5">{index < 10 ? '0' : ''}{index + 1}</td>
                                    <td className="lg:text-xl py-5">{data.batchTitle}</td>
                                    <td className="lg:text-xl py-5">
                                        <span className={`px-3 py-1 text-white font-semibold rounded-2xl ${data.status === "Pending" ? "bg-yellow-500" : data.status === "Ongoing" ? "bg-green-500" : "bg-red-500"}`}>
                                            {data.status}
                                        </span>
                                    </td>
                                    <td className="lg:text-xl py-5 text-center">{data?.totalStudents}</td>
                                    <td className="lg:text-xl py-5 flex items-center justify-center gap-5">
                                        <button onClick={() => handleDelete(data._id)} className="cursor-pointer bg-white shadow-custom-backend p-2 rounded-lg hover:bg-red-600 transition-all duration-300">
                                            🗑️
                                        </button>
                                        <Link href={`/dashboard/admin/batch-edit/${data._id}`}>
                                            <FaEdit className="cursor-pointer bg-white shadow-custom-backend p-2 rounded-lg hover:bg-blue-600 transition-all duration-300 text-[40px]" />
                                        </Link>
                                        <Link href={`/dashboard/admin/batch-info/${data.batchTitle}`}>
                                            <FaEye className="cursor-pointer bg-white shadow-custom-backend p-2 rounded-lg hover:bg-green-600 transition-all duration-300 text-[40px]" />
                                        </Link>
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

export default ClassWiseBatches;