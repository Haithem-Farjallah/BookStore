import React, { useRef, useState } from "react";
import background from "../images/background.svg";
import ContactUs from "../images/ContactUs.svg";
import location from "../images/Group 17.svg";
import call from "../images/Group 18.svg";
import mail from "../images/Group 19.svg";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [formData, setformData] = useState({
    username: "",
    email: "",
    text: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.text) newErrors.text = "Text is required";
    if (!formData.email) newErrors.email = "email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) newErrors.email = "unvalid email";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    emailjs
      .sendForm("service_0q5gm5a", "template_6uco05h", form.current, {
        publicKey: "onvPj8Zp_qJPbhiBW",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          setLoading(false);
        },
        (error) => {
          console.log("FAILED...", error.text);
          setLoading(false);
        }
      );
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
        <div className="bg-bgcolor p-8 flex justify-around gap-5 h-[80vh] w-[80%] shadow-2xl rounded-lg ">
          <form
            onSubmit={sendEmail}
            ref={form}
            className="flex flex-col w-[50%] h-full"
          >
            <div className="mb-2">
              <h1 className="text-3xl text-bgreen mb-2 font-[Oswald]">
                Get In Touch
              </h1>
              <p className="text-lg font-medium text-pgray">
                We are here for you ! How can we help ?
              </p>
            </div>
            <div className={`${errors.username ? "mb-1" : "mb-4"}`}>
              <input
                type="text"
                onChange={handleChange}
                id="username"
                name="user_name"
                placeholder="Enter your name"
                className=" h-12 w-full px-4 rounded text-darkblue bg-grayy outline-none placeholder:text-[#9F9F9F]"
              />
              {errors.username && (
                <p className="text-red-500 text-xs font-bold pl-2 mt-1">
                  {errors.username}
                </p>
              )}
            </div>

            <div className={`${errors.email ? "mb-1" : "mb-4"}`}>
              <input
                type="email"
                onChange={handleChange}
                id="email"
                name="user_email"
                placeholder="Enter your email"
                className="  h-12 w-full px-4 rounded text-darkblue bg-grayy outline-none placeholder:text-[#9F9F9F]"
              />
              {errors.email && (
                <p className="text-red-500 text-xs font-bold pl-2 mt-1">
                  {errors.email}
                </p>
              )}
            </div>
            <div className={`${errors.text ? "mb-1" : "mb-4"}`}>
              <textarea
                onChange={handleChange}
                id="text"
                name="message"
                placeholder="Go ahead,we are listening..."
                rows="5"
                cols="30"
                className=" w-full  h-32 resize-none px-4 pt-4 rounded text-darkblue bg-grayy outline-none placeholder:text-[#9F9F9F]"
              ></textarea>
              {errors.text && (
                <p className="text-red-500 text-xs font-bold pl-2 mb-4">
                  {errors.text}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-bgreen text-white py-2 px-4 rounded hover:opacity-95 disabled:opacity-90"
            >
              {loading ? "Sending..." : "Send"}
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
