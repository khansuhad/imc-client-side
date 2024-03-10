import { Link, NavLink, Outlet } from "react-router-dom";
import SidebarIcon from "./SidebarIcon";
import AdminNavItem from "./AdminNavItem";



const Sidebar = () => {

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col text-sixthColor">
        {/* Page content here */}

        {/* sidebar responsive icon  */}
        <SidebarIcon />

        {/* outlet  */}
        <Outlet />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu py-10 p-4 w-60 md:w-80 min-h-full  bg-[#FFD23F] text-black">
          {/* Sidebar content here */}
        <div><Link to="/" className="btn bg-transparent mb-10 font-semibold text-2xl"> Infinity Match Center</Link></div>
         <AdminNavItem /> 
          {/* common NavLink  */}
          <li className="mt-auto">
    
            <NavLink
              to="/dashboard/profile"
              // className={({ isActive, isPending }) =>
              //   isPending
              //     ? "pending"
              //     : isActive
              //     ? "bg-fourthColor text-white"
              //     : "text-white"
              // }
              className="font-semibold text-2xl"
            >
            Profile
            </NavLink>
          </li>
          {
            <li >
              <Link    className=" text-black font-semibold text-2xl">Logout</Link>
            </li>
          }
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
