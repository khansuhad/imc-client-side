"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import img from  "../../../public/white logo 2.png"
import Link from 'next/link';
import { GiHamburgerMenu } from "react-icons/gi";
import { usePathname } from 'next/navigation';
import AuthButton from "./AuthButton"
import { useSession } from 'next-auth/react';

const NavBar = () => {
  const session = useSession()
    const [drawer , setDrawer] = useState(false)
      // Disable body scroll when menu is open
  useEffect(() => {
    if (drawer) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = "auto"; // Restore scrolling
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [drawer]);
    const [isOpen, setIsOpen] = useState(false);

    const handleOverlayClick = (e) => {
      if (e.target.id === "overlay") {
        setIsOpen(false);
      }
    };
  const pathname = usePathname()
    if(!pathname.includes("/dashboard") && !pathname.includes("/signin") && !pathname.includes("/signup")){
      return (
        <div className=' px-5'>
                <div className=' grid-cols-4 justify-between items-center lg:grid hidden '>
                <Link href="/" className='col-span-1'>
                <figure className='h-16 w-16 rounded-full  flex justify-center items-center'>      <img  src='https://i.postimg.cc/nzX8Y3C1/infinity-logo.jpg'  className=" w-12 lg:w-12 rounded-full " /></figure>
                </Link>
                <div className='flex gap-10 text-black col-span-2 justify-center items-center'>
                   <ul className='flex text-xl gap-10'>
                  <li> <Link href="/">Home</Link></li>
                  <li>  <Link href="/notices">Notice</Link></li>
                  <li>  <Link href="/gallery">Gallery</Link></li>
                  <li>  <Link href="/admission">Admission</Link></li>
            { session?.data?.user?.email && <li> <Link href="/dashboard">Dashboard</Link></li>}  

             
                   </ul>
                </div>
                <div className='flex justify-end col-span-1'>
                <AuthButton/>
                 
              

                </div>
            </div>
                <div className=' grid grid-cols-2 justify-between  items-center lg:hidden  '>
              <div className=' flex gap-3 items-center lg:hidden  '>
              <div className='' >
                <GiHamburgerMenu   onClick={() => setIsOpen(true)}className='   text-3xl text-black'/>
                </div>
                <Link href="/">
                <figure className='h-16 w-16 rounded-full  flex justify-center items-center'>      <img  src='https://i.postimg.cc/nzX8Y3C1/infinity-logo.jpg'  className=" w-12 lg:w-12 rounded-full " /></figure>
                </Link>
                <div className="flex  relative">
      {/* Overlay */}
      {isOpen && (
        <div
          id="overlay"
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={handleOverlayClick}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white font-semibold flex pt-20 gap-5 flex-col   w-64 p-5 transition-all min-h-screen z-30 ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } lg:relative lg:translate-x-0`}
      >
        <div className=' flex justify-center items-center gap-5 flex-col text-center'>

        <Link href="/" onClick={() => setIsOpen(false)} className='text-black text-center'>Home</Link>
                  <Link href="/notices" onClick={() => setIsOpen(false)} className='text-black text-center'>Notice</Link>
                  <Link href="/gallery" onClick={() => setIsOpen(false)} className='text-black text-center'>Gallery</Link>
                  <Link href="/admission" onClick={() => setIsOpen(false)} className='text-black text-center'>Admission</Link>
        
{session?.data?.user?.email &&    <Link href="/dashboard" onClick={() => setIsOpen(false)} className='text-black text-center'>Dashboard</Link>}
        </div>
       
      </div>

    </div>
              </div>
              <div className={`flex justify-end ${drawer ? "hidden" : "block"} z-50`}>
                 
                 <AuthButton/>
              

                </div>
            </div>
    
        </div>
        );
    }
    else {
      return <></>
    }
};

export default NavBar;