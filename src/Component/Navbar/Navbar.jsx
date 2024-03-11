import  { useContext, useState } from 'react';

import { HiMenu } from "react-icons/hi"; 
import { RxCross1 } from "react-icons/rx"; 
import { Link} from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvidder';

import Swal from 'sweetalert2';


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {user , logOut} = useContext(AuthContext);
  console.log(user);
    const navLink = <>
     <Link className="block text-2xl font-semibold text-[#5E1675] hover:text-gray-400 py-2 px-4 cursor-pointer">
            Home
            </Link>
            <Link to="/dashboard" className="block text-2xl  font-semibold lg:text-[#5E1675]  hover:text-gray-400 py-2 px-4 cursor-pointer">
            Dashboard
            </Link>
            <Link  className="block text-2xl font-semibold text-[#5E1675]  hover:text-gray-400 py-2 px-4 cursor-pointer">
           Feedback
            </Link>
    </>

const handleLogOut = () => {
  logOut()
  .then(() => {
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Successfully Log out ",
      showConfirmButton: false,
      timer: 1500
    });
    
  })
  .catch(() => {
    
  });
}




    return (
        <header className="w-full bg-[#FFD23F]  ">
      <nav className={`py-4 md:px-12 px-4  `}>
        <div className="flex items-center justify-between">
    <div className='flex items-center'>
 
          <div className="text-white font-bold text-lg cursor-pointer">
<figure className='h-16 w-16 rounded-full  flex justify-center items-center'>      <img  src='https://i.postimg.cc/nzX8Y3C1/infinity-logo.jpg'  className=" w-12 lg:w-12 rounded-full " /></figure>
          </div>
    </div>
          <div className="lg:flex   gap-3 hidden text-body font-medium">
        <div className='flex '>
           {navLink}
         
        </div>
         
      
          </div>

        

   
        <div className='flex items-center'>
      
          <div className=" ">
          {
              <div className='flex gap-2 items-center'>
              
                <div>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-body text-3xl">
            { isMenuOpen === false ? <HiMenu /> : <RxCross1/> }
          </button>
                </div>
            
  
    <div className='hidden lg:flex justify-center items-center '>
             {
              user?.email ? <button onClick={handleLogOut} className='btn w-full text-xl'>Log out</button> :  <Link to="/login" className='btn w-full text-xl'>Login</Link> 
              
             }
            </div>
    
             
              </div>  
             }
          </div>
         
        </div>
        </div>

     
        {isMenuOpen && (
          <div className="mt-4 flex justify-center flex-col  rounded-lg lg:hidden text-black font-medium ">
     
            {navLink}
            <div className='flex justify-center items-center '>
            {
              user?.email ? <button onClick={handleLogOut} className='btn w-full text-xl'>Log out</button> :  <Link to="/login" className='btn w-full text-xl'>Login</Link> 
              
             }
            </div>
          </div>
        )}
      
         
      </nav>
    </header>
    );
};

export default Navbar;