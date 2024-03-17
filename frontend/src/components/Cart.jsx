import { Fragment, useState } from "react";
import exit from "../images/exit.svg";
import remove from "../images/Vector.svg";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../store/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

export default function Cart({ outside, close }) {
  const CartBooks = useSelector((state) => state.book);
  const dispatch = useDispatch();
  const RemoveFromCart = (data) => {
    dispatch(removeFromCart(data));
  };
  return (
    <div
      onClick={outside}
      className=" closeCart fixed  top-0  flex justify-end h-screen bg-darkbg/30 w-full backdrop-blur-sm z-50"
    >
      <div className=" h-screen w-[30%] bg-white">
        <div className="flex justify-between items-center  mt-5 mx-5 h-[15%] ">
          <h1 className="text-3xl text-darkblue font-bold">Shopping Cart</h1>
          <img
            src={exit}
            alt="exit"
            onClick={close}
            className="cursor-pointer mr-5 h-6"
          />
        </div>
        <hr className="w-[74%] h-[2px] bg-gray-400 mx-5 mr-12" />
        {CartBooks.books.length <= 0 && (
          <div className="flex flex-col justify-center h-[40vh] ">
            <FontAwesomeIcon
              icon={faCartShopping}
              bounce
              className="text-bgreen h-20 mb-2"
            />
            <h1 className="font-semibold text-darkblue text-lg text-center mx-10 ">
              Your Cart is Empty! <br /> Discover Amazing{" "}
              <NavLink
                to="/books"
                onClick={close}
                className="underline text-bgreen"
              >
                Books
              </NavLink>{" "}
              and Add Them to Your Cart Today.
            </h1>
          </div>
        )}
        <div className=" ">
          {CartBooks.books.length > 0 &&
            CartBooks.books.map((book) => (
              <div key={book.id} className="flex items-center  m-8  h-[50%]">
                {" "}
                <img
                  src={book.url}
                  alt="Image"
                  className="h-24 w-16 rounded-xl mr-8"
                />
                <div className="flex items-center w-full justify-between">
                  <div className=" w-[90%]">
                    <h1 className="text-xl font-semibold text-darkblue line-clamp-2  ">
                      {book.title}
                    </h1>
                    <p className="text-pgray font-medium">
                      {book.number} X {book.price} TND
                    </p>
                  </div>
                  <div>
                    <img
                      src={remove}
                      alt="Remove"
                      onClick={() =>
                        RemoveFromCart({
                          id: book.id,
                          items: book.number,
                          price: book.totalPrice,
                        })
                      }
                      className="cursor-pointer    "
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
