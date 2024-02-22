import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation().pathname;
  return (
    <div className="h-[100vh] flex border  ">
      <nav className="h-full flex flex-col justify-start     bg-grayy   w-[16%] pt-12">
        <div className="flex flex-col  text-darkblue font-medium">
          <Link
            to="/profile"
            className={` h-12 py-3 pl-5 ${
              location === "/profile" &&
              "bg-bgcolor border-r-2 w-[99.5%] border-darkblue border-w"
            }`}
          >
            Profile Informations
          </Link>
          <Link
            to="/profile/history"
            className={` h-12 py-3 pl-5 ${
              location === "/profile/history" &&
              "bg-bgcolor border-r-2 w-[99.5%] border-darkblue border-w"
            }`}
          >
            Order History
          </Link>
          {/*bg-bgcolor  w-[101%] */}
          <Link
            to="/profile/notifications"
            className={` h-12 py-3 pl-5 ${
              location === "/profile/notifications" &&
              "bg-bgcolor border-r-2 w-[99.5%] border-darkblue border-w"
            }`}
          >
            Notifications
          </Link>
          <Link
            to="/profile/settings"
            className={` h-12 py-3 pl-5 ${
              location === "/profile/settings" &&
              "bg-bgcolor border-r-2 w-[99.5%] border-darkblue border-w"
            }`}
          >
            Settings
          </Link>
        </div>
      </nav>
      <div className="w-full     ">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
