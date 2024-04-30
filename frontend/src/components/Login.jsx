import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import google from "../images/Google.svg";
import circle from "../images/circle.png";
import { handleErrors } from "./handleErrors";
import { signInFailure, signInSuccess, SignInStart } from "../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { getPrevAndNewCarts, getPrevCarts } from "../store/cartSlice";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { domain } from "../domain";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
const Login = () => {
  const [show, setShow] = useState(false); //used to show /hide password
  const { loading } = useSelector((state) => state.user);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const CartBooks = useSelector((state) => state.book);

  let [forms, setForms] = useState({
    email: "",
    password: "",
    remember: true,
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForms({
      ...forms,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = handleErrors(forms, "login"); //call a function that verify inputs using regex
    if (Object.keys(newErrors).length > 0) {
      dispatch(signInFailure(newErrors));
      setErrors(newErrors);
      return;
    }
    try {
      dispatch(SignInStart());
      const res = await fetch(domain + "/api/auth/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(forms),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure({ server: data.message }));
        setErrors({ server: data.message });
        return;
      }
      dispatch(signInSuccess(data));
      try {
        let items;
        const getCarts = await fetch(
          domain + "/api/cart/getBooksAfterLogin", /// will return the books that user added before logging out
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: data._id }),
          }
        );
        items = await getCarts.json();
        // if the data in redux is null (it means user did not pick any book before logging in)
        if (CartBooks.books.length === 0) {
          if (items) {
            console.log("ok");
            dispatch(getPrevCarts(items));
            if (data.isActive === false) {
              navigate("/settings/confirmAccount");
              return;
            }
            navigate("/");
            return;
          }
        }
        const arrayData = items.books || [];
        let totalItems = items.totalItems;
        let totalPrice = items.totalPrice;
        console.log(arrayData);
        ///when the user picked books before logging in
        ///here we will combine both the books chosen before logging in and books chosen before logging out
        const combinedArray = [];
        const combinedObjects = [...arrayData, ...CartBooks.books];

        // Iterate over each object in the combinedObjects array
        combinedObjects.forEach((obj) => {
          // Check if the object with the same id already exists in combinedArray
          const existingObj = combinedArray.find((item) => item.id === obj.id);

          if (existingObj) {
            // If the object exists, update its number and totalPrice
            existingObj.number += obj.number;
            existingObj.totalPrice += obj.totalPrice;
          } else {
            // If the object does not exist, add it to combinedArray
            combinedArray.push(obj);
          }
        });
        console.log(combinedArray);
        totalItems += CartBooks.totalItems;
        totalPrice += CartBooks.totalPrice;
        console.log(totalItems);
        const finalResult = { books: combinedArray, totalItems, totalPrice };
        console.log(finalResult);
        dispatch(getPrevAndNewCarts(finalResult));
        await fetch(domain + "/api/cart/UpdateBooksAfterLogin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...finalResult, userId: data._id }),
        });
        if (data.isActive === false) {
          navigate("settings/confirmAccount");
          return;
        }
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      dispatch(signInFailure({ server: error.message }));
    }
  };

  //login using email :
  const EmailLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className=" overflow-hidden h-[98vh] bg-gradient-to-tl from-bgreen to-green-400 flex justify-center   ">
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
          className="flex flex-col  justify-center items-start  space-y-1  w-[55%]"
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
            className="w-full h-9 font-meduim  text-darkblue placeholder:font-normal border border-gray-400 py-1 px-2  rounded-lg  shadow-test focus:ring-0 focus:border-gray-500 "
          />
          {errors.email && (
            <p className="text-red-500 text-xs font-bold pl-2 ">
              {errors.email}
            </p>
          )}
          <label htmlFor="password" className="text-pgray font-semibold ">
            Password
          </label>
          <div className="flex items-center relative w-full">
            <input
              type={show ? "text" : "password"}
              id="password"
              name="password"
              onChange={handleChange}
              placeholder="********"
              className="w-full h-9 text-darkblue py-1 px-2 pr-8 border border-gray-400  focus:outline-none  rounded-lg shadow-test focus:shadow-testhover focus:ring-0 focus:border-gray-500"
            />
            {show ? (
              <FaEyeSlash
                className="absolute right-[3%] cursor-pointer text-pgray"
                onClick={() => setShow(!show)}
              />
            ) : (
              <FaEye
                className="absolute right-[3%] cursor-pointer text-pgray"
                onClick={() => setShow(!show)}
              />
            )}
          </div>
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
                checked={forms.remember}
                onChange={handleChange}
                className=" text-bgreen mb-[1px] ml-2 focus:ring-0 rounded "
              />
              <label htmlFor="remember" className="text-sm  text-pgray ">
                Remember me
              </label>
            </div>
            <NavLink
              to="/sendRecoverPassword"
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
        <button
          onClick={EmailLogin}
          className="flex justify-center space-x-2 mt-3 mb-5 w-[55%] font-[450] rounded-xl py-2 shadow-test hover:shadow-testhover bg-white text-darkblue outline-gray-500"
        >
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
      <div
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/16689056/pexels-photo-16689056/free-photo-of-view-of-rows-of-bookshelves-in-a-college-library.jpeg?auto=compress&cs=tinysrgb&w=1000&h=100&dpr=1")`,
          backgroundSize: "cover",
        }}
        className="bg-darkbg mt-8 h-[82%] w-[45%] rounded-r-3xl drop-shadow-2xl overflow-hidden "
      >
        <img
          src="https://images.pexels.com/photos/16689056/pexels-photo-16689056/free-photo-of-view-of-rows-of-bookshelves-in-a-college-library.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="books"
          className="bg-contain h-full "
        />
      </div>
    </div>
  );
};

export default Login;
