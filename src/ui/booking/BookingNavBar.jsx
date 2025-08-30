import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BookingNavBar = ({ children }) => {
  const navigate = useNavigate();

  return (
    <section className="pt-20 mb-10 flex justify-between flex-wrap items-center">
      <h1 className="text-3xl font-bold text-gray-700"> {children} </h1>
      <button
        className="flex items-center text-blue-800 cursor-pointer font-semibold text-xl"
        onClick={() => navigate(-1)}
      >
        <span className="text-2xl">
          <IoIosArrowRoundBack />
        </span>
        Back
      </button>
    </section>
  );
};

export default BookingNavBar;
