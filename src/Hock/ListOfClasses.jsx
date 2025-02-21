
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useListOfClasses = () => {
const useAxios = useAxiosPublic();

  const {
    data: listOfClasses = [],
    isLoading : isLoadingListOfClasses ,
    isPending: isPendingListOfClasses,
    refetch: refetchListOfClasses,
  } = useQuery({
    queryKey: ["listOfClasses"],
    queryFn: async () => {
      const res = await useAxios.get(`/list-of-classes`);
      console.log(res?.data);
      return res?.data;
    },
  });
  return { listOfClasses,isPendingListOfClasses, isLoadingListOfClasses, refetchListOfClasses };
};

export default useListOfClasses;