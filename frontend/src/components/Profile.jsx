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
    } catch (error) {
      console.log(error);
    }
  };
  const location = useLocation().pathname;
  return (
    <div className="h-[91vh] flex border  ">
      <nav className=" flex flex-col justify-between py-12   bg-grayy   w-[16%] ">
        <div className="flex flex-col  text-[#666] font-medium">
          <NavLink
            to="/profile/update"
            className={` h-12 py-3 pl-5 aria-[current=page]:text-bggreen ${
              location === "/profile/update" &&
              "bg-bgcolor border-r-2 w-[99.5%] border-bggreen border-w"
            }`}
          >
            <FontAwesomeIcon icon={faUser} className="h-4 w-4" /> Profile
            Details
          </NavLink>
          <NavLink
            to="/profile/history"
            className={` h-12 py-3 pl-5 aria-[current=page]:text-bggreen ${
              location === "/profile/history" &&
              "bg-bgcolor border-r-2 w-[99.5%] border-bggreen border-w"
            }`}
          >
            <FontAwesomeIcon icon={faClockRotateLeft} className="h-4 w-4" />{" "}
            Order History
          </NavLink>
          {/*bg-bgcolor  w-[101%] */}
          <NavLink
            to="/profile/notifications"
            className={` h-12 py-3 pl-5 aria-[current=page]:text-bggreen ${
              location === "/profile/notifications" &&
              "bg-bgcolor border-r-2 w-[99.5%] border-bggreen border-w"
            }`}
          >
            <FontAwesomeIcon icon={faBell} className="h-4 w-4" /> Notifications
          </NavLink>
          <NavLink
            to="/profile/settings"
            className={` h-12 py-3 pl-5  aria-[current=page]:text-bggreen ${
              location === "/profile/settings" &&
              "bg-bgcolor border-r-2 w-[99.5%] border-bggreen border-w"
            }`}
          >
            <FontAwesomeIcon icon={faGear} className="h-4 w-4 mr-1" />
            Settings
          </NavLink>
        </div>
        <div
          onClick={handleLogout}
          className=" p-2  flex gap-1 items-center pl-5 cursor-pointer text-red-500 hover:opacity-90"
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          <p className="">Log Out</p>
        </div>
      </nav>
      <div className="w-full     ">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
