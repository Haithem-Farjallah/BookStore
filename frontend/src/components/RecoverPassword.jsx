import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RecoverPassword = () => {
  const { code } = useParams();
  const [passwordForm, setPasswordForm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const verifyLink = async () => {
      try {
        const res = await fetch(
          "https://book-store-backend-mu.vercel.app/api/auth/verifyLink",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              RecoverPass: code,
            }),
            credentials: "include",
          }
        );
        const data = await res.json();
        console.log(data);
        if (data.statusCode === 403) {
          navigate("/invalidLink");
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    verifyLink();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        "https://book-store-backend-mu.vercel.app/api/auth/recoverPassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            RecoverPass: code,
            newPassword: passwordForm,
          }),
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.statusCode === 403) {
        setLoading(false);
        setError(data.message);
        return;
      }
      navigate("/login");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="h-screen bg-gradient-to-tl from-bgreen to-green-400 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-grayy h-[58vh] w-[50vw] rounded-xl flex flex-col items-center justify-center gap-5 text-center"
      >
        <h1 className="text-3xl font-semibold text-darkblue ">
          Update your Password
        </h1>
        <p className="text-pgray  font-medium text-lg w-[30rem]  mb-2 ">
          We have successfully confirmed its you . Now you can update your
          Password
        </p>
        <input
          type="text"
          autofocus
          value={passwordForm}
          onChange={(e) => {
            setError("");
            setPasswordForm(e.target.value);
          }}
          className="w-[90%] h-14 mx-6 text-center text-lg font-medium rounded-lg  outline-none shadow-md "
        />
        {error && <p className=" font-semibold text-red-500 h-3">{error}</p>}
        <input
          disabled={loading}
          type="submit"
          value={`${loading ? "loading..." : "Update Password "}`}
          className="w-[90%] h-12 bg-bgreen text-white text-lg font-medium rounded-lg  hover:opacity-95 cursor-pointer disabled:opacity-80 shadow-lg"
        />
      </form>
    </div>
  );
};

export default RecoverPassword;
