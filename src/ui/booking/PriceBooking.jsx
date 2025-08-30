import React from "react";
import { AiOutlineDollar } from "react-icons/ai";

const PriceBooking = ({ totalPrice, isPaid }) => {
  return (
    <div
      className={`flex flex-wrap items-center justify-between font-semibold  p-8 rounded text-lg 
        ${
          isPaid
            ? "text-green-800 bg-green-200/50"
            : "text-yellow-800 bg-yellow-200/50"
        } `}
    >
      <p className="flex items-center">
        <span>
          <AiOutlineDollar />
        </span>
        <span className="mx-2">Total Price </span>
        <span> ${totalPrice} </span>
      </p>
      <p className="uppercase text-sm">
        {isPaid ? "Paid" : "Will pay at property"}
      </p>
    </div>
  );
};

export default PriceBooking;
