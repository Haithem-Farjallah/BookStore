import React from "react";
import dark from "../images/darkbg.svg";
import portal from "../images/Portal.svg";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-[#37474F]  h-[90vh] relative ">
      <img src={dark} alt="darkbg" className=" w-full absolute object-cover" />
      <div className="absolute flex items-center justify-evenly h-full w-full">
        <div className="w-[45%] h-[50vh] flex flex-col justify-center gap-8 ">
          <h1 className="text-7xl text-bgcolor font-bold">
            Go Home, <br /> You're Lost !
          </h1>
          <NavLink
            to="/"
            className="bg-bgreen text-bgcolor text-lg rounded-3xl px-5 py-3 w-fit hover:opacity-90"
          >
            Back To Home
          </NavLink>
        </div>
        <img src={portal} alt="portal" className="h-[75vh] mt-5   " />
      </div>
    </div>
  );
};

export default NotFound;
