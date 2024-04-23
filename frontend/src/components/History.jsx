import React, { useEffect, useState } from "react";
import { domain } from "../domain";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

const History = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [results, setResult] = useState([]);
  useEffect(() => {
    const getHistory = async () => {
      try {
        const res = await fetch(
          `${domain}/api/purchaseHistory/getpurchaseHistory/${currentUser._id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        const data = await res.json();
        if (data.success === false) return;
        setResult(data);
      } catch (error) {
        console.log(error);
      }
    };
    getHistory();
  }, []);
  return (
    <div className="min-h-screen">
      {results.length > 0 &&
        results.map((result, index) => (
          <div
            key={index}
            className="flex items-center justify-between mt-12 p-5 mx-5  border border-pgray rounded-lg bg-grayy "
          >
            <div className="space-y-1 text-darkblue w-full">
              <h1 className="font-bold text-xl flex justify-between  w-full">
                <span>{new Date(result.createdAt).toDateString()}</span>
                <span className="">
                  {new Date(result.createdAt).toLocaleTimeString()}
                  <FontAwesomeIcon icon={faClock} className="ml-2" />
                </span>
              </h1>
              <p className=" ml-1 font-medium">
                <span className="">Books :</span>
                {result.books.map((book, index) => (
                  <span key={index} className="text-pgray">
                    {book.title} {result.books.length < index && "/"}{" "}
                  </span>
                ))}
              </p>
              <p className=" ml-1 font-medium">
                <span>Total : </span>
                <span className="text-pgray">{result.total} TND</span>
              </p>
              <p className=" ml-1 font-medium">
                <span>FullName : </span>
                <span className="text-pgray">
                  {result.firstname} {result.lastname}{" "}
                </span>
              </p>
              <p className=" ml-1 font-medium">
                <span>PaymentMethod : </span>
                <span className="text-pgray">{result.paymentMethod} </span>
              </p>
              <p className=" ml-1 font-medium">
                <span>Street Adress : </span>
                <span className="text-pgray">{result.streetAdress} </span>
              </p>
              <p className=" ml-1 font-medium">
                <span>Phone Number : </span>
                <span className="text-pgray">{result.Phone} </span>
              </p>
            </div>
          </div>
        ))}
      {!results.length && (
        <div className="flex flex-col items-center justify-center gap-4 text-2xl h-screen text-bgreen ">
          <FontAwesomeIcon icon={faClockRotateLeft} className="h-6 w-6" />{" "}
          <p className="">
            It looks like You still did not purchase anything yet !{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default History;
