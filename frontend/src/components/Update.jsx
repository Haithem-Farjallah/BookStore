import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "../store/userSlice";

const Update = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState(currentUser.profileImg);
  const [formData, setFormData] = useState({
    username: "",
    familyname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const inputFileRef = useRef(null);
  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(URL.createObjectURL(selectedImage));
    }
  };
  const handlechange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
  };
  const handleError = () => {
    const newErrors = {};
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) newErrors.email = "unvalid email";
    }
    if (formData.password) {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (
        !passwordRegex.test(formData.password) ||
        formData.password.length < 6
      )
        newErrors.password =
          "Password must contain letters,numbers and symbol and has min 6 caracters ";
    }
    return newErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = handleError(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:5000/api/user/update/${currentUser._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
    } catch (error) {
      setErrors({ server: error.message });
    }
  };
  return (
    <div className="  ">
      <div className=" h-[21vh] flex items-center  gap-4 pl-12 w-full text-lg font-medium text-pgray">
        <img
          className="object-contain h-[14vh] rounded-full"
          src={currentUser.profileImg}
          alt="Profile img"
        />{" "}
        <div className="border-r-2 pr-5 border-slate-300 space-y-2 ">
          <p>
            Username:{" "}
            <span className="text-darkblue">{currentUser.username}</span>{" "}
          </p>

          <p>
            Familyname:{" "}
            <span className="text-darkblue">{currentUser.familyname}</span>
          </p>
        </div>
        <div className="space-y-2">
          <p>
            email: <span className="text-darkblue">{currentUser.email}</span>
          </p>
          <p>
            Status:
            {currentUser.isStudent ? (
              <span className="text-darkblue"> Student</span>
            ) : (
              <span className="text-darkblue">Normal User</span>
            )}
          </p>
        </div>
      </div>
      <div className=" h-[60vh]">
        <h1 className="text-xl font-semibold pl-12  text-darkblue">
          Update Profile Informations :
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col  items-center space-y-5"
        >
          <div className=" w-fullflex flex-col items-center">
            <img
              className=" h-[18vh] rounded-full cursor-pointer"
              src={image}
              alt="imageProfile"
              onClick={() => inputFileRef.current.click()}
            />

            <input
              ref={inputFileRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex w-full">
            <div className=" gap-8 w-full  flex flex-col items-center  justify-center ">
              <div className="space-x-5">
                <label htmlFor="username" className="mr-3">
                  username:
                </label>
                <input
                  type="text"
                  id="username"
                  onChange={handlechange}
                  className="outline-none px-2 h-10 w-[20rem] rounded-lg bg-white border border-gray-400"
                />
                {errors.username && (
                  <p className=" text-red-500 text-xs font-bold pl-24 pt-1">
                    {errors.username}
                  </p>
                )}
              </div>
              <div className="space-x-5">
                <label htmlFor="familyname">familyname:</label>
                <input
                  type="text"
                  id="familyname"
                  onChange={handlechange}
                  className="outline-none px-2 h-10 w-[20rem] rounded-lg bg-white border border-gray-400"
                />
                {errors.familyname && (
                  <p className=" text-red-500 text-xs font-bold pl-24 pt-1">
                    {errors.familyname}
                  </p>
                )}
              </div>
            </div>
            <hr className="h-[8rem]  w-1 bg-darkblue " />
            <div className=" gap-8 flex flex-col items-center w-full  justify-center">
              <div className="space-x-5">
                <label htmlFor="email" className="mr-8">
                  email:
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={handlechange}
                  className="outline-none px-2 h-10 w-[20rem] rounded-lg bg-white border border-gray-400"
                />
                {errors.email && (
                  <p className=" text-red-500 text-xs font-bold pl-20 pt-1">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="space-x-5 ">
                <label htmlFor="password">password:</label>
                <input
                  type="password"
                  id="password"
                  onChange={handlechange}
                  className="outline-none px-2 h-10 w-[20rem] rounded-lg bg-white border border-gray-400"
                />
                {errors.password && (
                  <p className=" text-red-500 text-xs font-bold max-w-[25rem] pl-20 pt-1">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="text-center  w-full">
            <button
              type="submit"
              className=" w-[30%] rounded-lg h-10 bg-bggreen text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
