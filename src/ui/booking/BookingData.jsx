import React from "react";
import { BiMessageDetail } from "react-icons/bi";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

const BookingData = ({
  numGuests,
  guests,
  observations,
  hasBreakfast,
  children,
}) => {
  return (
    <div className="bg-white p-6">
      <div>
        <div className="my-3 flex flex-wrap">
          <span className="font-semibold text-lg text-gray-800">
            {guests.fullName} {numGuests > 0 && `+ ${numGuests} guests`}
          </span>
          <ul className="list-disc flex flex-wrap md:ml-10 text-gray-600">
            <li className="mx-5"> {guests.email} </li>
            <li className="mx-5">National ID {guests.nationalID} </li>
          </ul>
        </div>
        {observations && (
          <p className="flex items-center my-3">
            <span className="text-blue-800">
              <BiMessageDetail />
            </span>
            <span className="font-semibold text-lg text-gray-800 mx-2">
              Observations :
            </span>
            <span className="text-gray-600 "> {observations} </span>
          </p>
        )}
        <p className="flex items-center my-3">
          <span className="text-blue-800">
            <IoCheckmarkDoneCircleOutline />
          </span>
          <span className="font-semibold text-lg text-gray-800 mx-2">
            Breakfast included ?
          </span>
          <span className="text-gray-600 uppercase">
            {hasBreakfast ? "yes" : "no"}
          </span>
        </p>
      </div>
      {children}
    </div>
  );
};

export default BookingData;
