import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Dropdown } from "flowbite-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteSuccess } from "../store/userSlice";
import { clearCart } from "../store/cartSlice";

const DropDownMenu = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logOut", {
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
  return (
    <Dropdown
      placement="bottom-end"
      arrowIcon={false}
      inline
      label={
        <Avatar alt="user" img={currentUser.profileImg} rounded size="xs" />
      }
      className="bg-bgcolor border border-[#ccc] "
    >
      <Dropdown.Header className=" border-b border-[#ccc] ">
        <p className=" text-sm">
          {currentUser.username} {currentUser.familyname}
        </p>
      </Dropdown.Header>
      <Dropdown.Item>
        <NavLink to="/profile/userDetails">Profile Details</NavLink>
      </Dropdown.Item>
      <Dropdown.Item>
        {" "}
        <NavLink to="/profile/settings">Settings</NavLink>
      </Dropdown.Item>
      <Dropdown.Item>
        <NavLink to="/profile/history">Order History</NavLink>
      </Dropdown.Item>
      <Dropdown.Divider className="bg-[#ccc]  " />
      <Dropdown.Item
        onClick={handleLogout}
        className="  flex gap-1 items-center cursor-pointer text-red-500 "
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
        <p className="">Log Out</p>
      </Dropdown.Item>
    </Dropdown>
  );
};

export default DropDownMenu;
