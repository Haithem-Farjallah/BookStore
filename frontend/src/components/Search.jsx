import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function Search({ outside, closeWindow }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q='${search}'&key=AIzaSyDPYwZOZa8a7QJKPLJyrsnmDyvzts6HBmk`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.items ? setResults(data.items) : setResults([]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  }, [search]);

  return (
    <div
      className="  outside  fixed top-0  bg-darkbg/30 backdrop-blur-sm flex items-center justify-center  w-full   z-30 h-full   "
      onClick={outside}
    >
      <div className=" bg-searchbg  rounded-xl w-[40%] h-[90%] border  flex flex-col justify-center  items-center overflow-hidden">
        <div className="bg-white border w-[80%]  px-3 shadow-md mt-7 mb-6 rounded-lg">
          <input
            type="text"
            placeholder="What are you looking for ? "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="focus:outline-none  h-14 w-96   "
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6 inline fill-bgreen "
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className=" w-full  overflow-x-hidden  ">
          {loading && (
            <div className="h-[23rem] mt-16 text-bgreen flex justify-center items-center  w-full">
              <FontAwesomeIcon icon={faSpinner} spin className="  h-8" />
            </div>
          )}

          {!loading &&
            results.length !== 0 &&
            results.map(
              (result, index) =>
                result.volumeInfo &&
                result.volumeInfo.imageLinks &&
                result.volumeInfo.imageLinks.thumbnail && (
                  <div
                    key={index}
                    className="  bg-white mb-2 shadow-md rounded-md hover:bg-blue-50 cursor-pointer h-[17%] w-[94%] mx-5 "
                  >
                    <NavLink
                      to={`/books/${result.id}`}
                      onClick={closeWindow}
                      className="flex items-center px-5 my-2 py-1 space-x-4 "
                    >
                      <img
                        className="h-[4rem] w-[10%] border border-gray-300 rounded-md"
                        src={result.volumeInfo.imageLinks.thumbnail}
                        alt="img"
                      />
                      <p className=" font-semibold text-lg text-darkblue line-clamp-2">
                        {result.volumeInfo.title}
                      </p>
                    </NavLink>
                  </div>
                )
            )}
          {!loading && results.length === 0 && (
            <p className=" h-[23rem] text-center text-bgreen mt-16">
              aucune resultat
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
