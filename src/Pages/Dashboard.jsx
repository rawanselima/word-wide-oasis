import React, { memo, useEffect, useState } from "react";
import Header from "../ui/common/Header";
import Statics from "../ui/dashboard/Statics";
import useBookingDashboard from "../hooks/useBookingDashboard";
import { BsDatabase } from "react-icons/bs";
import Loader from "../ui/common/Loader";
import ChartSales from "../ui/dashboard/ChartSales";
import ChartDuration from "../ui/dashboard/ChartDuration";
import TodayCheckIn from "../ui/dashboard/TodayCheckIn";

const Dashboard = memo(() => {
  const styleButton = `mx-1 cursor-pointer rounded px-3 py-1`;
  const [numDays, setNumDays] = useState();
  const { data, isLoading, searchParams } = useBookingDashboard(numDays);

  useEffect(() => {
    setNumDays(searchParams.get("last") || 7);
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen mt-12 md:p-10 p-2">
        <section className="flex justify-between items-center mb-6 flex-wrap">
          <h1 className="text-gray-700 text-3xl md:pt-0 pt-8  mb-6 font-bold">
            Dashboard
          </h1>
          <div className="bg-white p-3 rounded">
            <button
              className={`${styleButton} ${
                numDays == 7 && "bg-blue-800 text-white"
              } `}
              onClick={() => setNumDays(7)}
            >
              last 7 days
            </button>
            <button
              className={`${styleButton} ${
                numDays == 30 && "bg-blue-800 text-white"
              } `}
              onClick={() => setNumDays(30)}
            >
              last 30 days
            </button>
            <button
              className={`${styleButton} ${
                numDays == 90 && "bg-blue-800 text-white"
              } `}
              onClick={() => setNumDays(90)}
            >
              last 90 days
            </button>
          </div>
        </section>
        <Statics data={data} numDays={numDays} />
        <section className="grid xl:grid-cols-2 grid-cols-1 gap-3">
          <TodayCheckIn data={data} />
          <ChartDuration data={data} />
        </section>
        <ChartSales data={data} numDays={numDays} />
      </main>
    </>
  );
});

export default Dashboard;
