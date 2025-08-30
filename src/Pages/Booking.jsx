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
        <section className="flex justify-between flex-wrap mt-20 px-5">
          <h1 className="text-3xl font-bold text-gray-700"> All Booking </h1>
          <div className="flex flex-wrap items-center">
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
            <div>
              <form>
                <select
                  name="sort"
                  className=" bg-white border-1 border-gray-100 p-3 rounded ml-0 sm:ml-2 outline-0"
                  value="sort"
                >
                  <option value="date-dsc">Sort by date (recent first)</option>
                  <option value="date-asc">Sort by date (earlier first)</option>
                  <option value="lowAmount">Sort by amount (Low First)</option>
                  <option value="highAmount">
                    Sort by amount (High First)
                  </option>
                  <option value="lowCapacity">
                    Sort by Capacity (Low First)
                  </option>
                  <option value="highCapacity">
                    Sort by Capacity (High First)
                  </option>
                </select>
              </form>
            </div>
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
