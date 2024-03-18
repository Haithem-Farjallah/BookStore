import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faClockRotateLeft,
  faGear,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { deleteSuccess } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const data = await fetch("http://localhost:5000/api/auth/logOut", {
        method: "Get",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      dispatch(deleteSuccess());
      dispatch(clearCart());
    } catch (error) {
      console.log(error);
    }
  };
  const location = useLocation().pathname;
  return (
    <div className=" flex   ">
      <nav className=" flex flex-col   py-12   bg-grayy   w-[25%] ">
        <div className="flex flex-col    text-[#6c757d] font-medium">
          <NavLink
            to="/profile/userDetails"
            className={` h-12 py-3 pl-10 aria-[current=page]:text-bggreen ${
              location === "/profile/userDetails" &&
              "bg-bgcolor border-r-2 w-[99.9%] border-bggreen border-w"
            }`}
          >
            <FontAwesomeIcon icon={faUser} className="h-4 w-4" /> Profile
            Details
          </NavLink>
          <NavLink
            to="/profile/history"
            className={` h-12 py-3 pl-10 aria-[current=page]:text-bggreen ${
              location === "/profile/history" &&
              "bg-bgcolor border-r-2 w-[99.9%] border-bggreen border-w"
            }`}
          >
            <FontAwesomeIcon icon={faClockRotateLeft} className="h-4 w-4" />{" "}
            Order History
          </NavLink>
          {/*bg-bgcolor  w-[101%] */}
          <NavLink
            to="/profile/notifications"
            className={` h-12 py-3 pl-10 aria-[current=page]:text-bggreen ${
              location === "/profile/notifications" &&
              "bg-bgcolor border-r-2 w-[99.9%] border-bggreen border-w"
            }`}
          >
            <FontAwesomeIcon icon={faBell} className="h-4 w-4" /> Notifications
          </NavLink>
          <NavLink
            to="/profile/settings"
            className={` h-12 py-3 pl-10  aria-[current=page]:text-bggreen ${
              (location === "/profile/settings" ||
                location === "/profile/settings/update") &&
              "bg-bgcolor border-r-2 w-[99.9%] border-bggreen border-w"
            }`}
          >
            <FontAwesomeIcon icon={faGear} className="h-4 w-4 mr-1" />
            Settings
          </NavLink>
          <div
            onClick={handleLogout}
            className=" py-3 pl-10  flex gap-1 items-center cursor-pointer text-red-500 "
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            <p className="">Log Out</p>
          </div>
        </div>
      </nav>
      <div className="w-full  ">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
