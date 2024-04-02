import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function Search({ outside, closeWindow }) {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch(`/api/book/getAllBooks`)
      .then((res) => res.json())
      .then((data) => {
        if (search !== "") {
          const filterData = data.filter((result) =>
            result.name.toLowerCase().includes(search.toLowerCase())
          );
          setResults(filterData);
        } else {
          setResults(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  }, [search]);

  return (
    <div
      className="  outside  fixed top-0  bg-darkbg/40 backdrop-blur-sm flex items-center justify-center  w-full   z-30 h-full   "
      onClick={outside}
    >
      {/*search bar */}
      <div className=" bg-white  w-[40%] absolute top-2 px-3 shadow-md mt-7 mb-6 rounded-lg">
        <input
          type="text"
          placeholder="What are you looking for ? "
          onChange={(e) => setSearch(e.target.value)}
          className="focus:outline-none border-none  h-14 w-96 font-semibold placeholder:font-medium pl-2 text-darkblue "
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-6 h-6 float-right mt-4 inline fill-bgreen "
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {/*elements */}
      <div className=" bg-grayy  relative rounded-xl w-[40%] h-[80%]  mt-20 py-4  flex flex-col  overflow-hidden">
        <div className=" w-full  overflow-x-hidden  ">
          {loading && (
            <div className="  absolute top-[50%] right-[50%] text-bgreen  ">
              <FontAwesomeIcon icon={faSpinner} spin className="  h-8" />
            </div>
          )}

          {!loading &&
            results.length !== 0 &&
            results.map((result, index) => (
              <div
                key={index}
                className=" bg-white/80 border border-slate-400 border-opacity-50 mb-2 shadow-md rounded-md hover:bg-green-100/40 cursor-pointer  w-[94%] mx-5 "
              >
                <NavLink
                  to={`/books/${result._id}`}
                  onClick={closeWindow}
                  className="flex items-center px-5  py-1 space-x-4 "
                >
                  <img
                    className="h-[4rem] w-[10%] border border-gray-300 rounded-md"
                    src={result.image}
                    alt="img"
                  />
                  <p className=" font-semibold text-lg text-darkblue line-clamp-2">
                    {result.name}
                  </p>
                </NavLink>
              </div>
            ))}
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
