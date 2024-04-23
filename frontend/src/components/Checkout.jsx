import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { domain } from "../domain";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../store/cartSlice";

const cities = [
  "Ariana",
  "Béja",
  "Ben Arous",
  "Bizerte",
  "Gabès",
  "Gafsa",
  "Jendouba",
  "Kairouan",
  "Kasserine",
  "Kébili",
  "El Kéf",
  "Mahdia",
  "La Manouba",
  "Médenine",
  "Monastir",
  "Nabeul",
  "Sfax",
  "Sidi Bouzid",
  "Siliana",
  "Sousse",
  "Tataouine",
  "Tozeur",
  "Tunis",
  "Zaghouan",
];

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { totalPrice, priceAfterDiscount } = useSelector((state) => state.book);
  const books = useSelector((state) => state.book.books);
  const [form, setForm] = useState({
    userId: currentUser._id,
    firstname: currentUser.username,
    lastname: currentUser.familyname,
    city: "Ariana",
    streetAdress: "",
    ZipCode: "",
    Phone: "",
    email: currentUser.email,
    paymentMethod: "bank",
    total: priceAfterDiscount,
    books,
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.firstname) newErrors.firstname = "FirstName is required";
    if (!form.lastname) newErrors.lastname = "LastName is required";
    if (!form.streetAdress) newErrors.streetAdress = "streetAdress is required";
    if (!form.ZipCode) newErrors.ZipCode = "ZipCode is required";
    if (!form.Phone) newErrors.Phone = "Phone is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const booksToUpdate = books.map((book) => ({
      id: book.id,
      quantity: book.number,
    }));
    try {
      const res = await fetch(domain + "/api/book/updateQuantity", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booksToUpdate),
      });
      dispatch(clearCart());

      try {
        const res = await fetch(domain + "/api/cart/removeAllFromCart", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: currentUser._id }),
        });
      } catch (error) {
        console.log(error);
      }
      try {
        const res = await fetch(
          domain + "/api/purchaseHistory/setpurchaseHistory",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
            credentials: "include",
          }
        );
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }

      navigate("/books");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="  justify-center flex  gap-20 pt-10">
      <div className=" min-h-screen  ">
        <h1 className="text-darkblue font-semibold text-3xl my-2">
          Billing Details
        </h1>
        <form className=" space-y-2">
          <div className="flex gap-5 ">
            <div className="flex flex-col  ">
              <label htmlFor="firstname">FirstName *</label>
              <input
                type="text"
                id="firstname"
                value={form.firstname}
                onChange={handleChange}
                className="w-[12vw] rounded-lg "
              />
              {errors.firstname && (
                <p className="text-red-500 text-xs font-bold pl-2">
                  {errors.firstname}
                </p>
              )}
            </div>
            <div className="flex flex-col  ">
              <label htmlFor="lastname">LastName *</label>
              <input
                type="text"
                id="lastname"
                value={form.lastname}
                onChange={handleChange}
                className="w-[12vw] rounded-lg "
              />
              {errors.lastname && (
                <p className="text-red-500 text-xs font-bold pl-2">
                  {errors.lastname}
                </p>
              )}
            </div>
          </div>
          <iv className="flex flex-col">
            <label htmlFor="city">Town/City </label>
            <select
              name="city"
              id="city"
              onChange={handleChange}
              className="w-[25.5vw] rounded-lg"
            >
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </iv>
          <div className="flex flex-col">
            <label htmlFor="streetAdress">Street Adress *</label>
            <input
              type="text"
              id="streetAdress"
              onChange={handleChange}
              className="rounded-lg "
            />
            {errors.streetAdress && (
              <p className="text-red-500 text-xs font-bold pl-2">
                {errors.streetAdress}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="ZipCode">ZIP Code *</label>
            <input
              type="text"
              id="ZipCode"
              onChange={handleChange}
              className="rounded-lg "
            />
            {errors.ZipCode && (
              <p className="text-red-500 text-xs font-bold pl-2">
                {errors.ZipCode}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="Phone">Phone Number *</label>
            <input
              type="text"
              onChange={handleChange}
              id="Phone"
              className="rounded-lg "
            />
            {errors.Phone && (
              <p className="text-red-500 text-xs font-bold pl-2">
                {errors.Phone}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email </label>
            <input
              type="text"
              id="email"
              value={form.email}
              onChange={handleChange}
              className="rounded-lg "
            />
          </div>
        </form>
      </div>
      <div className="  w-[50%]">
        <div className="flex justify-between items-center">
          <h1 className="text-darkblue font-semibold text-2xl my-2">Product</h1>
          <h1 className="text-darkblue font-semibold text-xl my-2">SubTotal</h1>
        </div>
        {books.map((book, index) => (
          <div
            key={index}
            className="flex justify-between items-center space-y-2 "
          >
            <div>
              <span className=" text-pgray">{book.title}</span> x {book.number}{" "}
            </div>
            <div>{book.totalPrice} TND </div>
          </div>
        ))}
        <hr className="h-[2px] my-2 bg-darkblue" />
        <div className="flex justify-between items-center my-2 ">
          <h1 className="text-semibold text-xl text-darkblue">total :</h1>
          <h1>{totalPrice} TND</h1>
        </div>
        {totalPrice !== priceAfterDiscount && (
          <div className="flex justify-between">
            <h1 className="text-semibold text-xl text-darkblue">
              total After Discount :
            </h1>
            <h1>{priceAfterDiscount} TND</h1>
          </div>
        )}
        <div className="my-4">
          <div className="flex items-center gap-1">
            <input
              type="radio"
              id="bank"
              checked={form.paymentMethod === "bank"}
              onChange={() => setForm({ ...form, paymentMethod: "bank" })}
            />
            <label htmlFor="bank">Direct Bank Transfer</label>
          </div>
          <p className="text-pgray text-small px-4  ">
            Make your payment directly into our bank account. Please use your
            Order ID as the payment reference. Your order will not be shipped
            until the funds have cleared in our account.
          </p>
          <div className="flex items-center gap-1 my-2">
            <input
              type="radio"
              checked={form.paymentMethod === "cash"}
              id="deliver"
              onChange={() => setForm({ ...form, paymentMethod: "cash" })}
            />
            <label htmlFor="deliver">Cash on delivery</label>
          </div>
          <p className="text-sm ">
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account.
          </p>
        </div>
        <input
          type="submit"
          onClick={handleSubmit}
          value="Place Order"
          className="border border-bgreen shadow-xl cursor-pointer p-2 rounded-lg bg-bgreen text-white font-semibold"
        />
      </div>
    </div>
  );
};

export default Checkout;
