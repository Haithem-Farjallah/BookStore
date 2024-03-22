import React from "react";

const Pagination = ({
  booksPerPage,
  totalBooks,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="flex justify-center items-center gap-4">
      <input
        type="button"
        value="< Prev"
        className="cursor-pointer rounded-xl  p-2    bg-bgreen text-white font-medium text-md border border-bgreen shadow-xl hover:opacity-90 "
        onClick={handlePrevious}
      />
      {pageNumbers.map((number) => (
        <p
          className="border border-gray-400 cursor-pointer  shadow-lg p-2 w-10 h-10 text-center rounded-lg bg-grayy font-lg text-darkblue font-semibold"
          onClick={() => setCurrentPage(number)}
          key={number}
        >
          {number}
        </p>
      ))}
      <input
        type="button"
        value="Next >"
        onClick={handleNext}
        className="cursor-pointer rounded-xl  p-2 bg-bgreen text-white font-medium text-md border border-bgreen shadow-xl hover:opacity-90 "
      />
    </div>
  );
};

export default Pagination;
