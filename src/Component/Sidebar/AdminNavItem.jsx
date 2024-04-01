import { NavLink } from "react-router-dom";
import "./active.css";
import { MdDashboard } from "react-icons/md";

const AdminNavItem = () => {

  return (
    <>
      <li>
        <NavLink
          to="/dashboard/admissionForm"
   className="font-semibold lg:text-2xl"
          
        >
          <MdDashboard />
          Admission form
       
        </NavLink>
        <NavLink
          to="/dashboard/allstudent"
   className="font-semibold lg:text-2xl"
          
        >
          <MdDashboard />
          All Student
       
        </NavLink>
        <NavLink
          to="/dashboard/createTest"
   className="font-semibold lg:text-2xl"
          
        >
          <MdDashboard />
          Create Test
       
        </NavLink>
        <NavLink
          to="/dashboard/allTest"
   className="font-semibold lg:text-2xl"
          
        >
          <MdDashboard />
         AllTest
       
        </NavLink>
    
      
      
      
      </li>
    </>
  );
};

export default AdminNavItem;
