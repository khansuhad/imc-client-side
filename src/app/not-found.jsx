"use client"
import { useRouter } from 'next/navigation';
import React from 'react';

const NotFound = () => {
    const router = useRouter()
    const handleGoBack = ( ) => {
    
        router.push("/")
    }
    return (
        <div className="flex flex-col gap-10 justify-center items-center min-h-[80vh] ">
    
<h1 className="lg:text-3xl text-xl text-black w-[90%] mx-auto text-center">Not Found...</h1>
<button type='button' onClick={handleGoBack} className='px-4 py-2 bg-white text-black rounded-lg font-semibold'>Go Back</button>
   </div>
    );
};

export default NotFound;