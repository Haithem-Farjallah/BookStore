import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import img7 from "../images/Vector1.png";
import { handleErrors } from "./handleErrors";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    familyname: "",
    email: "",
    password: "",
    confirmpassword: "",
    isStudent: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = handleErrors(formData, "register");
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(
        "https://book-store-backend-mu.vercel.app/api/auth/signUp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setErrors({ server: data.message });
        return;
      }
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setErrors({ server: error.message });
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className=" bg-gradient-to-tl from-bgreen to-green-300 ">
      <img src={img7} alt="" className="float-right  -ml-[15%] " />

      <div className="    pt-14 flex justify-center items-center ">
        <div className="  bg-bgcolor  py-12  w-[60%] flex flex-col justify-center items-center rounded-3xl drop-shadow-2xl">
          <h1 className=" text-[#5f5f7e] font-semibold uppercase text-4xl ">
            Create an account
          </h1>
          <p className="text-pgray  text-lg my-2">
            Create an account to enjoy all our services.
          </p>
          <form
            onSubmit={handleSubmit}
            method="post"
            className="flex flex-col justify-center items-start mt-5 gap-2  w-[60%]"
          >
            <label htmlFor="name" className="text-pgray  font-semibold">
              username
            </label>
            <input
              type="text"
              id="name"
              name="username"
              onChange={handleChange}
              placeholder="Enter your Name"
              className="w-full h-10 font-meduim placeholder:font-normal py-1 px-2 text-darkblue  rounded-lg outline-none shadow-test focus:shadow-testhover"
            />
            {errors.username && (
              <p className="text-red-500 text-xs font-bold pl-2">
                {errors.username}
              </p>
            )}
            <label htmlFor="familyname" className="text-pgray font-semibold">
              Family Name
            </label>
            <input
              type="text"
              id="familyname"
              name="familyname"
              onChange={handleChange}
              placeholder="Enter your Family Name"
              className="w-full h-10 font-meduim placeholder:font-normal py-1 px-2 text-darkblue  rounded-lg outline-none shadow-test focus:shadow-testhover"
            />
            {errors.familyname && (
              <p className="text-red-500 text-xs font-bold pl-2">
                {errors.familyname}
              </p>
            )}

            <label htmlFor="email" className="text-pgray font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full h-10 font-meduim placeholder:font-normal py-1 px-2 text-darkblue  rounded-lg outline-none shadow-test focus:shadow-testhover"
            />
            {errors.email && (
              <p className="text-red-500 text-xs font-bold pl-2">
                {errors.email}
              </p>
            )}
            <label htmlFor="password" className="text-pgray font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              placeholder="********"
              className="w-full h-10 py-1 px-2 text-darkblue  outline-none rounded-lg shadow-test focus:shadow-testhover"
            />
            {errors.password && (
              <p className="text-red-500 text-xs font-bold pl-2">
                {errors.password}
              </p>
            )}
            <label
              htmlFor="confirmpassword"
              className="text-pgray font-semibold"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              onChange={handleChange}
              placeholder="********"
              className="w-full h-10 py-1 px-2 text-darkblue  outline-none rounded-lg shadow-test focus:shadow-testhover"
            />
            {errors.confirmpassword && (
              <p className="text-red-500 text-xs font-bold pl-2">
                {errors.confirmpassword}
              </p>
            )}

            <div className="  space-x-2  mt-1  w-full ">
              <input
                type="checkbox"
                name="isStudent"
                id="isStudent"
                onChange={handleChange}
                className=" align-middle  outline-none mb-[1px] ml-2 accent-bggreen"
              />
              <label
                htmlFor="isStudent"
                className="text-sm  text-pgray outline-none"
              >
                I am currently a Student.
              </label>
            </div>
            {errors.server && (
              <p className="text-red-500  font-medium pl-2">{errors.server}</p>
            )}
            <button
              disabled={loading}
              className="bg-bgreen w-full h-12 hover:opacity-95 disabled:opacity-80 rounded-xl py-2 mt-3  text-white outline-green-800 shadow-test hover:shadow-testhover "
            >
              {loading ? "loading..." : "Sign Up"}
            </button>
          </form>
          <div className="flex justify-center space-x-2 text-xs w-[60%] mt-5 ">
            <p className="text-[#5f5f7e] font-semibold">
              Already have an account?{" "}
            </p>
            <span className="text-bgreen font-semibold drop-shadow-sm ">
              <NavLink to="/login">Sign in here !</NavLink>
            </span>
          </div>
        </div>
      </div>
      <img src={img7} alt="" className="-mt-[250px]  rotate-180" />
    </div>
  );
};

export default Register;
