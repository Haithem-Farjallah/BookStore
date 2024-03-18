import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
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
const Checkout = ({ total }) => {
  return (
    <div className="h-screen w-full flex ">
      <div className="w-[50%] ">
        <h1>Billing Details</h1>
        <form>
          <div>
            <label htmlFor="">FirstName </label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">LastName </label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">FirstName </label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="city">Town/City </label>
            <select name="city" id="city">
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="">Street Adress </label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">ZIP Code </label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Phone Number </label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Email </label>
            <input type="text" />
          </div>
        </form>
      </div>
      <div className="w-[50%]">
        <div>
          <h1>Total :</h1>
          <p>{total}</p>
        </div>
        <div className="w-full border border-black px-4 pt-16">
          <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                    <span>What is your refund policy?</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                    If you're unhappy with your purchase for any reason, email
                    us within 90 days and we'll refund you in full, no questions
                    asked.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure as="div" className="mt-2">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                    <span>Do you offer technical support?</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-purple-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                    No.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
