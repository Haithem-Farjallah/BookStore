import { Fragment, useState, useEffect, useRef } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import Search from "./Search";
import img3 from "./../images/capture.png";
import Cart from "./Cart";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import LoadData from "./LoadData";
import DropDownMenu from "./DropDownMenu";

const navigation = {
  pages: [
    { name: "Home", href: "/" },
    { name: "Books", href: "/books" },
    { name: "Blog", href: "/Blog" },
  ],
};

export default function Navbar() {
  const bodyRef = useRef(document.body);
  const [value, setValue] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const { totalItems } = useSelector((state) => state.book);
  let location = useLocation();
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [HideNavbar, setHideNavBar] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const outside = (e) => {
    if (e.target.classList.contains("outside")) {
      setShow(!show);
    }
    if (e.target.classList.contains("closeCart")) {
      setOpenCart(!openCart);
    }
  };
  const changeNavBarBackground = () => {
    if (window.scrollY > scrollY) {
      //when we scroll down
      setHideNavBar(true);
    } else {
      //when we scroll up
      setHideNavBar(false);
    }
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavBarBackground);
  }, [scrollY]);

  //To prevent scrolling when opening search and cart :
  useEffect(() => {
    show || openCart || value
      ? (bodyRef.current.style.overflow = "hidden")
      : (bodyRef.current.style.overflow = "auto");
  }, [show, openCart, value]);

  return (
    <div className="relative bg-white border  z-30">
      <LoadData time={3000} changeValue={(value) => setValue(value)} />
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <NavLink
                        to={page.href}
                        className="-m-2 block hover:bg-green-100/50 p-2 font-medium text-gray-900 "
                      >
                        {page.name}
                      </NavLink>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <NavLink
                      to="/login"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign in
                    </NavLink>
                  </div>
                  <div className="flow-root">
                    <NavLink
                      to="/register"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Create account
                    </NavLink>
                  </div>
                </div>

                {/*<div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">
                      CAD
                    </span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>*/}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header
        className={`${
          HideNavbar && location.pathname === "/" && " -translate-y-96"
        }   ${
          location.pathname === "/" && "fixed"
        } bg-bgcolor/90 -mt-1  w-full  z-20 backdrop-blur-md transform duration-[0.3s]`}
      >
        <nav aria-label="Top" className="  sm:px-6   shadow-sm ">
          <div className="flex items-center h-[4.5rem] ">
            {/*menu button for mobile*/}
            <button
              type="button"
              className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              onClick={() => setOpen(true)}
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Logo */}
            <div className="  h-full ml-12  ">
              <NavLink to="/">
                <img
                  className="  h-full float-right  pt-2"
                  src={img3}
                  alt="logo"
                />
              </NavLink>
            </div>

            {/* Flyout menus */}
            <Popover.Group className="hidden   lg:block lg:self-stretch ">
              <div className="flex items-center  h-full w-auto  ml-8">
                <ul className=" space-x-8  ">
                  <NavLink
                    to="/"
                    className="text-darkblue/90 hover:text-gray-900 aria-[current=page]:text-bgreen   font-medium  "
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/books"
                    className="text-darkblue/90 hover:text-gray-900 aria-[current=page]:text-bgreen font-medium "
                  >
                    Books
                  </NavLink>
                  <NavLink
                    to="/Contact"
                    className="text-darkblue/90 hover:text-gray-900 aria-[current=page]:text-bgreen font-medium "
                  >
                    Contact
                  </NavLink>
                </ul>
              </div>
            </Popover.Group>

            <div className="ml-auto lg:mr-14 flex items-center">
              {currentUser ? (
                <DropDownMenu />
              ) : (
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <NavLink
                    to="/login"
                    className=" font-medium text-darkblue/90 hover:text-gray-900"
                  >
                    Sign in
                  </NavLink>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <NavLink
                    to="/register"
                    className=" font-medium text-darkblue/90 hover:text-gray-900"
                  >
                    Create account
                  </NavLink>
                </div>
              )}
              {/*Currency*/}
              {/*<div className="hidden lg:ml-8 lg:flex">
                <a
                  href="#"
                  className="flex items-center text-gray-700 hover:text-gray-800"
                >
                  <img
                    src="https://tailwindui.com/img/flags/flag-canada.svg"
                    alt=""
                    className="block h-auto w-5 flex-shrink-0"
                  />
                  <span className="ml-3 block text-sm font-medium">CAD</span>
                  <span className="sr-only">, change currency</span>
                </a>
              </div>*/}

              {/* Search */}
              <div className="flex lg:ml-6">
                <span className="sr-only">Search</span>

                <MagnifyingGlassIcon
                  className="h-6 w-6 text-gray-400 hover:text-gray-500 cursor-pointer font-bold"
                  onClick={() => setShow(!show)}
                  aria-hidden="true"
                />
              </div>

              {/* Cart */}
              <div className="ml-4 flow-root lg:ml-6">
                <div
                  className="group -m-2 flex items-center p-2 cursor-pointer "
                  onClick={() => setOpenCart(!openCart)}
                >
                  <ShoppingBagIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {totalItems}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {openCart && (
        <Cart outside={outside} close={() => setOpenCart(!openCart)} />
      )}
      {show && <Search outside={outside} closeWindow={() => setShow(!show)} />}
    </div>
  );
}

{
  /*import React from "react";
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
*/
}
