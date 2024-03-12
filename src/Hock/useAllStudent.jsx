
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllStudents = () => {
const useAxios = useAxiosPublic();

  const {
    data: allStudents = [],
    isLoading : isLoadingAllStudents ,
    isPending: isPendingAllStudents,
    refetch: refetchAllStudents,
  } = useQuery({
    queryKey: ["allStudents"],
    queryFn: async () => {
      const res = await useAxios.get(`/admissionStudents`);
      console.log(res?.data);
      return res?.data;
    },
  });
  return { allStudents,isPendingAllStudents, isLoadingAllStudents, refetchAllStudents };
};

export default useAllStudents;