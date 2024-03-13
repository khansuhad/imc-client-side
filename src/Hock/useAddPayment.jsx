
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAddPayment = () => {
const useAxios = useAxiosPublic();

  const {
    data: addPayments = [],
    isLoading : isLoadingAddPayments ,
    isPending: isPendingAddPayments,
    refetch: refetchAddPayments,
  } = useQuery({
    queryKey: ["addPayments"],
    queryFn: async () => {
      const res = await useAxios.get(`/addpayment`);
      console.log(res?.data);
      return res?.data;
    },
  });
  return { addPayments,isPendingAddPayments, isLoadingAddPayments, refetchAddPayments };
};

export default useAddPayment;