import { Fragment, useState } from "react";
import exit from "../images/exit.svg";

export default function Cart({ outside, close }) {
  return (
    <div
      onClick={outside}
      className="fixed  top-0  flex justify-end h-screen bg-darkbg/30 w-full backdrop-blur-sm z-50"
    >
      <div className=" h-screen w-[30%] bg-grayy">
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
      </div>
    </div>
  );
}
