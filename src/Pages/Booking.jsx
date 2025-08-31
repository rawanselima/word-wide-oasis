import React, { memo } from "react";
import Header from "../ui/common/Header";
import FilterButton from "../ui/common/FilterButton";
import AllBooking from "../ui/booking/AllBooking";
import { FetchBooking } from "../services/ApiBooking";
import UseFilterBooking from "../hooks/UseFilterBooking";
const Booking = () => {
  const { setFilter, filteredValue } = UseFilterBooking();

  return (
    <>
      <Header />
      <main className="pt-5 bg-gray-50 min-h-screen">
        <section className="flex justify-between items-center flex-wrap mt-20 px-5">
          <h1 className="text-3xl font-bold text-gray-700"> All Booking </h1>

          <div className="bg-white border-1 border-gray-100 p-2 rounded my-2">
            <FilterButton
              onClick={() => setFilter("all")}
              filterLabel="filterBooking"
            >
              All
            </FilterButton>
            <FilterButton
              onClick={() => setFilter("checkedIn")}
              filterLabel="filterBooking"
            >
              CheckedIn
            </FilterButton>
            <FilterButton
              onClick={() => setFilter("checkedOut")}
              filterLabel="filterBooking"
            >
              CheckedOut
            </FilterButton>
            <FilterButton
              onClick={() => setFilter("unConfirmed")}
              filterLabel="filterBooking"
            >
              UnConfirmed
            </FilterButton>
          </div>
        </section>

        <div>
          <AllBooking data={filteredValue} />
        </div>
      </main>
    </>
  );
};

export default memo(Booking);
