import React from "react";
import HeaderBooingInfo from "./HeaderBookingInfo";
import PriceBooking from "./PriceBooking";
import { FetchBookingDetails } from "../../services/ApiBooking";
import BookingData from "../booking/BookingData";
const BookingInfo = ({ data }) => {
  const {
    guestID,
    numGuests,
    observations,
    totalPrice,
    cabinID,
    numNights,
    startDate,
    endDate,
    hasBreakfast,
    created_at,
    isPaid,
  } = data;

  const startDateString = new Date(created_at);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const createdAt = startDateString.toLocaleString("en-US", options);

  return (
    <section className="mt-5">
      <HeaderBooingInfo
        startDate={startDate}
        endDate={endDate}
        cabin={cabinID}
        numNights={numNights}
      />

      <BookingData
        guests={guestID}
        hasBreakfast={hasBreakfast}
        numGuests={numGuests}
        observations={observations}
      >
        <PriceBooking totalPrice={totalPrice} isPaid={isPaid} />

        <p className="text-right text-gray-600 mt-4 text-sm ">
          <span className="mr-2">Booked </span> {createdAt}
        </p>
      </BookingData>
    </section>
  );
};

export default BookingInfo;
