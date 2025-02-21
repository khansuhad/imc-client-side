import { NavLink } from "react-router-dom";
import "./active.css";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";


const AdminNavItem = () => {

  //(userInfo);
 
  const [openSections, setOpenSections] = useState({
    courseEntry: false,
    batchInfo: false,
    admission: false,
    fee: false,
    attendance: false,
    sendSms: false,
    instructor: false,
    generalAccount: false,
    others:false,
    frontend: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (

    <>
      

      <div className="sidebar dashboard-menu lg:text-base  w-full">


      


        <button className="main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none font-medium py-4 px-7" onClick={() => toggleSection('batchInfo')}>
          Batch Info
          <IoIosArrowForward className={`arrow ${openSections.batchInfo ? 'open' : 'ml-5'}`} />
        </button>
        <div className={`sub-routes ${openSections.batchInfo ? 'open  ml-5' : 'ml-5'}`}>
          <NavLink
            to="/dashboard/batch-entry"
             className={({ isActive, isPending }) =>
            isPending ? "pending  hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : isActive ? "active hover:bg-[#F0FBFF]main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : "hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7"
          }     

          >

            Batch Entry

          </NavLink>
          <NavLink
            to="/dashboard/list-of-class"
             className={({ isActive, isPending }) =>
            isPending ? "pending  hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : isActive ? "active hover:bg-[#F0FBFF]main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : "hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7"
          }     

          >

            List of Class

          </NavLink>
          <NavLink
            to="/dashboard/list-of-batch"
             className={({ isActive, isPending }) =>
            isPending ? "pending  hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : isActive ? "active hover:bg-[#F0FBFF]main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : "hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7"
          }     

          >

            List of Batch

          </NavLink>
    
        </div>

        <button className="main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none font-medium py-4 px-7" onClick={() => toggleSection('admission')}>
          Admission
          <IoIosArrowForward className={`arrow ${openSections.admission ? 'open' : 'ml-5'}`} />
        </button>
        <div className={`sub-routes ${openSections.admission ? 'open  ml-5' : 'ml-5'}`}>
          <NavLink
            to="/dashboard/admission"
             className={({ isActive, isPending }) =>
            isPending ? "pending  hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : isActive ? "active hover:bg-[#F0FBFF]main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : "hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7"
          }     

          >

            Admission

          </NavLink>
          {/* <NavLink
            to="/dashboard/pendingAdmission"
             className={({ isActive, isPending }) =>
            isPending ? "pending  hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : isActive ? "active hover:bg-[#F0FBFF]main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : "hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7"
          }     

          >

            Pending admission

          </NavLink> */}
          <NavLink
            to="/dashboard/current-student"
             className={({ isActive, isPending }) =>
            isPending ? "pending  hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : isActive ? "active hover:bg-[#F0FBFF]main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : "hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7"
          }     

          >

            Current Student

          </NavLink>
          <NavLink
            to="/dashboard/print-student"
             className={({ isActive, isPending }) =>
            isPending ? "pending  hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : isActive ? "active hover:bg-[#F0FBFF]main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : "hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7"
          }     

          >

            Print Student

          </NavLink>

        </div>

        <button className="main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none font-medium py-4 px-7" onClick={() => toggleSection('fee')}>
          Fee Receive
          <IoIosArrowForward className={`arrow ${openSections.fee ? 'open' : 'ml-5'}`} />
        </button>
        <div className={`sub-routes ${openSections.fee ? 'open  ml-5' : 'ml-5'}`}>
          <NavLink
            to="/dashboard/fees-entry"
            className={({ isActive, isPending }) =>
              isPending ? "pending  hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : isActive ? "active hover:bg-[#F0FBFF]main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : "hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7"
            }  

          >

            Fees Receive

          </NavLink>
          <NavLink
            to="/dashboard/fees-list"
            className={({ isActive, isPending }) =>
              isPending ? "pending  hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : isActive ? "active hover:bg-[#F0FBFF]main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : "hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7"
            }  

          >

            Fees List

          </NavLink>
   
        </div>
        <button className="main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none font-medium py-4 px-7" onClick={() => toggleSection('attendanceEntry')}>
       Student Attendance
               <IoIosArrowForward className={`arrow ${openSections.attendanceEntry ? 'open' : 'ml-5'}`} />
             </button>
             <div className={`sub-routes ${openSections.attendanceEntry ? 'open ml-5' : 'ml-5'}`}>
               <NavLink
                 to="/dashboard/attendance-record"
         className={({ isActive, isPending }) =>
            isPending ? "pending  hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : isActive ? "active hover:bg-[#F0FBFF]main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : "hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7"
          }      
     
               >
     
                 Attendance Record
     
               </NavLink>
             
             </div>


        <button className="main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none font-medium py-4 px-7" onClick={() => toggleSection('sendSms')}>
          SMS
          <IoIosArrowForward className={`arrow ${openSections.sendSms ? 'open' : 'ml-5'}`} />
        </button>
        <div className={`sub-routes ${openSections.sendSms ? 'open  ml-5' : 'ml-5'}`}>
          <NavLink
        to="/dashboard/sms-history"
 className={({ isActive, isPending }) =>
    isPending ? "pending font-normal text-[18px] hover:bg-[#F0FBFF] " : isActive ? "active font-normal text-[18px] hover:bg-[#F0FBFF] " : "hover:bg-[#F0FBFF]"
  }            


          >

            SMS History

          </NavLink>

          <NavLink
            to="/dashboard/dues-alert"
            className="font-normal text-[18px] hover:bg-[#F0FBFF]"

          >

            Dues Alert
          </NavLink>
        </div>
     

    


  
        {/* <button className="main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none font-medium py-4 px-7" onClick={() => toggleSection('others')}>
          Other Links
          <IoIosArrowForward className={`arrow ${openSections.others ? 'open' : 'ml-5'}`}/>
        </button> */}
        <div className={`sub-routes ${openSections.others ? 'open  ml-5' : 'ml-5'}`}>
        <NavLink
          to="/dashboard/admin/all-users"
          className={({ isActive, isPending }) =>
            isPending ? "pending  hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : isActive ? "active hover:bg-[#F0FBFF]main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : "hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7"
          }      
        
        >
        All Users
        </NavLink>
        <NavLink
          to="/dashboard/teacher/student-send-notice"
          className={({ isActive, isPending }) =>
            isPending ? "pending  hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : isActive ? "active hover:bg-[#F0FBFF]main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : "hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7"
          }      
        
        >
        Send Notices
        </NavLink>
        <NavLink
          to="/dashboard/successful-student"
          className={({ isActive, isPending }) =>
            isPending ? "pending  hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : isActive ? "active hover:bg-[#F0FBFF]main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : "hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7"
          }      
        
        >
        Successful Student
        </NavLink>
        <NavLink
          to="/dashboard/registrations"
          className={({ isActive, isPending }) =>
            isPending ? "pending  hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : isActive ? "active hover:bg-[#F0FBFF]main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : "hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7"
          }      
        
        >
        Registrations
        </NavLink>
        <NavLink
          to="/dashboard/emergency-message"
          className={({ isActive, isPending }) =>
            isPending ? "pending  hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : isActive ? "active hover:bg-[#F0FBFF]main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : "hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7"
          }      
        
        >
       Emergency Message
        </NavLink>
        <NavLink
            to="/dashboard/contact-page"
            className={({ isActive, isPending }) =>
              isPending ? "pending  hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : isActive ? "active hover:bg-[#F0FBFF]main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : "hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7"
            }    

          >

          Contact Page
          </NavLink>
        <NavLink
          to="/dashboard/report"
          className={({ isActive, isPending }) =>
            isPending ? "pending  hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : isActive ? "active hover:bg-[#F0FBFF]main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : "hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7"
          }      
        
        >
       Reports
        </NavLink>
        <NavLink
          to="/dashboard/settings"
          className={({ isActive, isPending }) =>
            isPending ? "pending  hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : isActive ? "active hover:bg-[#F0FBFF]main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : "hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7"
          }   
        >
           Settings
        </NavLink>
        </div>
       
     
     {/* {
      userInfo?.role === 'suparAdmin' && <>
         <button className="main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none font-medium py-4 px-7" onClick={() => toggleSection('frontend')}>
          Frontend
          <IoIosArrowForward className={`arrow ${openSections.frontend ? 'open' : 'ml-5'}`} />
        </button>
        <div className={`sub-routes ${openSections.frontend ? 'open  ml-5' : 'ml-5'}`}>
          <NavLink
            to="/dashboard/frontend/home-page"
             className={({ isActive, isPending }) =>
            isPending ? "pending  hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : isActive ? "active hover:bg-[#F0FBFF]main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : "hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7"
          }     

          >

            Home Page
          </NavLink>
          <NavLink
            to="/dashboard/frontend/about-us"
             className={({ isActive, isPending }) =>
            isPending ? "pending  hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : isActive ? "active hover:bg-[#F0FBFF]main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : "hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7"
          }     

          >

            About Us
          </NavLink>
          <NavLink
            to="/dashboard/frontend/our-founder"
             className={({ isActive, isPending }) =>
            isPending ? "pending  hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : isActive ? "active hover:bg-[#F0FBFF]main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : "hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7"
          }     

          >

           Our Founder
          </NavLink>
         
          <NavLink
            to="/dashboard/frontend/freelancing"
             className={({ isActive, isPending }) =>
            isPending ? "pending  hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : isActive ? "active hover:bg-[#F0FBFF]main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : "hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7"
          }     

          >

          Freelancing
          </NavLink>
          <NavLink
            to="/dashboard/frontend/admin"
             className={({ isActive, isPending }) =>
            isPending ? "pending  hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : isActive ? "active hover:bg-[#F0FBFF]main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : "hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7"
          }     

          >

          Make Admin
          </NavLink>

          <NavLink
            to="/dashboard/frontend/review"
             className={({ isActive, isPending }) =>
            isPending ? "pending  hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : isActive ? "active hover:bg-[#F0FBFF]main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7 " : "hover:bg-[#F0FBFF]  main-button hover:text-blue-700  flex justify-between items-center text-[18px] text-black rounded-none  py-4 px-7"
          }     

          >

          Review
          </NavLink>
        

        </div>
      </>
     } */}

        {/* <button className="main-button hover:text-blue-700 text-[18px] text-black rounded-none font-medium py-4 px-7">
          <NavLink
            to="/dashboard/report"
           

          >

            Report
          </NavLink>
        </button> */}







      </div>


    </>
  );
};

export default AdminNavItem;
