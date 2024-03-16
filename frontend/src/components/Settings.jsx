import { faArrowRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSuccess } from "../store/userSlice.js";

import { NavLink } from "react-router-dom";

const Settings = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const handleDelete = async () => {
    try {
      const data = await fetch(
        `http://localhost:5000/api/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      dispatch(deleteSuccess());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" h-screen">
      <div className="flex items-center justify-between mt-12 px-5 mx-5 h-20 border border-pgray rounded-lg bg-grayy ">
        <div className="space-y-1 text-darkblue">
          <h1 className="font-bold text-xl">Update Profile</h1>
          <p className="text-sm ml-1 font-medium">
            Keep your profile fresh and up-to-date to enhance your online
            presence !
          </p>
        </div>
        <NavLink to="/profile/settings/update">
          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-white bg-bggreen py-2 px-3 rounded-lg"
          />
        </NavLink>
      </div>
      <div className="flex items-center justify-between mt-12 px-5 mx-5 h-20 border border-pgray rounded-lg bg-grayy ">
        <div className="space-y-1 text-darkblue">
          <h1 className="font-bold text-xl">Delete Account</h1>
          <p className="text-sm ml-1 font-medium">
            This action is{" "}
            <span className="text-red-500 underline">irreversible</span> and
            will permanently remove all your data.
          </p>
        </div>

        <FontAwesomeIcon
          icon={faTrash}
          onClick={handleDelete}
          className="text-white bg-red-500 py-2 px-3 rounded-lg cursor-pointer"
        />
      </div>
      <div></div>
    </div>
  );
};

export default Settings;
