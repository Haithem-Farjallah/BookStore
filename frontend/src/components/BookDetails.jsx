import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import stars from "../images/stars.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const BookDetails = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();

  const [number, setNumber] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [result, setresult] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getSingleBook = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/book/getSingleBook?id=${id}`
        );
        const data = await res.json();
        setresult(data);
        setTotalPrice(data.price);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getSingleBook();
  }, [id]);
  const handlePrice = (e) => {
    if (e.target.value === "+") {
      if (number < result.quantity) {
        setNumber((prev) => prev + 1);
        setTotalPrice(totalPrice + result.price);
      }
    }
    if (e.target.value === "-") {
      if (number > 1) {
        setNumber((prev) => prev - 1);
        setTotalPrice(totalPrice - result.price);
      }
    }
  };
  return (
    <div className="h-screen ">
      {loading && (
        <div className="h-[100%] mt-10 text-bgreen flex justify-center items-center  w-full">
          <FontAwesomeIcon icon={faSpinner} spin className="  h-8" />
        </div>
      )}
      {!loading && (
        <div className="flex flew-wrap  mx-5 mt-[2%]   h-[30rem]">
          <div className=" min-w-[30%] maw-w-[30%] border flex  justify-center  mr-8 bg-grayy rounded-xl border-gray-400 h-[100%]">
            <img
              src={result.image}
              alt="book image"
              className="rounded-2xl  drop-shadow-lg my-6 "
            />
          </div>
          <div className="   h-full ">
            <h1 className="text-darkblue underline font-bold text-4xl  pt-1 ">
              {result.name}
            </h1>

            <p className="text-pgray font-semibold text-xl py-2">
              <span>By:</span>
              {result.author.map((auth, index) => (
                <span key={index}>
                  {auth}
                  {index === result.author.length - 1 ? "." : " / "}
                </span>
              ))}
            </p>

            <div className="overflow-y-scroll border">
              <p className="text-pgray font-medium text-lg h-[9.3rem] ml-4     ">
                {result.description}{" "}
              </p>
            </div>

            <div className="flex my-2 w-fit space-x-2 ml-4">
              <img src={stars} alt=" review" />
              <hr className="h-[24px] w-[1px] rounded bg-[#9f9f9f]" />
              <p className=" font-semibold text-md text-darkblue">
                5 Customer Review
              </p>
            </div>
            <p className="font-semibold text-pgray ml-4 mb-2">
              page count: {result.pageCount}
            </p>
            <p className="font-semibold  text-pgray ml-4">
              publisher: {result.publisher}
            </p>
            <p className=" text-3xl ml-4  my-2  text-darkblue font-bold">
              {totalPrice} TND
            </p>
            <p className="  w-fit py-1 px-2  text-darkblue font-semibold">
              Quantity available:{result.quantity} in stock
            </p>
            <div className=" flex mt-2  ">
              <div className="flex justify-center  items-center mx-5 ">
                <input
                  type="button"
                  value="-"
                  onClick={handlePrice}
                  className={`${
                    number === 1 ? "cursor-not-allowed  " : "cursor-pointer"
                  } h-[100%] bg-grayy border-s border-t border-b border-gray-400 text-bgreen  px-2  rounded-s-xl   font-bold text-xl outline-none`}
                />
                <p className="h-[100%] w-32 border-t border-b border-gray-400 bg-grayy  text-darkblue font-bold text-xl text-center pt-2">
                  {number}
                </p>
                <input
                  type="button"
                  value="+"
                  onClick={handlePrice}
                  className={`${
                    number === result.quantity
                      ? "cursor-not-allowed "
                      : "cursor-pointer"
                  } h-[100%] bg-grayy border-e  border-t border-b border-gray-400  px-2 rounded-e-xl outline-none text-bgreen font-bold text-xl`}
                />
              </div>
              <input
                type="button"
                value="Add to cart "
                className=" cursor-pointer bg-bgreen  px-12 py-3 rounded-xl  text-white font-bold text-center"
              />
              {currentUser && currentUser.isStudent && (
                <a
                  target="blank"
                  href="https://firebasestorage.googleapis.com/v0/b/bookstore-app-47ae6.appspot.com/o/Bulletin_013479018855_.pdf?alt=media&token=71e15617-9da5-43fa-abbf-4bb57fac5476"
                >
                  <FontAwesomeIcon
                    icon={faDownload}
                    title="Students can download pdf books"
                    className="text-darkblue h-8 ml-12 mt-2 "
                  />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
