import React, { useState, useEffect, memo } from "react";
import Slider from "react-slider";
import { NavLink } from "react-router-dom";
import { PiSmileySad } from "react-icons/pi";

import { Spinner } from "flowbite-react";

import Pagination from "./Pagination";
import ListBox from "./ListBox";
import { domain } from "../domain";

const Books = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(3);
  const language = ["All", "English", "Frensh", "Arabic"];
  const [selectedLang, setSelectedLang] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [authors, setAuthors] = useState(["All"]);
  const [initialResult, setInitialResult] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAuth, setSelectedAuth] = useState("All");

  //logic for pagination :
  const indexOfLastBook = booksPerPage * currentPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = results.slice(indexOfFirstBook, indexOfLastBook);

  const [Values, setValues] = useState([0, 150]);
  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await fetch(domain + "/api/book/getAllBooks");
        const data = await res.json();
        setResults(data);
        console.log(data);
        setInitialResult(data);
        setLoading(false);
        //create the categories array :
        let uniqueCategories = new Set(["All"]);
        data.map((obj) => {
          obj.category.map((catego) => {
            uniqueCategories.add(catego);
          });
        });
        setCategories(Array.from(uniqueCategories));
        //create the authors array :
        let uniqueAuthors = new Set(["All"]);
        data.map((obj) => {
          obj.author.map((auth) => {
            uniqueAuthors.add(auth);
          });
        });
        setAuthors(Array.from(uniqueAuthors));
      } catch (error) {
        console.log(error);
      }
    };
    getBooks();
    return () => {};
  }, []);

  //filter by category : the idea is to filter by category and then
  //verify if we have chosen an author and we filter what we filtered before
  const filterCategory = (pickedCategory) => {
    let filteredByCategory = [];
    setSelectedCategory(pickedCategory);
    if (pickedCategory === "All") {
      filteredByCategory = initialResult.filter(
        (result) => result.price >= Values[0] && result.price <= Values[1]
      );
    } else {
      filteredByCategory = initialResult.filter(
        (result) =>
          result.category.includes(pickedCategory) &&
          result.price >= Values[0] &&
          result.price <= Values[1]
      );
    }
    // Apply author filter on filteredByCategory
    if (selectedAuth === "All") {
      setResults(filteredByCategory);
      return;
    }
    const filteredEle = filteredByCategory.filter((result) =>
      result.author.includes(selectedAuth)
    );
    setResults(filteredEle);
  };

  //same idea here :
  const filterAuthors = (pickedAuth) => {
    let filteredByAuth = [];
    setSelectedAuth(pickedAuth);
    if (pickedAuth === "All") {
      filteredByAuth = initialResult.filter(
        (result) => result.price >= Values[0] && result.price <= Values[1]
      );
    } else {
      filteredByAuth = initialResult.filter(
        (result) =>
          result.author.includes(pickedAuth) &&
          result.price >= Values[0] &&
          result.price <= Values[1]
      );
    }
    if (selectedCategory === "All") {
      setResults(filteredByAuth);
      return;
    }
    const filteredEle = filteredByAuth.filter((result) =>
      result.category.includes(selectedCategory)
    );

    setResults(filteredEle);
  };

  //filter per price
  const filterPrice = (value) => {
    let filteredArray = initialResult.filter(
      (result) => result.price >= value[0] && result.price <= value[1]
    );
    if (selectedAuth !== "All") {
      filteredArray = filteredArray.filter((result) =>
        result.author.includes(selectedAuth)
      );
    }
    if (selectedCategory !== "All") {
      filteredArray = filteredArray.filter((result) =>
        result.category.includes(selectedCategory)
      );
    }
    setResults(filteredArray);
  };

  return (
    <>
      <div className="flex mx-8    relative rounded-xl pt-10">
        {/*filter section  */}
        <div className=" rounded-2xl bg-grayy border border-gray-300 shadow-lg w-[30%] h-screen mb-5 py-5 px-2 ">
          <h1 className="font-semibold text-2xl text-darkblue mb-5 ml-2 ">
            Filter Books :
          </h1>
          {/*Categories */}
          <div className="mb-5  ">
            <h1 className="font-medium text-xl text-darkblue mt-2 mb-4 ml-1">
              Categories :
            </h1>
            <ListBox
              className="z-20 "
              elements={categories}
              filterArray={filterCategory}
            />
          </div>
          {/*author */}
          <div className="mb-5 ">
            <h1 className="font-medium text-xl text-darkblue mt-2 mb-4 ml-1">
              Author :
            </h1>
            <ListBox
              className="z-0 "
              elements={authors}
              filterArray={filterAuthors}
            />
          </div>
          <div className="">
            <h1 className="font-medium text-xl text-darkblue mt-2 mb-4 ml-1">
              Language
            </h1>
            <div className="flex flex-col justify-center  ml-2 gap-2 ">
              {language.map((lang, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    id={index}
                    checked={lang === selectedLang}
                    className="focus:ring-0 text-bgreen mr-1 align-middle"
                  />
                  <label
                    className="ml-1 font-medium text-md text-[#1a1a1a]"
                    htmlFor={index}
                    onClick={() => setSelectedLang(lang)}
                  >
                    {lang}
                  </label>{" "}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h1 className="font-medium text-xl text-darkblue mt-4 mb-2 ml-1">
              Prices :
            </h1>
            <div className="space-x-2 flex justify-between mb-5 ">
              <p className=" px-2 py-1 bg-bgcolor rounded-lg border border-gray-300 shadow">
                {Values[0]} TND
              </p>
              <p className=" px-2 py-1  bg-bgcolor rounded-lg border border-gray-300 shadow">
                {Values[1]} TND
              </p>
            </div>

            <Slider
              className="slider  h-doubleRange bg-bgreen"
              value={Values}
              min="0"
              max="150"
              onChange={(newValue) => {
                setValues(newValue);
                filterPrice(newValue);
              }}
              thumbClassName="bg-bgcolor border border-bgreen   rounded-full -mt-2 w-4 h-4 cursor-grab "
            />
          </div>
        </div>

        {/*books content */}
        <div className="flex flex-col ml-12  w-full  ">
          {loading && (
            <div className="h-[100%] mt-10 text-bgreen flex justify-center items-center  w-full">
              <Spinner color="success" size="xl" />;
            </div>
          )}
          {!loading && currentBooks.length > 0 && (
            <div className="flex flex-col  justify-between h-full w-full space-y-8 mb-12 ">
              {currentBooks.map((result, index) => (
                <div
                  key={index}
                  className="bg-grayy border border-gray-300 h-[16rem] flex items-center shadow-lg hover:shadow-xl rounded-xl px-5"
                >
                  <div className="   w-[19%]">
                    <img
                      src={result.image}
                      alt="book"
                      className="h-44 w-full rounded-lg drop-shadow-xl "
                    />
                  </div>
                  <div className="flex flex-col justify-evenly   ml-8 w-full  h-[85%] ">
                    <h1 className="text-darkblue underline font-bold text-2xl truncate pt-1 ">
                      {result.name}
                    </h1>

                    <p className="text-pgray font-semibold text-lg  line-clamp-1 pr-2">
                      <span className="font-[650]">
                        {result.author.length === 1
                          ? "Author : "
                          : "Authors : "}
                      </span>
                      {result.author.map((auth, index) => (
                        <span key={index}>
                          {auth}
                          {index === result.author.length - 1 ? "." : " / "}
                        </span>
                      ))}
                    </p>

                    <p className="text-pgray font-medium text-lg mb-3 ml-4 w-[90%]   line-clamp-3 ">
                      {result.textSnippest}
                    </p>

                    <div className="flex justify-between items-center ">
                      <div className="flex ml-4 ">
                        {result.category.map((category, index) => (
                          <p
                            key={index}
                            className="text-sm bg-white/40 shadow-lg border border-gray-300 w-fit py-2 px-2 m-1 text-darkblue font-semibold rounded-lg cursor-pointer"
                          >
                            {category}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className=" h-[85%] w-[20%] flex flex-col justify-end items-center gap-5">
                    <p className="text-darkblue font-semibold text-2xl  font-[poppins] ">
                      {result.price} TND
                    </p>
                    <NavLink
                      to={`/books/${result._id}`}
                      className="rounded-lg mb-4 "
                    >
                      <input
                        type="button"
                        value="View Details >"
                        className="cursor-pointer rounded-xl  p-2 bg-bgreen text-white font-medium text-md border border-bgreen shadow-xl hover:underline "
                      />
                    </NavLink>
                  </div>
                </div>
              ))}
              <Pagination
                booksPerPage={booksPerPage}
                totalBooks={results.length}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          )}
          {!loading && currentBooks.length === 0 && (
            <div className="flex items-center justify-center h-[90vh]">
              <div className="flex flex-col items-center gap-2">
                <PiSmileySad className="text-bgreen h-[10vh] w-[10vw] " />
                <p className="text-2xl font-semibold text-bgreen">
                  Nothing found here !
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Books;
