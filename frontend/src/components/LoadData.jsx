import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import ScaleLoader from "react-spinners/ScaleLoader";

const LoadData = ({ time, changeValue }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      changeValue(false);
    }, time);
  }, []);

  return (
    <>
      {loading && (
        <div
          className={`${
            location.pathname === "/profile/userDetails"
              ? "bg-bgcolor"
              : "bg-grayy"
          }  "absolute top-0    flex items-center justify-center  w-full   z-30 h-screen "  `}
        >
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
