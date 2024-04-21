import React, { useEffect, useState } from "react";
import BooksComments from "./BookComments";
import { Tab } from "@headlessui/react";
import { domain } from "../domain";
import { NavLink } from "react-router-dom";
import { Spinner } from "flowbite-react";

const Tabs = ({ result }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getBooks = async () => {
      try {
        const req = await fetch(domain + "/api/book/getAllBooks");
        const data = await req.json();
        const filteredBooks = [];
        data.forEach((res) => {
          const commonCategories = res.category.filter(
            (catego) =>
              result.category.includes(catego) && result._id !== res._id
          );
          // Include the book in recommendedBooks if it has at least one common category
          if (commonCategories.length > 0) {
            filteredBooks.push(res);
          }
        });
        setResults(filteredBooks);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getBooks();
    return () => {};
  });
  return (
    <div className="w-full ">
      <Tab.Group>
        <Tab.List className="shadow flex items-center justify-around h-[10vh]">
          <Tab>
            {({ selected }) => (
              /* Use the `selected` state to conditionally style the selected tab. */
              <button
                className={
                  selected
                    ? "text-bgreen font-semibold text-2xl"
                    : " text-pgray text-2xl font-semibold"
                }
              >
                Description
              </button>
            )}
          </Tab>
          <Tab>
            {({ selected }) => (
              /* Use the `selected` state to conditionally style the selected tab. */
              <button
                className={
                  selected
                    ? "text-bgreen font-semibold text-2xl"
                    : " text-pgray text-2xl font-semibold"
                }
              >
                Comments
              </button>
            )}
          </Tab>
          <Tab>
            {({ selected }) => (
              /* Use the `selected` state to conditionally style the selected tab. */
              <button
                className={
                  selected
                    ? "text-bgreen font-semibold text-2xl"
                    : " text-pgray text-2xl font-semibold"
                }
              >
                Recommended
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="h-[50vh] p-10 text-xl  text-pgray font-medium ">
            {" "}
            {result.description}{" "}
          </Tab.Panel>
          <Tab.Panel>
            <BooksComments id={result._id} />
          </Tab.Panel>
          <Tab.Panel className=" w-full">
            {loading && (
              <div className=" mt-10 flex justify-center items-center  w-full">
                <Spinner color="success" size="xl" />;
              </div>
            )}
            {!loading && results.length > 0 && (
              <div className="flex items-center  gap-10 flex-wrap mx-4 my-8">
                {results.map((result, index) => (
                  <NavLink
                    key={index}
                    to={`/books/${result._id}`}
                    className="flex flex-col items-center"
                  >
                    <div className="mb-5 ">
                      <img
                        src={result.image}
                        alt="Book"
                        className="h-[45vh] rounded-xl    brightness-95 shadow-2xl "
                      />
                    </div>
                    <h1 className=" text-darkblue font-semibold text-center h-12 line-clamp-2 mx-2  ">
                      {result.name}{" "}
                    </h1>
                  </NavLink>
                ))}
              </div>
            )}
            {!loading && results.length === 0 && (
              <p className="text-bgreen font-semibold text-lg">
                No recommended books found !{" "}
              </p>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Tabs;
