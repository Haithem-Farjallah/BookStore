import React from "react";
import trash from "../images/trash.svg";
import book from "../images/book.jpg";

const CartTotals = () => {
  return (
    <div className="h-screen mt-40 w-full flex mx-12 gap-6 ">
      <div className="w-[70%] ">
        <div className="grid grid-cols-4 mb-5 bg-grayy text-center  h-12 w-auto items-center text-darkblue font-semibold">
          <h1>Product</h1>
          <h1>Price</h1>
          <h1>Quantity</h1>
          <h1>Subtotal</h1>
        </div>
        <div className="grid grid-cols-4 text-center  h-fit items-center border-b border-pgray   pb-2  ">
          <div className="flex text-pgray items-center">
            <img
              src={book}
              alt="Book"
              className="h-20 w-auto mr-5 ml-2 rounded-lg"
            />
            <p>productName</p>
          </div>
          <p className="text-pgray">210 TND </p>
          <p>
            <span className="border border-gray-500 text-darkblue px-2 py-1 rounded-lg">
              1
            </span>
          </p>

          <div className="flex  justify-end items-center pr-3  ">
            <p className=" text-darkblue font-medium mr-12">210 TND </p>
            <img
              src={trash}
              alt="trash "
              className="  h-4 w-auto cursor-pointer shadow"
            />
          </div>
        </div>
      </div>
      {/*cart total */}
      <div className="w-[22%] h-fit shadow-lg  bg-grayy ">
        <h1 className="text-darkblue font-bold text-2xl text-center mt-5 mb-8">
          Cart Totals
        </h1>
        <div className="grid grid-cols-2 text-center mx-5 mb-5 items-center ">
          <p className="font-semibold text-darkblue">Subtotal :</p>
          <p className="text-pgray">120.00</p>
        </div>
        <div className="grid grid-cols-2   text-center mr-3 ml-1  items-center ">
          <p className="font-semibold text-darkblue text-lg ">Total :</p>
          <p className="text-bggreen text-lg font-bold  ">112.5 TND</p>
        </div>
        <div className="flex justify-center items-center my-12">
          <input
            type="button"
            value="Check Out"
            className=" border border-pgray/80 hover:border-pgray border-solid shadow-lg cursor-pointer text-darkblue/80 hover:text-darkblue hover:underline-offset-4 py-2 px-8 font-medium text-lg rounded-xl "
          />
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
