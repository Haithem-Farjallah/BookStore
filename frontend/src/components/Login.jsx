import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import google from "../images/Google.svg";
import books from "../images/12331.jpg";
import circle from "../images/circle.png";
import { handleErrors } from "./handleErrors";
import { signInFailure, signInSuccess, SignInStart } from "../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
const Login = () => {
  const { errors, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  let [forms, setForms] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForms({
      ...forms,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
    dispatch(signInFailure({ ...errors, [e.target.name]: "" }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = handleErrors(forms, "login"); //call a function that verify inputs using regex
    if (Object.keys(newErrors).length > 0) {
      dispatch(signInFailure(newErrors));
      return;
    }
    try {
      dispatch(SignInStart);
      const res = await fetch("http://localhost:5000/api/auth/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(forms),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data);
        dispatch(signInFailure({ server: data.message }));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure({ server: error.message }));
    }
  };

  return (
    <div className=" overflow-hidden h-[98vh] bg-gradient-to-tl from-bgreen to-green-300 flex justify-center   ">
      <img src={circle} alt="" className="absolute top-0 right-0  " />
      <div className="  bg-bgcolor mt-8 h-[82%]  w-[45%] flex flex-col justify-center items-center rounded-l-3xl drop-shadow-2xl">
        <h1 className=" text-[#5f5f7e] font-semibold uppercase text-4xl ">
          Welcome Back
        </h1>
        <p className="text-pgray  text-lg my-2">
          Welcome back! Please enter your details.
        </p>
        <form
          onSubmit={handleSubmit}
          method="post"
          className="flex flex-col justify-center items-start  space-y-1  w-[55%]"
        >
          <label htmlFor="email" className="text-pgray font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full h-9 font-meduim placeholder:font-normal py-1 px-2  rounded-lg outline-none shadow-test focus:shadow-testhover"
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
            className="w-full h-9 py-1 px-2   outline-none rounded-lg shadow-test focus:shadow-testhover"
          />
          {errors.password && (
            <p className="text-red-500 text-xs font-bold pl-2">
              {errors.password}
            </p>
          )}
          <div className=" flex justify-between items-center   w-full h-10">
            <div className=" space-x-2">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                onChange={handleChange}
                className=" align-middle outline-none mb-[1px] ml-2 "
              />
              <label
                htmlFor="remember"
                className="text-sm  text-pgray outline-none"
              >
                Remember me
              </label>
            </div>
            <NavLink
              to="/"
              className="text-sm text-pgray hover:text-bgreen hover:underline outline-none mt-1 mr-1 "
            >
              Forgot password
            </NavLink>
          </div>
          {errors.server && (
            <p className="text-red-500 text-xs font-bold pl-2">
              {errors.server}
            </p>
          )}
          <button
            disabled={loading}
            className="bg-bgreen w-full rounded-xl py-2 disabled:opacity-80 hover:opacity-95 text-white outline-green-800 shadow-test hover:shadow-testhover "
          >
            {loading ? "Loading ..." : "Sign In"}
          </button>
        </form>
        <button className="flex justify-center space-x-2 mt-3 mb-5 w-[55%] font-[450] rounded-xl py-2 shadow-test hover:shadow-testhover bg-white text-darkblue outline-gray-500">
          <span>
            <img src={google} alt="google" />
          </span>
          <p>Sign in with google</p>
        </button>
        <div className="flex justify-center space-x-2 text-xs w-[60%] ">
          <p className="text-[#5f5f7e] font-semibold">
            Don't have an account?{" "}
          </p>
          <span className="text-bgreen font-semibold drop-shadow-sm ">
            <NavLink to="/register">Sign up for free !</NavLink>
          </span>
        </div>
      </div>
      <div className="bg-darkbg mt-8 h-[82%] w-[45%] rounded-r-3xl drop-shadow-2xl overflow-hidden ">
        <img src={books} alt="books" className="bg-contain h-full opacity-80" />
      </div>
    </div>
  );
};

export default Login;
