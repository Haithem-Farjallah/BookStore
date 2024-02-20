import React from "react";
import { useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img3 from "./../images/capture.png";
import {
  faFacebookF,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  const topRef = useRef(null);

  return (
    <div className=" h-[30rem]  flex flex-col justify-around   items-center  bg-grayy">
      <div className="grid grid-cols-5 gap-4 h-[15rem] ml-4 ">
        <div className=" pl-5   ">
          <div className="flex items-center">
            <img
              className="  inline-block h-[4rem] mr-2  pt-2"
              src={img3}
              alt="logo"
            />
            <h2 className="text-bgreen text-2xl font-bold mt-1">E-Book.</h2>
          </div>
          <p className=" border text-pgray font-medium text-lg mx-4  ">
            Shopping has Another Meaning With BookStore .Visit Us and You Will
            Find What Makes You Happy.
          </p>
        </div>
        <div className="  text-center  pt-5">
          <h1 className="text-darkblue font-bold text-xl mb-2">Quick Links</h1>
          <ul className=" flex flex-col  space-y-2 ">
            <li>
              <Link to="/" className="text-pgray  font-semibold   ">
                Home
              </Link>
            </li>
            <li>
              <NavLink to="/books" className="text-pgray   font-semibold   ">
                Books
              </NavLink>
            </li>
            <li>
              <NavLink to="/authors" className="text-pgray  font-semibold ">
                Authors
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog" className="text-pgray  font-semibold ">
                Blog
              </NavLink>
            </li>
          </ul>
        </div>
        <div className=" pt-5 ">
          <h1 className="text-darkblue font-bold mb-2 text-center text-xl ">
            Contact Us
          </h1>
          <p className="text-pgray font-semibold py-2 ">
            Phone Number : +21629890620
          </p>
          <h1 className="text-pgray font-semibold mb-1">
            Or via e-mail Adress:
          </h1>
          <p className="text-pgray font-semibold">
            haithemfarjallah2002@gmail.com
          </p>
        </div>
        <div className="ml-10  flex flex-col col-span-2 mt-5 ">
          <h1 className="text-darkblue font-bold mb-2 text-xl">Subscribe</h1>
          <h1 className="text-darkblue font-bold  text-xl mb-2">
            For Latest News & Updates
          </h1>
          <div className="my-2 mr-5">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full h-12 pl-2 pb-[2px] rounded-2xl shadow-lg outline-none text-pgray font-semibold placeholder:font-medium"
            />
            <button className="-ml-[90px] rounded-2xl bg-bgreen text-white text-sm font-semibold px-2 h-10 shadow-xl ">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div>
        <p>Follow Us</p>
        <div className="flex space-x-5">
          <a href="https://google.com" target="_blank">
            <FontAwesomeIcon icon={faFacebookF} className="text-darkblue" />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faLinkedin} className="text-darkblue" />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faXTwitter} className="text-darkblue" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
