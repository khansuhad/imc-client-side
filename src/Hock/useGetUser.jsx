
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";




const useGetUser = () => {
    const {user} = useContext(AuthContext);
    // const useAXios = useAxiosSecure();
    const useAXios = useAxiosPublic();
    const {
      data: userInfo = {},
      isLoading : isLoadingUser ,
      isPending: isPendingUser,
      refetch: refetchUser,
    } = useQuery({
      queryKey: ["user"],
      queryFn: async () => {
        const res = await useAXios.get(`/userInfo?email=${user?.email}`,{
          headers : {
            authorization : `Bearer ${localStorage.getItem('access-token')}`
          }
        });
        return res?.data;
      },
    });
    return { userInfo,isLoadingUser, isPendingUser, refetchUser };
};

export default useGetUser;