import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import stars from "../images/stars.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const BookDetails = () => {
  const { id } = useParams();

  const [number, setNumber] = useState(1);
  const [results, setresults] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}?&key=AIzaSyDPYwZOZa8a7QJKPLJyrsnmDyvzts6HBmk`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setresults(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  }, []);
  return (
    <div className="h-screen">
      {loading && (
        <div className="h-[100%] mt-10 text-bgreen flex justify-center items-center  w-full">
          <FontAwesomeIcon icon={faSpinner} spin className="  h-8" />
        </div>
      )}
      {!loading && (
        <div className="grid grid-cols-3 mx-5 mt-[3%]  ">
          <div className=" col-span-1 border flex  justify-center  mr-8 bg-grayy rounded-xl border-gray-400">
            <img
              src={results.volumeInfo.imageLinks.small}
              alt="book image"
              className="rounded-2xl  drop-shadow-lg my-6 "
            />
          </div>
          <div className=" col-span-2  h-full ">
            <h1 className="text-darkblue underline font-bold text-4xl  pt-1 ">
              {results.volumeInfo.title}
            </h1>
            {results.volumeInfo.authors ? (
              <p className="text-pgray font-semibold text-xl py-2">
                <span>By:</span>
                {results.volumeInfo.authors.map((auth, index) => (
                  <span key={index}>
                    {auth}
                    {index === results.volumeInfo.authors.length - 1
                      ? "."
                      : " / "}
                  </span>
                ))}
              </p>
            ) : (
              "Not mentioned"
            )}
            <p className="text-pgray font-medium text-lg  ml-4  pr-2 line-clamp-4  ">
              {results.volumeInfo.description
                ? results.volumeInfo.description
                : "Description of the book currently unavailable !"}{" "}
            </p>

            {/*<div className=" ml-4 ">
              <p className=" text-darkblue font-bold text-lg">
                Keys of contents for this book :
              </p>
              {results.volumeInfo.categories ? (
                results.volumeInfo.categories.map((categorie, index) => (
                  <p
                    key={index}
                    className="text-sm  w-fit py-1 px-2  text-darkblue font-semibold "
                  >
                    *{categorie}
                  </p>
                ))
              ) : (
                <p className="text-sm  w-fit py-2 px-2 m-1 text-darkblue font-semibold rounded-lg">
                  Not mentioned
                </p>
              )}
              </div>*/}
            <div className="flex my-2 w-fit space-x-2 ml-4">
              <img src={stars} alt=" review" />
              <hr className="h-[24px] w-[1px] rounded bg-[#9f9f9f]" />
              <p className=" font-semibold text-md text-darkblue">
                5 Customer Review
              </p>
            </div>
            <p className="font-semibold text-pgray ml-4 mb-2">
              page count: {results.volumeInfo.pageCount}
            </p>
            <p className="font-semibold  text-pgray ml-4">
              publisher: {results.volumeInfo.publisher}
            </p>
            <p className=" text-3xl ml-4  my-2  text-darkblue font-bold">
              {21.0 * number}DT
            </p>
            <p className="  w-fit py-1 px-2  text-darkblue font-semibold">
              Quantity available: 10 in stock
            </p>
            <div className=" flex mt-2  ">
              <div className="flex justify-center  items-center mx-5 ">
                <input
                  type="button"
                  value="-"
                  onClick={() =>
                    setNumber((prev) => (prev === 1 ? 1 : prev - 1))
                  }
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
                  onClick={() =>
                    setNumber((prev) => (prev === 10 ? prev : prev + 1))
                  }
                  className={`${
                    number === 10 ? "cursor-not-allowed" : "cursor-pointer"
                  } h-[100%] bg-grayy border-e  border-t border-b border-gray-400  px-2 rounded-e-xl outline-none text-bgreen font-bold text-xl`}
                />
              </div>
              <input
                type="button"
                value="Add to cart "
                className=" cursor-pointer bg-bgreen  px-12 py-3 rounded-xl  text-white font-bold text-center"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
