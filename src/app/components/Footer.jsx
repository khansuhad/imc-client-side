"use client"
import { usePathname } from 'next/navigation';
const Footer = () => {
    const pathname = usePathname()
    if(!pathname.includes("/dashboard") && !pathname.includes("/signin") && !pathname.includes("/signup")){
        return (
            <div className='bg-[#2F2F2F] 2xl:px-[300px] px-5 lg:py-20 py-10 mt-10 flex flex-col lg:flex-row justify-between gap-5'>
                <div className='flex lg:items-center lg:gap-5 gap-2'>
                    <figure className='lg:w-32 lg:h-32 w-12 h-10 '><img src="https://i.postimg.cc/nzX8Y3C1/infinity-logo.jpg" alt="" className='lg:w-32 lg:h-32 w-6 h-6 rounded-full'  /></figure>
                    <div className='space-y-2'>
                        <h2 className='uppercase text-yellow-400 font-bold font-inter text-xl'>Infinity Math Center</h2>
                        <div className='text-white text-base' >
                        <p className='font-tiroBangla'>আমাদের ঠিকানা: খাঁন মঞ্জিল (২য় তলা), </p>
                        <p className='font-tiroBangla'> মধ্যপাড়া রোড; মৌলভীবাজার সরকারি উচ্চ বিদ্যালয়ের পশ্চিম পাশে, </p>
                        <p > Moulvibazar , Bangladesh</p>
                        </div>
                     
                    </div>
                </div>
                <div  className='text-white space-y-2' >
                    <div className='flex gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z" fill="white"/>
    </svg>
    <a href='https://www.facebook.com/profile.php?id=100019355676497' className='uppercase text-base'>Infinity Math Center</a>
                    </div>
                    <div className='flex gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 17.7383 21.3889 19.2135 20.3012 20.3012C19.2135 21.3889 17.7383 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 6.26174 2.61107 4.78649 3.69878 3.69878C4.78649 2.61107 6.26174 2 7.8 2ZM7.6 4C6.64522 4 5.72955 4.37928 5.05442 5.05442C4.37928 5.72955 4 6.64522 4 7.6V16.4C4 18.39 5.61 20 7.6 20H16.4C17.3548 20 18.2705 19.6207 18.9456 18.9456C19.6207 18.2705 20 17.3548 20 16.4V7.6C20 5.61 18.39 4 16.4 4H7.6ZM17.25 5.5C17.5815 5.5 17.8995 5.6317 18.1339 5.86612C18.3683 6.10054 18.5 6.41848 18.5 6.75C18.5 7.08152 18.3683 7.39946 18.1339 7.63388C17.8995 7.8683 17.5815 8 17.25 8C16.9185 8 16.6005 7.8683 16.3661 7.63388C16.1317 7.39946 16 7.08152 16 6.75C16 6.41848 16.1317 6.10054 16.3661 5.86612C16.6005 5.6317 16.9185 5.5 17.25 5.5ZM12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7ZM12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9Z" fill="white"/>
    </svg>
    <a href='https://www.facebook.com/profile.php?id=100019355676497' className='uppercase text-base'>imc24</a>
                    </div>
                    <div className='flex gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.2652 15.5 20.5196 15.6054 20.7071 15.7929C20.8946 15.9804 21 16.2348 21 16.5V20C21 20.2652 20.8946 20.5196 20.7071 20.7071C20.5196 20.8946 20.2652 21 20 21C15.4913 21 11.1673 19.2089 7.97918 16.0208C4.79107 12.8327 3 8.50868 3 4C3 3.73478 3.10536 3.48043 3.29289 3.29289C3.48043 3.10536 3.73478 3 4 3H7.5C7.76522 3 8.01957 3.10536 8.20711 3.29289C8.39464 3.48043 8.5 3.73478 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="white"/>
    </svg>
    <a href='tel:+8801722919088' className='uppercase text-base'>01722919088</a>
                    </div>
                </div>
            </div>
        );
    }
    else {
      return <></>
    }
};

export default Footer;