import React, { useState, useEffect, useRef } from "react";

import { NavLink, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import img from "./../../images/img.png";
import img1 from "./../../images/img1.png";
import blob from "./../../images/blob.svg";
import blob1 from "./../../images/blobright.svg";
import blob2 from "./../../images/blob2.svg";
import img4 from "./../../images/img4.png";
import img5 from "./../../images/img5.png";
import img6 from "./../../images/img6.png";
import img7 from "./../../images/img7.png";
import img8 from "./../../images/Books.png";
import img10 from "./../../images/img10.png";
import phone from "./../../images/phone.svg";
import books from "./../../images/books.jpg";
import delivery from "./../../images/delivery.png";
import customerService from "./../../images/customer-service.jpg";
import pick from "./../../images/pick.jpg";
import playstore from "./../../images/playstore.png";
import appstore from "./../../images/appstore.png";

import computer from "./../../images/Computer.png";
import user1 from "./../../images/user1.png";
import user2 from "./../../images/user2.png";
import user3 from "./../../images/user3.png";
import vector from "./../../images/Vector.png";
import moveto from "./../../images/moveto.png";
import CountdownTimer from "./CounterDown";
import LoadData from "../LoadData";
import Sliders from "./Sliders";
import { domain } from "../../domain";
import { useSelector } from "react-redux";

import { motion } from "framer-motion";
function Home() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [search] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getBestBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch(domain + "/api/book/getAllBooks");
        const data = await res.json();
        setResults(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getBestBooks();
  }, []);

  return (
    <div className="   pt-24 ">
      <div className=" flex  justify-around   mb-5   md:scale-105 ">
        <motion.div
          initial={{ opacity: 0, translateX: -40 }}
          whileInView={{ opacity: 1, translateX: 0 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
          viewport={{ once: true }}
          className=" flex flex-col  lg:items-start items-center  lg:ml-12 px-5 sm:space-y-6 space-y-7  pt-8 lg:w-title_width  md:w-widthtitle"
        >
          <h1 className=" drop-shadow-xl sm:text-7xl text-6xl lg:w-title_width md:px-5 lg:px-0 pl-1 sm:pl-0 text-center lg:text-left  text-darkblue font-bold  ">
            Get your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br  from-[#29A354] to-gray-200">
              Books
            </span>{" "}
            online and Read them for free.
          </h1>
          <p className="drop-shadow-2xl md:text-xl text-lg md:w-title_width w-full text-center lg:text-left  text-pgray mb-4 ">
            Discover the best prices for buying books in our marketplace. Buy
            and read with confidence today!
          </p>
          <div className=" w-fit ">
            <NavLink to={currentUser ? "/books" : "/login"}>
              <input
                type="button"
                value="Get Started "
                className=" drop-shadow-xl bg-bgreen cursor-pointer hover:opacity-95 text-white shadow-xl px-5 py-3 rounded-xl font-semibold"
              />
            </NavLink>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, translateX: 40 }}
          whileInView={{ opacity: 1, translateX: 0 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
          viewport={{ once: true }}
          className="relative mt-1 mr-5 hidden lg:block"
        >
          <img
            src={img1}
            alt=""
            className="relative z-10 mt-8 w-imagewidth  inline "
          />
          <img
            src={blob}
            alt=""
            className="absolute top-0 inline left-0 ml-3  mt-12 w-imagewidth   "
          />
        </motion.div>
      </div>
      {/*<img className="w-screen z-10 " src={wave} alt="" />*/}
      {/* part 2 of the home page */}
      <div className=" pt-4  ">
        <svg
          className=" h-[30px]  fill-grayy    w-full"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 240 24"
          enablebackground="new 0 0 240 24"
          preserveAspectRatio="none"
        >
          <path d="M119.849,0C47.861,0,0,24,0,24h240C240,24,191.855,0.021,119.849,0z"></path>
        </svg>
      </div>

      <div className="  -mt-1 pt-24 pb-1  flex flex-col   bg-grayy  relative overflow-hidden">
        <div className=" flex flex-col justify-center items-center h-fit  ">
          <motion.h1
            initial={{ opacity: 0, translateY: -40 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ ease: "easeOut", duration: 0.5 }}
            viewport={{ margin: "-250px", once: true }}
            className="text-7xl text-darkblue font-bold mb-8 "
          >
            why choose our online Store ?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, translateY: -40 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ ease: "easeOut", duration: 0.5, delay: 0.5 }}
            viewport={{ amount: "all", once: true }}
            className="text-[28px] font-medium w-[50%] mb-8 text-center text-pgray "
          >
            Shop online and save! Access, read, practice, and engage with
            digital content.
          </motion.p>
        </div>
        <div className=" my-2 mb-12 ">
          <div className="flex justify-around items-center my-12 ml-4">
            <motion.img
              initial={{ opacity: 0, translateX: -40 }}
              whileInView={{ opacity: 1, translateX: 0 }}
              transition={{ ease: "easeOut", duration: 0.5 }}
              viewport={{ margin: "-300px", once: true }}
              loading="lazy"
              src={books}
              alt="books"
              className=" h-[590px] rounded-full 
              "
            />
            <motion.div
              initial={{ opacity: 0, translateX: 40 }}
              whileInView={{ opacity: 1, translateX: 0 }}
              transition={{ ease: "easeOut", duration: 0.5 }}
              viewport={{ margin: "-300px", once: true }}
              className="  w-[55%]  text-bggreen  h-[400px] p-5  flex flex-col justify-center gap-4 "
            >
              <h1 className="font-bold text-6xl mb-4 w-full">
                Explore Our Vast Selection of Books
              </h1>
              <p className=" font-medium text-2xl text-pgray ">
                Our shelves are brimming with a rich tapestry of genres,
                authors, and narratives, ensuring there's something for every
                reader. Immerse yourself in the vast world of literature as we
                curate an extensive collection that spans from timeless classics
                to contemporary bestsellers.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-row-reverse justify-around items-center my-12">
            <motion.img
              initial={{ opacity: 0, translateX: 40 }}
              whileInView={{ opacity: 1, translateX: 0 }}
              transition={{ ease: "easeOut", duration: 0.5 }}
              viewport={{ margin: "-300px", once: true }}
              loading="lazy"
              src={customerService}
              alt="customerService"
              className=" h-[600px] rounded-full
              "
            />
            {/*text-[#267e6a] */}
            <motion.div
              initial={{ opacity: 0, translateX: -40 }}
              whileInView={{ opacity: 1, translateX: 0 }}
              transition={{ ease: "easeOut", duration: 0.5 }}
              viewport={{ margin: "-300px", once: true }}
              className="  w-[50%]    text-bggreen h-[400px] p-5  flex flex-col justify-center gap-4 "
            >
              <h1 className="font-bold text-6xl mb-4  w-[110%] ">
                Elevate Your Bookstore Experience{" "}
              </h1>
              <p className=" font-medium text-2xl text-pgray ">
                We believe in building lasting relationships with our customers,
                and our team is ready to go the extra mile to make your
                experience with us seamless and enjoyable. Your literary journey
                is our priority, and we are always just a message or a call
                away, ready to assist you with the utmost professionalism and
                expertise.
              </p>
            </motion.div>
          </div>
          <div className="flex justify-around items-center my-12">
            <motion.img
              initial={{ opacity: 0, translateX: -40 }}
              whileInView={{ opacity: 1, translateX: 0 }}
              transition={{ ease: "easeOut", duration: 0.5 }}
              viewport={{ margin: "-300px", once: true }}
              loading="lazy"
              src={delivery}
              alt="delivery"
              className=" h-[640px] rounded-full
              "
            />
            <motion.div
              initial={{ opacity: 0, translateX: 40 }}
              whileInView={{ opacity: 1, translateX: 0 }}
              transition={{ ease: "easeOut", duration: 0.5 }}
              viewport={{ margin: "-300px", once: true }}
              className="  w-[50%]  text-bggreen  h-[400px] p-5  flex flex-col justify-center gap-4 "
            >
              <h1 className="font-bold text-6xl mb-4">
                Swift and Seamless Delivery
              </h1>
              <p className=" font-medium text-2xl text-pgray ">
                We pride ourselves on swift and secure deliveries, ensuring your
                orders reach you promptly and in pristine condition. Track your
                package in real-time, enjoy flexible delivery options tailored
                to your schedule, and rest easy knowing that your items are
                handled with the utmost care.
              </p>
            </motion.div>
          </div>
        </div>
        {/*<div className="grid grid-cols-4  h-fit  mt-12 ">
          <div className=" pb-4  flex flex-col  justify-start items-center   ">
            <img src={img4} alt="" className=" pt-1 drop-shadow-lg" />
            <h2 className="text-2xl mb-2 text-darkblue font-bold">
              Free Delivery
            </h2>
            <p className="text-lg   text-pgray ">For all oders over $99</p>
          </div>
          <div className=" pb-4  flex flex-col justify-start items-center ">
            <img src={img5} alt="" className="py-4" />
            <h2 className="text-2xl mb-2 text-darkblue font-bold">
              Expert customer Service
            </h2>
            <p className="text-lg   text-pgray">For a shopping experience </p>
          </div>
          <div className=" flex flex-col justify-start items-center">
            <img src={img6} alt="" className="py-4" />
            <h2 className="text-2xl mb-2 text-darkblue font-bold">
              Amazing Value
            </h2>
            <p className="text-lg   text-pgray">We offer competitive prices</p>
          </div>
          <div className=" pb-4  flex flex-col justify-start items-center ">
            <img src={img7} alt="" className="py-4" />
            <h2 className="text-2xl mb-2 text-darkblue font-bold">
              Safe Payment
            </h2>
            <p className="text-lg   text-pgray">100% secure payment</p>
          </div>
  </div>*/}
        {/*<img className='w-screen  rotate-180' src={wave} alt="" />*/}
      </div>
      <div className=" mb-20 ">
        <svg
          className=" h-[30px] rotate-180 fill-grayy  w-full"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 240 24"
          enablebackground="new 0 0 240 24"
          preserveAspectRatio="none"
        >
          <path d="M119.849,0C47.861,0,0,24,0,24h240C240,24,191.855,0.021,119.849,0z"></path>
        </svg>
      </div>
      <div className=" mb-24 ">
        <div className="flex justify-center items-center mb-16">
          <h1 className="h-fit text-5xl  text-darkblue font-bold">
            {" "}
            Our BestSellers
          </h1>
        </div>
        <div className=" mb-12 h-[60vh] flex items-center ">
          <Sliders results={results} loading={loading} />
        </div>
      </div>

      {/* The Promotion part */}
      <div className="relative">
        <img
          src={img}
          loading="lazy"
          alt="readBook"
          className=" -top-20  left-5 z-0  absolute"
        />
        <div className="h-[40rem] mt-48   mx-20 rounded-3xl flex items-center justify-between   bg-grayy z-10 relative ">
          <div className=" flex flex-col  w-[55%] justify-center space-y-7 ml-24  ">
            <motion.h2
              initial={{ opacity: 0, translateX: -40 }}
              whileInView={{ opacity: 1, translateX: 0 }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
              viewport={{ amount: "all", once: true, delay: 5 }}
              className="drop-shadow-xl text-6xl  text-darkblue font-bold"
            >
              Exclusive Deal of the Week! Act Fast and Save 50%!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, translateX: -40 }}
              whileInView={{ opacity: 1, translateX: 0 }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
              viewport={{ amount: "all", once: true, delay: 6 }}
              className=" text-2xl  font-medium text-pgray "
            >
              For a limited time only, we're thrilled to present our Deal of the
              Week, offering an unbeatable 50% discount on selected items. This
              is your chance to elevate your shopping experience without
              breaking the bank.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, translateY: -40 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
              viewport={{ amount: "all", once: true, delay: 7 }}
              className="text-xl"
            >
              <CountdownTimer />
            </motion.div>
            <NavLink to={currentUser ? "/books" : "/login"}>
              <motion.input
                initial={{ opacity: 0, translateX: -40 }}
                whileInView={{ opacity: 1, translateX: 0 }}
                transition={{ ease: "easeOut", duration: 0.5 }}
                viewport={{ amount: "all", once: true, delay: 8 }}
                type="button"
                value="Join Now >"
                className="w-fit bg-bggreen cursor-pointer  text-white text-xl shadow-2xl drop-shadow-xl px-5 py-3 rounded-xl font-semibold"
              />
            </NavLink>
          </div>
          <motion.div
            initial={{ opacity: 0, translateX: 40 }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            viewport={{ margin: "-200px", once: true }}
            className=" mr-14  "
          >
            <img
              src={pick}
              alt="img"
              loading="lazy"
              className=" h-[35rem] rounded-2xl "
            />
          </motion.div>
        </div>
        <img
          src={img}
          alt=""
          loading="lazy"
          className=" -bottom-10 right-5 absolute z-0"
        />
      </div>

      {/*client review*/}
      <div className=" z-10 relative flex flex-col justify-center items-center h-fit mt-32  ">
        <motion.h1
          initial={{ opacity: 0, translateY: -40 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
          viewport={{ amount: "all", once: true }}
          className=" text-7xl text-darkblue font-bold  mb-8  w-full text-center"
        >
          Our Clients Review
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, translateY: -40 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
          viewport={{ amount: "all", once: true, delay: 1 }}
          className="text-3xl  mb-8 text-pgray  font-medium w-[38%] text-center"
        >
          It’s always the best source to hear from others who have already
          bought from us.
        </motion.p>
      </div>
      <div className="relative  py-16  z-10  ">
        <img
          src={blob1}
          alt="blob"
          loading="lazy"
          className=" absolute z-0 right-0 top-0  "
        />
        <div className="h-[20rem]    space-x-12  flex mr-12 ml-4 pl-12 relative z-10 ">
          <div className=" shadow-xl  bg-white/50 backdrop-blur-sm   border border-gray-300 rounded-lg  flex flex-col space-y-2  pt-5   ">
            <h1 className="text-darkblue font-bold text-2xl pl-5">
              Great Plateform
            </h1>
            <img
              src={vector}
              alt=""
              loading="lazy"
              className="h-5 w-fit pl-5"
            />
            <p className="text-pgray pl-5  pr-1 w-full text-left">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci
              facere unde totam alias harum quaerat distinctio ad expedita,
              deleniti mollitia!
            </p>
            <hr className=" mx-5  bg-gray-300 h-1" />
            <div className="flex pl-5 h-full w-full pt-2 ">
              <img src={user1} alt="" loading="lazy" className="h-16  mt-1" />
              <div className="ml-2 mt-2">
                <p className="text-darkblue  font-semibold text-lg">
                  Bethe James
                </p>
                <div className=" flex ">
                  {Array.from({ length: 5 }, (v, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeWidth={0}
                      stroke="black"
                      className="w-5 h-5 border-0 fill-bgreen"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className=" shadow-xl bg-white/50 border  border-gray-300  rounded-lg  flex flex-col space-y-2  pt-5  ">
            <h1 className="text-darkblue font-bold text-xl pl-5">
              Great Plateform
            </h1>
            <img
              src={vector}
              alt=""
              loading="lazy"
              className="h-5 w-fit pl-5"
            />
            <p className="text-pgray pl-5 pr-1 w-full text-left">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci
              facere unde totam alias harum quaerat distinctio ad expedita,
              deleniti mollitia!
            </p>
            <hr className=" mx-5  bg-gray-300 h-1" />
            <div className="flex pl-5 h-full w-full pt-2 ">
              <img src={user2} loading="lazy" alt="" className="h-16 mt-1" />
              <div className="ml-2 mt-2">
                <p className="text-darkblue  font-semibold text-lg">
                  Bethe James
                </p>
                <div className=" flex ">
                  {Array.from({ length: 5 }, (v, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeWidth={0}
                      stroke="black"
                      className="w-5 h-5 border-0 fill-bgreen"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className=" shadow-xl  border border-gray-300  bg-white/50 backdrop-blur-sm   rounded-lg  flex flex-col space-y-2  pt-5  ">
            <h1 className="text-darkblue font-bold text-xl pl-5">
              Great Plateform
            </h1>
            <img
              src={vector}
              alt=""
              loading="lazy"
              className="h-5 w-fit pl-5"
            />
            <p className="text-pgray pl-5 pr-1 w-full text-left">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci
              facere unde totam alias harum quaerat distinctio ad expedita,
              deleniti mollitia!
            </p>
            <hr className=" mx-5  bg-gray-300 h-1" />
            <div className="flex pl-5 h-full w-full pt-2 ">
              <img src={user3} alt="" loading="lazy" className="h-16  mt-1" />
              <div className="ml-2 mt-2">
                <p className="text-darkblue text-lg font-semibold">
                  Bethe James
                </p>
                <div className=" flex ">
                  {Array.from({ length: 5 }, (v, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      strokeWidth={0}
                      stroke="black"
                      className="w-5 h-5 border-0 fill-bgreen"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          src={blob2}
          alt=""
          loading="lazy"
          className=" absolute z-0 left-0 bottom-0 h-80 "
        />
      </div>
      {/*Last section: app phone*/}
      <div className=" h-screen flex  justify-around   my-32">
        <div className="w-[50%]   flex flex-col justify-center  space-y-5 ">
          <motion.h1
            initial={{ opacity: 0, translateX: -40 }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ ease: "easeOut", duration: 0.5 }}
            viewport={{ amount: "all", once: true }}
            className="text-darkblue font-bold text-6xl mb-5"
          >
            Take Your Bookstore Everywhere with Our Mobile App!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, translateX: -40 }}
            whileInView={{ opacity: 1, translateX: 0 }}
            transition={{ ease: "easeOut", duration: 0.5 }}
            viewport={{ amount: "all", once: true, delay: 1 }}
            className="text-pgray font-medium text-2xl "
          >
            Discover a World of Books at Your Fingertips . Now, you can carry
            the magic of our bookstore with you wherever you go. Our mobile app
            is designed to make your reading experience seamless and enjoyable.{" "}
            <br />
            <span className="font-bold underline">Download Now</span> and Embark
            on a Reading Adventure:
          </motion.p>
          <div className="flex    space-x-5 ">
            <Link
              to="https://play.google.com/store/games?hl=en&gl=US&pli=1"
              target="_blank"
              className="w-[22%]"
            >
              <img
                src={playstore}
                alt="playstore"
                loading="lazy"
                className=" cursor-pointer drop-shadow-2xl  "
              />
            </Link>
            <Link
              to="https://www.apple.com/app-store/"
              target="_blank"
              className="w-[20.5%]"
            >
              {" "}
              <img
                src={appstore}
                alt="appstore"
                loading="lazy"
                className="drop-shadow-2xl"
              />{" "}
            </Link>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, translateX: 40 }}
          whileInView={{ opacity: 1, translateX: 0 }}
          transition={{ ease: "easeOut", duration: 1 }}
          viewport={{ margin: "-250px", once: true }}
          className=" flex justify-center"
        >
          <img src={phone} alt="phone" loading="lazy" className=" h-full " />
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
