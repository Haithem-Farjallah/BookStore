import React, { useState } from "react";
import background from "../images/background.svg";
import ContactUs from "../images/ContactUs.svg";
import location from "../images/Group 17.svg";
import call from "../images/Group 18.svg";
import mail from "../images/Group 19.svg";

const Contact = () => {
  const [formData, setformData] = useState({
    username: "",
    email: "",
    text: "",
  });
  console.log(formData);
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("working ");
  };
  return (
    <div className="h-screen relative">
      {/* Background image */}
      <img
        src={background}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover "
      />

      {/* Form container */}
      <div className="absolute top-0 w-full h-[95vh] flex items-center justify-center ">
        <div className="bg-white p-8 flex justify-around gap-5 h-[80vh] w-[80%] shadow-2xl rounded-lg ">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-[50%] h-full"
          >
            <div className="mb-5">
              <h1 className="text-3xl text-bgreen my-2 font-[Oswald]">
                Get In Touch
              </h1>
              <p className="text-lg font-medium text-pgray">
                We are here for you ! How can we help ?
              </p>
            </div>
            <input
              type="text"
              onChange={handleChange}
              id="username"
              placeholder="Enter your name"
              className="mb-4   h-12 px-4 rounded text-darkblue bg-grayy outline-none placeholder:text-[#9F9F9F]"
            />
            <input
              type="email"
              onChange={handleChange}
              id="email"
              placeholder="Enter your email"
              className="mb-4   h-12 px-4 rounded text-darkblue bg-grayy outline-none placeholder:text-[#9F9F9F]"
            />
            <textarea
              onChange={handleChange}
              id="text"
              placeholder="Go ahead,we are listening..."
              rows="5"
              cols="30"
              className="mb-4  w-full  h-32 resize-none px-4 pt-4 rounded text-darkblue bg-grayy outline-none placeholder:text-[#9F9F9F]"
            ></textarea>
            <button
              type="submit"
              className="bg-bgreen text-white py-2 px-4 rounded hover:opacity-95"
            >
              Submit
            </button>
          </form>
          <div className="flex  flex-col items-center justify-around">
            <img src={ContactUs} alt="Image" className="h-[247px]" />
            <div className="space-y-2">
              <div className="flex gap-2">
                <img src={location} alt="location" />
                <h1>Bardo, Tunis</h1>
              </div>
              <div className="flex gap-2">
                <img src={call} alt="call" />
                <h1>29890620</h1>
              </div>
              <div className="flex gap-2">
                <img src={mail} alt="mail" />
                <h1>haithemfarjallah2002@gmail.com</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
