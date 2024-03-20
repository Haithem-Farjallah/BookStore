import React from "react";
import { useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img3 from "./../images/capture.png";
import {
  faFacebook,
  faFacebookF,
  faGithub,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  return (
    <div className="   flex flex-col   justify-around   h-[65vh] bg-grayy">
      <div className=" flex justify-around    ">
        <div className="flex flex-col gap-2   ">
          <div className="flex items-center  ">
            <img
              className="  inline-block h-[4rem] mr-2  pt-2"
              src={img3}
              alt="logo"
            />
            <h1 className="text-bggreen text-2xl font-bold mt-1">E-Book</h1>
          </div>
          <div className=" w-96  mb-10  font-semibold text-darkgray">
            Where Shopping Transforms into a Meaningful Adventure. Explore Our
            Diverse Selection and Embrace the Thrill of Finding What Sparks Your
            Joy. Visit Us Today and Let the Magic of Books Brighten Your World."{" "}
            <br />
          </div>
          <div className="flex gap-4  ">
            <a
              href="https://www.facebook.com/HaithemFarjallah55"
              target="_blank"
            >
              <FontAwesomeIcon
                icon={faFacebook}
                className="hover:opacity-80 h-5 text-darkblue "
              />
            </a>
            <a href="https://twitter.com/Haithem_2002" target="_blank">
              <FontAwesomeIcon
                icon={faXTwitter}
                className="hover:opacity-80 h-5 text-darkblue "
              />
            </a>
            <a
              href="https://www.linkedin.com/in/haithem-farjallah-441b002a0/"
              target="_blank"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                className="hover:opacity-80 h-5 text-darkblue "
              />
            </a>
            <a href="https://github.com/Haithem-Farjallah" target="_blank">
              <FontAwesomeIcon
                icon={faGithub}
                className="hover:opacity-80 h-5 text-darkblue "
              />
            </a>
          </div>
        </div>
        <div className="flex flex-col -ml-20  gap-5   ">
          <h1 className="text-darkblue text-xl mt-5 font-semibold">Pages</h1>
          <ul className="font-medium text-lg space-y-2 ">
            <li>
              <Link to="/" className="text-pgray  hover:text-darkgray    ">
                Home Page
              </Link>
            </li>
            <li>
              <NavLink
                to="/books"
                className="text-pgray   hover:text-darkgray      "
              >
                Books
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/authors"
                className="text-pgray  hover:text-darkgray     "
              >
                Authors
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className="text-pgray   hover:text-darkgray   "
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-darkblue text-xl my-5 font-semibold">
            Maps Location
          </h1>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2524.006990356865!2d10.147998774699703!3d36.831175765954754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd336d799f572f%3A0xd76cd2f181413e41!2sCampus%20Universitaire%20El%20Manar%201%2C%20Tunis!5e1!3m2!1sen!2stn!4v1710935481188!5m2!1sen!2stn"
            width="359"
            height="214"
            allowfullscreen=""
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <h1 className="font-semibold text-lg text-darkblue">
          © 2024 E-Book | Powered by Haithem Farjallah
        </h1>
      </div>
    </div>
  );
};

export default Footer;
