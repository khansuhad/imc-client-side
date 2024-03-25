import { useEffect } from "react";
import useAxiosPublic from "./useAxiosPublic";


const useStudentFilter = (filter) => {
    const useAxios = useAxiosPublic();
    const {name , id , studentClass} = filter ;
    
    useEffect(() => {
    useAxios.get("")
    },[useAxios])
  
};

export default useStudentFilter;