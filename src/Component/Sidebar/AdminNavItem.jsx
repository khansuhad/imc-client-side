import { NavLink } from "react-router-dom";
import "./active.css";
import { MdDashboard } from "react-icons/md";

const AdminNavItem = () => {

  return (
    <>
      <li>
        <NavLink
          to="/dashboard/admissionForm"
   className="font-semibold text-2xl"
          
        >
          <MdDashboard />
          Admission form
       
        </NavLink>
        <NavLink
          to="/dashboard/allstudent"
   className="font-semibold text-2xl"
          
        >
          <MdDashboard />
          All Student
       
        </NavLink>
    
      
      
      
      </li>
    </>
  );
};

export default AdminNavItem;
