import React from "react";
import { HiOutlineHomeModern } from "react-icons/hi2";
import useDate from "../../hooks/useDate";

const HeaderBooingInfo = ({
  startDate: sDate,
  endDate: eDate,
  cabin,
  numNights,
}) => {
  const { startDate, endDate, duration } = useDate({ sDate, eDate });

  return (
    <div className="flex flex-wrap justify-between px-5 py-5 items-center bg-blue-900 text-white rounded">
      <p className="flex items-center font-semibold text-xl my-3 sm:my-0">
        <span className="text-3xl mr-3">
          <HiOutlineHomeModern />
        </span>
        {numNights} nights in Cabin {cabin.name}
      </p>
      <p>
        {startDate} ({duration}) — {endDate}
      </p>
    </div>
  );
};

export default HeaderBooingInfo;
