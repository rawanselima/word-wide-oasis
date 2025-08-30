import React, { memo } from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import { PiMoneyWavyBold } from "react-icons/pi";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { IoStatsChartOutline } from "react-icons/io5";
import Results from "./Results";
import { useQuery } from "@tanstack/react-query";
import { fetchCabins } from "../../services/ApiCabins";

const Statics = ({ data, numDays }) => {
  const { data: cabin, isLoading } = useQuery({
    queryKey: ["cabin"],
    queryFn: () => fetchCabins(),
  });

  if (isLoading) return;

  const numCabins = cabin.length;
  const numBooking = data.length;
  const totalSales = data.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkIn = data.filter((ele) => ele.status === "checkedin");
  const occupy =
    (checkIn.reduce((acc, cur) => acc + +cur.numNights, 0) / numDays) *
    numCabins;

  return (
    <section className="grid xl:grid-cols-4 md:grid-cols-2 mx-2 md:mx-0 gap-3">
      <Results
        icon={<IoBagHandleOutline />}
        color={"blue"}
        label={"booking"}
        statics={numBooking}
      />
      <Results
        icon={<PiMoneyWavyBold />}
        color={"green"}
        label={"sales"}
        statics={`$ ${totalSales}`}
      />
      <Results
        icon={<HiOutlineCalendarDays />}
        color={"sky"}
        label={"checkIn"}
        statics={checkIn.length}
      />
      <Results
        icon={<IoStatsChartOutline />}
        color={"orange"}
        label={"occupancy rate"}
        statics={`${occupy.toFixed(2)} %`}
      />
    </section>
  );
};

export default memo(Statics);
