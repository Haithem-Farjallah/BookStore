import React, { useEffect, useState } from "react";
import trash from "../images/trash.svg";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../store/cartSlice";
import { NavLink } from "react-router-dom";

const CartTotals = () => {
  const { date } = useSelector((state) => state.user.currentUser.createdAt);
  const [newUser, setNewUser] = useState(false);
  useEffect(() => {
    // Convert the creation date string to a Date object
    const userCreationDate = new Date(date);
    // Get the current date and time
    const currentDate = new Date();
    // Calculate the difference in milliseconds between the current date and the user's creation date
    const timeDifference = currentDate.getTime() - userCreationDate.getTime();
    // Define the time threshold (e.g., 30 days in milliseconds)
    const timeThreshold = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    // Check if the time difference surpasses the threshold
    if (timeDifference > timeThreshold) {
      setNewUser(false);
    } else {
      setNewUser(true);
    }
  }, []);
  const CartBooks = useSelector((state) => state.book);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const RemoveFromCart = async (data) => {
    dispatch(removeFromCart(data));
    try {
      const res = await fetch("/api/cart/removeBookFromCart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, userId: currentUser._id }),
      });
      console.log(await res.json());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" mt-12 w-full flex mx-12 gap-6 ">
      <div className="w-[70%] border mb-5   ">
        <div className="grid grid-cols-4 shadow bg-grayy text-center  h-12 w-auto items-center text-darkblue font-semibold">
          <h1>Product</h1>
          <h1>Price</h1>
          <h1>Quantity</h1>
          <h1>Action</h1>
        </div>
        <div className="h-[90vh] overflow-y-scroll mt-2 ">
          {CartBooks.books.length > 0 &&
            CartBooks.books.map((book) => (
              <div
                key={book.id}
                className=" grid grid-cols-4 text-center  h-fit w-full  items-center border-b-2    "
              >
                <div className="flex text-pgray items-center ">
                  <img
                    src={book.url}
                    alt="Book"
                    className="h-20 w-14 ml-2 my-2 rounded-lg"
                  />
                  <p>{book.title}</p>
                </div>
                <p className="text-pgray">{book.totalPrice} TND </p>
                <p>
                  <span className="border border-gray-500 text-darkblue px-2 py-1 rounded-lg">
                    {book.number}
                  </span>
                </p>

                <div className="flex  justify-center items-center   ">
                  <img
                    src={trash}
                    alt="trash "
                    className="  h-4 w-4 cursor-pointer shadow"
                    onClick={() =>
                      RemoveFromCart({
                        id: book.id,
                        items: book.number,
                        price: book.totalPrice,
                      })
                    }
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
      {/*cart total */}
      <div className="w-[22%] h-fit shadow-lg  rounded-lg bg-grayy ">
        <h1 className="text-darkblue font-bold text-2xl text-center mt-5 mb-8">
          Cart Totals
        </h1>
        <div className="grid grid-cols-2 text-center mx-5 mb-5 items-center ">
          <p className="font-semibold text-darkblue text-lg">Total Price :</p>
          <p className="text-pgray text-lg font-bold">
            {CartBooks.totalPrice} TND
          </p>
        </div>
        <div className="flex text-center mr-3 ml-1  justify-around  items-center ">
          <p className="font-semibold text-darkblue text-lg  ">
            Total after{" "}
            <span
              className="underline underline-offset-2 cursor-help "
              title=" Only New Users get 30% discount total"
            >
              Discount
            </span>{" "}
            :
          </p>
          <p className="text-bggreen text-lg font-bold  ">
            {Math.floor(CartBooks.totalPrice * (newUser ? 0.7 : 1))} TND{" "}
          </p>
        </div>
        <NavLink
          to="/Checkout"
          className="flex justify-center items-center my-12"
        >
          <input
            type="button"
            value="Check Out"
            className=" border border-pgray/80 hover:border-pgray border-solid shadow-lg cursor-pointer text-darkblue/80 hover:text-darkblue hover:underline-offset-4 py-2 px-8 font-medium text-lg rounded-xl "
          />
        </NavLink>
      </div>
    </div>
  );
};

export default CartTotals;
