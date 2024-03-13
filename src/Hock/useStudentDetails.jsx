import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useStudentDetails = (id) => {
const useAxios = useAxiosPublic();
console.log(id);
  const {
    data: studentDetails = {},
    isLoading : isLoadingStudentDetails ,
    isPending: isPendingStudentDetails,
    refetch: refetchStudentDetails,
  } = useQuery({
    queryKey: ["studentDetails"],
    queryFn: async () => {
      const res = await useAxios.get(`/studentDetails?id=${id}`);
      console.log(res?.data);
      return res?.data;
    },
  });
  return { studentDetails,isPendingStudentDetails, isLoadingStudentDetails, refetchStudentDetails };
};

export default useStudentDetails;