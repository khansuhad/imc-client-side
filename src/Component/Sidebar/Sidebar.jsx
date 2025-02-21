import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import SidebarIcon from "./SidebarIcon";
import AdminNavItem from "./AdminNavItem";
import { useEffect, useRef } from "react";



const Sidebar = () => {
  const drawerRef = useRef(null); // Reference for the drawer toggle
  const location = useLocation(); // Access the current path

  // Close the drawer whenever the path changes
  useEffect(() => {
    if (drawerRef.current) {
      drawerRef.current.checked = false; // Uncheck the drawer toggle
    }
  }, [location]);
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" ref={drawerRef} type="checkbox" className="drawer-toggle" />
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
        <div className="mb-10"><Link to="/" className=" border-2 rounded cursor-pointer  border-black lg:text-xl bg-transparent  font-semibold  py-2 px-5"> Infinity Math Center</Link></div>
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
              className="font-semibold lg:text-2xl"
            >
            Profile
            </NavLink>
          </li>
          {
            <li >
              <Link    className=" text-black font-semibold lg:text-2xl">Logout</Link>
            </li>
          }
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
