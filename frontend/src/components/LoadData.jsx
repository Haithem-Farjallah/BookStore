import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import ScaleLoader from "react-spinners/ScaleLoader";

const LoadData = ({ time }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, time);
  }, []);
  loading
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");
  return (
    <>
      {loading && (
        <div className="   absolute top-0   bg-grayy  flex items-center justify-center  w-full   z-30 h-full   ">
          {location.pathname === "/profile/userDetails" ? (
            <ScaleLoader color="#267e6a" height={28} />
          ) : (
            <HashLoader color="#299054" size={50} />
          )}
        </div>
      )}
    </>
  );
};

export default LoadData;
