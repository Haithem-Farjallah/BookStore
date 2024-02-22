import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSuccess, signInSuccess } from "../store/userSlice";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      if (data.success === false) {
        setErrors({ server: data.message });
        setLoading(false);
        return;
      }

      dispatch(signInSuccess(data));
      setErrors({});
      setLoading(false);
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

  const handleDelete = async () => {
    try {
      const data = await fetch(
        `http://localhost:5000/api/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      console.log(data);
      dispatch(deleteSuccess());
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = async () => {
    try {
      const data = await fetch("http://localhost:5000/api/auth/logOut", {
        method: "Get",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      dispatch(deleteSuccess());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" ">
      <h1 className="text-xl font-semibold pl-12 mt-5 underline underline-offset-4 text-darkblue">
        User Informations:
      </h1>

      <div className="flex justify-between ">
        <div className="  h-[20vh] flex  items-center   gap-4 pl-24 w-full text-lg font-medium text-pgray">
          <div className="border-r-2 pr-5 border-slate-300 space-y-2 ">
            <p>Username: {currentUser.username}</p>

            <p>Familyname: {currentUser.familyname}</p>
          </div>
          <div className="space-y-2">
            <p>email: {currentUser.email}</p>
            <p>
              Status:
              {currentUser.isStudent ? "Student" : "Normal User"}
            </p>
          </div>
        </div>
        <div className="w-[20%]  flex items-start font-medium text-red-400 mr-5 gap-1 flex-col text-end ">
          <div
            onClick={handleLogout}
            className=" p-2 flex gap-1 items-center justify-center cursor-pointer hover:text-red-500"
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            <p className="">Log Out</p>
          </div>
          <div
            onClick={handleDelete}
            className=" p-2 flex gap-2 items-center justify-center cursor-pointer hover:text-red-500"
          >
            <FontAwesomeIcon icon={faTrash} />
            <p className="">Delete Account</p>
          </div>
        </div>
      </div>
      <div className=" h-[60vh]">
        <h1 className="text-xl font-semibold pl-12 underline underline-offset-4 text-darkblue">
          Update Profile Informations :
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col  items-center space-y-5"
        >
          <div className=" w-full flex flex-col items-center">
            <img
              className=" h-[6rem] w-[6rem]  mt-1 rounded-full cursor-pointer"
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
              <p className=" text-bggreen text-xs font-bold pt-1">
                uploading,please wait ...
              </p>
            )}
            {fileError.imageError && (
              <p className=" text-red-500 text-xs font-bold pt-1">
                {fileError.imageError}
              </p>
            )}
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
            {errors.server && (
              <p className=" text-red-500 text-xs font-bold  py-1">
                {errors.server}
              </p>
            )}
            <button
              type="submit"
              disabled={loading || fileloading}
              className=" hover:opacity-95 disabled:opacity-80 w-[30%] rounded-lg h-10 bg-bggreen text-white"
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
