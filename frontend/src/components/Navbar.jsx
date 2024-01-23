import React from "react";
import img3 from "./../images/capture.png";
import Search from "./Search";
import Cart from "./Cart";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [show, setShow] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const outside = (e) => {
    if (e.target.classList.contains("outside")) {
      setShow(!show);
    }
  };

  useEffect(() => {
    show || openCart
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [show, openCart]);

  return (
    <div className=" shadow-sm w-screen  h-20 flex justify-start items-center ">
      <img src={img3} alt="aa" className="  md:w-64  w-44  " />

      <div className="  flex w-full h-full justify-end items-center">
        <ul className=" space-x-9 ">
          <NavLink
            to="/"
            className="text-pgray  aria-[current=page]:text-bgreen   font-semibold  "
          >
            Home
          </NavLink>
          <NavLink
            to="/books"
            className="text-pgray  aria-[current=page]:text-bgreen font-semibold "
          >
            Books
          </NavLink>
          <NavLink
            to="/authors"
            className="text-pgray  aria-[current=page]:text-bgreen font-semibold "
          >
            Authors
          </NavLink>
          <NavLink
            to="/blog"
            className="text-pgray  aria-[current=page]:text-bgreen font-semibold "
          >
            Blog
          </NavLink>
        </ul>
        <div className="space-x-3 h-full w-96 flex justify-center items-center ml-9 mr-10">
          <NavLink to="/login">
            {" "}
            <button className="border border-bgreen px-8 py-2 text-pgray font-semibold rounded-xl shadow-md">
              {" "}
              Sign in{" "}
            </button>{" "}
          </NavLink>
          <NavLink to="/register">
            {" "}
            <button className="border bg-bgreen px-8 py-2 text-white font-bold rounded-2xl shadow-md">
              Sign up
            </button>
          </NavLink>
          <FontAwesomeIcon
            icon={faCartShopping}
            onClick={() => setOpenCart(!openCart)}
            className="text-bgreen w-6 h-5 cursor-pointer"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6 inline fill-bgreen cursor-pointer"
            onClick={() => setShow(!show)}
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {show && (
          <Search outside={outside} closeWindow={() => setShow(!show)} />
        )}
      </div>
      {openCart && (
        <Cart outside={outside} close={() => setOpenCart(!openCart)} />
      )}
    </div>
  );
}

export default Navbar;
