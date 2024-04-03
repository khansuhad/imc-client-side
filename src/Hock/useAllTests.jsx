import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllTests = () => {
const useAxios = useAxiosPublic();

  const {
    data: tests = [],
    isLoading : isLoadingtests ,
    isPending: isPendingtests,
    refetch: refetchtests,
  } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => {
      const res = await useAxios.get(`/createTests`);
      console.log(res?.data);
      return res?.data;
    },
  });
  return { tests,isPendingtests, isLoadingtests, refetchtests };
};

export default useAllTests;