import { NavLink } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import "./active.css"
const UserNavItem = () => {

  return (
    <>
      <li>
        <NavLink
          to="/dashboard/myCart"
        //   className={({ isActive, isPending }) =>
        //   isPending ? "pending" : isActive ? "abc" : "text-white"
        // }
        >
          <FaCartArrowDown />My cart
        </NavLink>
      </li>

    
    </>
  );
};

export default UserNavItem;
