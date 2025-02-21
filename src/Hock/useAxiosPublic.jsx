import axios from "axios";

const axiosPublic = axios.create({
//  baseURL: "http://localhost:3000", 
  // baseURL: "https://api.infinitymathcenter.com",
  baseURL: "https://imc-server-side.vercel.app",

});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
