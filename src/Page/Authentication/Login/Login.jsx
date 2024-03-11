import { useContext } from "react";
import  { AuthContext } from "../../../AuthProvider/AuthProvidder";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";





const Login = () => {
    
    const navigate = useNavigate();
    const {loginUser , googleLogin} = useContext(AuthContext);
    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value ; 
        console.log( email , password)

        loginUser(email , password)
        .then(res => {
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Successfully Login",
                showConfirmButton: false,
                timer: 1500
              });
                e.target.reset();
            console.log(res.user)
            navigate('/');
           
        })
        .catch(error => {
            Swal.fire({
                position: "top-center",
                icon: "error",
                title: "Email or password don't match",
                showConfirmButton: false,
                timer: 1500
              });
                console.log(error.message)
        })

    }
    const handleGoogle = () => {
        googleLogin()
        .then(res => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Profile updated successfully",
                showConfirmButton: false,
                timer: 1500
              });
            console.log(res.user)
            navigate('/');
        })
        .catch(error => {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: `${error.message}`,
                showConfirmButton: false,
                timer: 1500
              });
                console.log(error.message)
                return
        })
    }

    return (
        <div className="flex items-center justify-center pt-40 lg:pt-0">
              <div className=" flex justify-center items-center max-h-screen py-10 lg:p-56 ">
      <div className=" border-t-8 rounded border-indigo-600 bg-white p-12 shadow-2xl w-96 h-1/2 ">
        <h1 className="font-bold text-center block text-2xl">Log In</h1>

        <div className="flex justify-center gap-5 my-5">
            <button className="btn px-10" onClick={handleGoogle}>Google</button>
           
            </div>
        <div className="grid grid-cols-3 items-center justify-center">
        <hr /><h1 className="text-center">OR</h1><hr />
        </div>
        <form onSubmit={handleLogin}>
        <input type="email"  name="email"placeholder="your email" className="mt-5 border rounded h-10 w-full pl-3" required/>
        <input type="password"  name="password"  placeholder="Password" className="mt-5 border rounded h-10 w-full pl-3" required />
        <button className="mt-6  block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg">Login</button>
          
        </form>
    
      </div>
    </div>
        </div>
    );
};

export default Login;