import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useStudentFilter = ({filter}) => {
const useAxios = useAxiosPublic();
const {id , name , studentClass} = filter ;
console.log(filter);
  const {
    data: students = [],
    isLoading : isLoadingStudents ,
    isPending: isPendingStudents,
    refetch: refetchStudents,
  } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const res = await useAxios.get(`/studentFilter?id=${id}&name=${name}&studentClass=${studentClass}`);
      console.log(res?.data);
      return res?.data;
    },
  });
  return { students,isLoadingStudents, isPendingStudents, refetchStudents };
};

export default useStudentFilter;