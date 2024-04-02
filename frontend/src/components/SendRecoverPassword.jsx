import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SendRecoverPassword = () => {
  const [emailForm, setEmailForm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/sendRecoverPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailForm }),
        credentials: "include",
      });
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
          Please Insert Your Email
        </h1>
        <p className="text-pgray  font-medium text-lg w-[30rem]  mb-2 ">
          We will send you a link to confirm that it is you and update your
          password
        </p>
        <input
          type="email"
          maxlength="45"
          autofocus
          value={emailForm}
          onChange={(e) => {
            setError("");
            setEmailForm(e.target.value);
          }}
          className="w-[90%] h-14 mx-6 text-center text-lg font-medium rounded-lg  outline-none shadow-md "
        />
        {error && <p className=" font-semibold text-red-500 h-3">{error}</p>}
        <input
          disabled={loading}
          type="submit"
          value={`${loading ? "loading..." : "Send Link "}`}
          className="w-[90%] h-12 bg-bgreen text-white text-lg font-medium rounded-lg  hover:opacity-95 cursor-pointer disabled:opacity-80 shadow-lg"
        />
      </form>
    </div>
  );
};

export default SendRecoverPassword;
