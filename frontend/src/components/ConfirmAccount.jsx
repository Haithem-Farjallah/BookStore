import React, { useEffect, useRef, useState } from "react";
import icon from "../images/Icon.svg";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
const ConfirmAccount = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [otp, setOtp] = useState(new Array(5).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const handleChange = (e, index) => {
    setError("");
    const value = e.target.value;
    if (isNaN(value) || value === " ") return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    //focus next input
    if (index < 4 && value) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1); /// to move cursor on right of input
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length === 5) {
      setLoading(true);
      ///here we get the code and if matches we change user status
      //we could do it in a single request !!
      try {
        const res = await fetch("/api/user/getUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: currentUser._id,
            email: currentUser.email,
          }),
        });
        const userCode = await res.json();
        if (userCode == code) {
          const result = await fetch("/api/user/ActivateAccount", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: currentUser._id }),
            credentials: "include",
          });
          console.log();
          const ActiveUser = await result.json();
          dispatch(signInSuccess(ActiveUser));
          setLoading(false);
          navigate("/");
        } else {
          setError("Invalid OTP ! ");
          setLoading(false);
          return;
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setError("insert all fields !");
      return;
    }
  };
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  return (
    <div className="h-[90vh] flex flex-col items-center justify-center  bg-gradient-to-tl from-bgreen to-green-400 ">
      <div className="flex flex-col items-center justify-center gap-2 text-center  bg-grayy border   shadow-xl rounded-xl h-[70vh] w-[40%]">
        <img src={icon} alt="image" className="h-20" />

        <h1 className="text-darkblue font-semibold text-2xl mx-5">
          OTP Verification
        </h1>
        <p className="text-pgray font-medium text-lg w-[20rem]  mb-2 ">
          We have sent the verification code to your email address
        </p>

        <div className={`${error ? "mb-2" : "mb-5"}  `}>
          {otp.map((value, index) => (
            <input
              type="text"
              value={value}
              key={index}
              ref={(input) => (inputRefs.current[index] = input)}
              onChange={(e) => handleChange(e, index)}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-14 h-14 mx-6 text-center text-lg font-medium rounded-lg focus: outline-none"
            />
          ))}
        </div>
        {error && <p className=" font-semibold text-red-500">{error}</p>}
        <input
          type="button"
          value={`${loading ? "Verifying..." : "Confirm"}`}
          disabled={loading}
          onClick={handleSubmit}
          className="w-[90%] h-12 bg-bgreen text-white text-lg font-medium rounded-lg  hover:opacity-95 cursor-pointer disabled:opacity-80"
        />
      </div>
    </div>
  );
};

export default ConfirmAccount;
