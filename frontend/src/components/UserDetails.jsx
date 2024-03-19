import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import banner from "../images/banner.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import LoadData from "./LoadData";

const Update = () => {
  const { profileImg, ...currentUser } = useSelector(
    (state) => state.user.currentUser
  );
  const date = new Date(currentUser.createdAt);
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  const formattedDate = `${month} ${year}`;

  const handleLogout = async () => {
    try {
      const data = await fetch("http://localhost:5000/api/auth/logOut", {
        method: "Get",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      {
        /*dispatch(deleteSuccess());*/
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative h-screen">
      <LoadData time={1000} />
      <div className=" relative">
        <div className="bg-black ml-[0.1rem] ">
          <img
            loading="lazy"
            src={banner}
            alt="banner"
            className="w-full max-h-[15rem] min-h-[15rem]  opacity-80 border-b-2 shadow border-pgray  "
          />
        </div>
        <div className=" relative ">
          <img
            className=" h-[10rem] w-[10rem]  -mt-24 ml-10 rounded-full drop-shadow-xl border-2  border-pgray   "
            src={profileImg}
            alt="imageProfile"
          />
        </div>
      </div>
      {/*User Informations */}
      <div className="flex  ">
        <div className="   flex  gap-12 pl-14 mt-5  w-full text-xl font-medium text-pgray">
          <div className="border-r-2  pr-12 border-slate-300 space-y-5 ">
            <p>
              {" "}
              <span className="font-semibold text-darkgray">
                Username :{" "}
              </span>{" "}
              {currentUser.username}
            </p>
            <p>
              {" "}
              <span className="font-semibold text-darkgray">
                FamilyName :
              </span>{" "}
              {currentUser.familyname}
            </p>
            <p>
              <span className="font-semibold text-darkgray">Joined :</span>{" "}
              {formattedDate}
            </p>
          </div>
          <div className="space-y-5 pt-1">
            <p>
              {" "}
              <span className="font-semibold text-darkgray">Email :</span>{" "}
              {currentUser.email}
            </p>
            <p>
              <span className="font-semibold text-darkgray">Status :</span>
              {currentUser.isStudent ? "currently a Student" : "Normal User"}
            </p>
          </div>
        </div>
        <NavLink
          to={"/profile/settings/update"}
          className="pr-8 pt-8 text-bggreen "
        >
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="h-5 cursor-pointer"
          />
        </NavLink>
      </div>
    </div>
  );
};

export default Update;
