import  { useState } from 'react';

import { HiMenu } from "react-icons/hi"; 
import { RxCross1 } from "react-icons/rx"; 
import { Link } from 'react-router-dom';


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLink = <>
     <button className="block text-2xl font-semibold text-[#5E1675] hover:text-gray-400 py-2 px-4 cursor-pointer">
            Home
            </button>
            <Link to="/dashboard" className="block text-2xl font-semibold text-[#5E1675]  hover:text-gray-400 py-2 px-4 cursor-pointer">
            Dashboard
            </Link>
            <button  className="block text-2xl font-semibold text-[#5E1675]  hover:text-gray-400 py-2 px-4 cursor-pointer">
           Feedback
            </button>
    </>





    return (
        <header className="w-full bg-[#FFD23F]  ">
      <nav className={`py-4 md:px-12 px-4  `}>
        <div className="flex items-center justify-between">
    <div className='flex items-center'>
    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-body text-3xl">
            { isMenuOpen === false ? <HiMenu /> : <RxCross1/> }
          </button>
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
                <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://i.postimg.cc/NMxGW3Xr/Whats-App-Image-2023-12-20-at-10-06-27-PM.jpg" />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li className='px-2'>
          <p className="overflow-hidden text-xl my-2 text-left">
            usedisplayName
            
          </p>
        </li>
    
        {/* <li><Link  className="px-4 py-2 bg-transparent border border-primary text-primary rounded hover:bg-primary hover:text-white transition-all duration-300" >Log out</Link></li> */}
      </ul>
    </div>
                </div>
            
    <div>
    
    </div>
             
              </div>  
             }
          </div>
         
        </div>
        </div>

     
        {isMenuOpen && (
          <div className="mt-4 flex justify-center flex-col bg-blue-600 rounded-lg lg:hidden text-black font-medium ">
            {navLink}
          </div>
        )}
      
         
      </nav>
    </header>
    );
};

export default Navbar;