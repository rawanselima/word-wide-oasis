import React, { memo, useEffect, useState } from "react";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import useEditBooking from "../../hooks/useEditBooking";
import { ImSpinner6 } from "react-icons/im";

const TodayBox = ({ item }) => {
  const navigate = useNavigate();
  const [isCheckIn, setIsCheckIn] = useState(false);
  const { mutate, isPending } = useEditBooking();

  useEffect(() => {
    if (item.status === "unconfirmed") setIsCheckIn(true);
  }, [item , isPending]);

  const guestName = item.guestID?.fullName || item.fullName || "Unknown Guest";
  const numNights = item.numNights || "Unknown";

  return (
    <div className="flex items-center justify-between my-1 py-1/2 border-b-2 border-gray-50">
      <div className="flex items-center">
        <p
          className={`mr-3 text-xs font-bold uppercase  px-3 py-1 rounded-full ${
            item.status === "unconfirmed"
              ? "text-green-700 bg-green-100"
              : "text-blue-900 bg-blue-200"
          } `}
        >
          {item.status === "unconfirmed" ? "arriving" : "departing"}
        </p>
        <p className="text-gray-700 font-semibold"> {guestName} </p>
      </div>
      <div className="flex items-center">
        <p className="text-gray-600 mx-3"> {numNights} nights</p>
        <button
          className="bg-blue-900 py-1 px-5 rounded text-sm text-white my-2 mx-2 cursor-pointer hover:bg-blue-950 transition-all duration"
          onClick={() => {
            isCheckIn
              ? navigate(`/checkIn/${item.id}`)
              : mutate({
                  updatedBooking: { ...item, status: "checkedout" },
                  id: item.id,
                });
          }}
        >
          {isPending ? (
            <ImSpinner6 className="animate-spin mr-2" />
          ) : item.status === "unconfirmed" ? (
            "checkedIn"
          ) : (
            "checkedOut"
          )}
        </button>
      </div>
    </div>
  );
};

export default memo(TodayBox);
