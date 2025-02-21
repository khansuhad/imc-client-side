import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvidder";




const PrivateRoute = ({ children }) => {
  const {user, isLoading} = useContext(AuthContext);
console.log(user,isLoading);
  if (isLoading) {
    return <div className="flex justify-center items-center  min-h-screen bg-transparent"><span className="loading loading-dots loading-lg"></span></div>
  }

  if (user) {
    return children;
  }
 
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node,
};