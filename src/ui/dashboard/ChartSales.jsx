import { eachDayOfInterval, format, subDays } from "date-fns";
import React, { useEffect, useState } from "react";
import { memo } from "react";
import { GoDash } from "react-icons/go";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ChartSales({ data, numDays }) {
  const [allDates, setAllDates] = useState([]);

  useEffect(() => {
    if (numDays) {
      const dates = eachDayOfInterval({
        start: subDays(new Date(), numDays - 1),
        end: new Date(),
      });

      setAllDates(dates);
    }
  }, [numDays]);

  const allData = allDates.map((date) => {
    const dailyBookings =
      data?.filter(
        (b) =>
          format(new Date(b.startDate), "yyyy-MM-dd") ===
          format(date, "yyyy-MM-dd")
      ) || [];

    return {
      date: format(date, "MMM dd"),
      totalPrice: dailyBookings.reduce(
        (acc, cur) => acc + (cur.totalPrice || 0),
        0
      ),
      extraPrice: dailyBookings.reduce(
        (acc, cur) => acc + (cur.extraPrice || 0),
        0
      ),
    };
  });

  return (
    <section className="bg-white p-6 rounded my-6 border-2 border-gray-100">
      <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
        {allDates.length > 0 && (
          <>
            {`Sales From ${format(allDates[0], "MMM dd yyyy")}`}
            <span className="font-bold text-4xl mx-1">
              <GoDash />
            </span>
            {`${format(allDates[allDates.length - 1], "MMM dd yyyy")}`}
          </>
        )}
      </h2>
      <div className="w-full h-80 ">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={allData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="totalPrice"
              name="Total Price"
              unit="$"
              stroke="#1a3cb8"
              fill="#1a3cb8"
            />
            <Area
              type="monotone"
              dataKey="extraPrice"
              name="Extra Price"
              unit="$"
              stroke="#6cb88c"
              fill="#6cb88c"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default memo(ChartSales);
