import React, { useEffect, useState } from "react";
import TodayBox from "./TodayBox";
import { isSameDay } from "date-fns";

const TodayCheckIn = ({ data }) => {
  const [checkInData, setCheckInData] = useState([]);

  function filterTodayData(data) {
    const today = new Date();

    return data.filter((ele) => {
      const startDate = new Date(ele.startDate);
      const endDate = new Date(ele.endDate);

      const isUnconfirmedToday =
        ele.status === "unconfirmed" && isSameDay(startDate, today);

      const isCheckedInToday =
        ele.status === "checkedin" && isSameDay(endDate, today);

      return isUnconfirmedToday || isCheckedInToday;
    });
  }

  useEffect(() => {
    if (!data || data.length === 0) {
      console.log("No data received");
      return;
    }

    const filtered = filterTodayData(data);
    setCheckInData(filtered);
  }, [data]);

  return (
    <div className="bg-white p-5 rounded border-2 border-gray-100 my-5 overflow-y-scroll h-80">
      <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
        Today
      </h2>
      <div>
        {checkInData.length > 0 ? (
          checkInData.map((item) => {
            return <TodayBox item={item} key={item.id} />;
          })
        ) : (
          <p className="text-gray-500 text-center py-4">
            No check-ins for today
          </p>
        )}
      </div>
    </div>
  );
};

export default TodayCheckIn;
