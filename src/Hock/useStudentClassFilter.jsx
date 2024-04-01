import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useStudentClassFilter = (studentClass) => {
const useAxios = useAxiosPublic();

  const {
    data: students = [],
    isLoading : isLoadingStudents ,
    isPending: isPendingStudents,
    refetch: refetchStudents,
  } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const res = await useAxios.get(`/studentClassFilter?studentClass=${studentClass}`);
      console.log(res?.data);
      return res?.data;
    },
  });
  return { students,isLoadingStudents, isPendingStudents, refetchStudents };
};

export default useStudentClassFilter;