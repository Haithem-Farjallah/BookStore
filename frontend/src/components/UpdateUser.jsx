import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "../store/userSlice.js";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: "",
    familyname: "",
    email: "",
    password: "",
    file: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState({});
  const [fileloading, setFileloading] = useState(false);

  const inputFileRef = useRef(null);
  const date = new Date(currentUser.createdAt);
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  const formattedDate = `${month} ${year}`;

  const navigate = useNavigate();

  //handle the Image when it changes
  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const imageTypes = ["image/jpeg", "image/png"];
      if (!imageTypes.includes(selectedImage.type)) {
        setFileError({ imageError: "please choose image type only !" });
        return;
      }
      handleFileSubmit(selectedImage);
      setFileError({});
    }
  };
  const handlechange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "", server: "" });
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
    console.log(formData);
    e.preventDefault();
    if (fileError.imageError) {
      return;
    }
    const newErrors = handleError(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        setErrors({ server: data.message });
        setLoading(false);
        return;
      }

      dispatch(signInSuccess(data));
      setErrors({});
      setLoading(false);
      navigate("/profile/userDetails");
    } catch (error) {
      console.log(error);
      setErrors({ server: error.message });
      setLoading(false);
    }
  };
  const handleFileSubmit = (file) => {
    setFileloading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          setFile(downloadURL);
          setFormData({ ...formData, file: downloadURL });
          setFileloading(false);
        });
      })
      .catch((error) => {
        // Handle any potential errors with the upload
        console.error("Error uploading file:", error);
      });
  };

  return (
    <div className="relative ">
      <h1 className="text-xl font-semibold pl-12 py-6 underline underline-offset-4 text-darkblue">
        Update Your Profile Informations :
      </h1>
      <form onSubmit={handleSubmit} className=" h-screen flex justify-center  ">
        <div className=" w-[50%] h-auto flex flex-col   mt-12 items-center">
          <img
            className={`${
              fileloading && " opacity-50 cursor-wait "
            } h-[20rem] w-[20rem]   rounded-full cursor-pointer`}
            src={file ? file : currentUser.profileImg}
            alt="imageProfile"
            onClick={() => inputFileRef.current.click()}
          />

          <input
            disabled={fileloading}
            ref={inputFileRef}
            type="file"
            name="file"
            className="hidden "
            onChange={handleFileChange}
          />
          {fileloading && (
            <p className=" text-bggreen text-xs font-bold pt-5">
              uploading,please wait ...
            </p>
          )}
          {fileError.imageError && (
            <p className=" text-red-500 text-xs font-bold pt-5">
              {fileError.imageError}
            </p>
          )}
        </div>

        {/* */}
        <div className=" w-[80%] flex flex-col justify-center space-y-10 items-center  h-[75%] ">
          <div className="space-x-5">
            <label htmlFor="username" className="text-darkgray font-semibold ">
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
          <div className="space-x-4">
            <label
              htmlFor="familyname"
              className="text-darkgray font-semibold "
            >
              familyname:
            </label>
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

          <div className="space-x-5">
            <label
              htmlFor="email"
              className="text-darkgray font-semibold mr-10"
            >
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
          <div className="space-x-6 ">
            <label htmlFor="password" className="text-darkgray font-semibold ">
              password:
            </label>
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
          <div className="text-center  w-full">
            {
              <p className=" text-red-500 text-xs ml-[6.5rem] font-bold  py-1">
                {errors.server}
              </p>
            }
            <button
              type="submit"
              disabled={loading || fileloading}
              className=" hover:opacity-95 disabled:opacity-80 disabled:cursor-not-allowed w-[20rem] ml-[6.5rem] rounded-lg h-10 bg-bggreen text-white"
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Update;
