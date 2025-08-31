import React, { memo, useEffect } from "react";
import Header from "../ui/common/Header";
import AllCabins from "../ui/cabin/AllCabins";
import FilterButton from "../ui/common/FilterButton";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCabins } from "../services/ApiCabins";

const Cabin = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("filterCabin") === null) setFilter("all");
  }, [searchParams, setSearchParams]);

  const { data, isSuccess } = useQuery({
    queryKey: ["cabin"],
    queryFn: fetchCabins,
  });

  const filter = searchParams.get("filterCabin");
  const sort = searchParams.get("sortCabin");

  function setFilter(value) {
    searchParams.set("filterCabin", value);
    setSearchParams(searchParams);
  }

  function setSort(value) {
    searchParams.set("sortCabin", value);
    setSearchParams(searchParams);
  }

  const filteredValue =
    isSuccess && filter === "with-discount"
      ? data.filter((item) => +item.discount > 1)
      : filter === "no-discount"
      ? data.filter((item) => +item.discount <= 1)
      : data;

  const finalValue =
    isSuccess && sort === "name-asc"
      ? [...filteredValue].sort((a, b) => a.name.localeCompare(b.name))
      : sort === "name-dsc"
      ? [...filteredValue].sort((a, b) => b.name.localeCompare(a.name))
      : sort === "lowPrice"
      ? [...filteredValue].sort((a, b) => +a.regularPrice - +b.regularPrice)
      : sort === "highPrice"
      ? [...filteredValue].sort((a, b) => +b.regularPrice - +a.regularPrice)
      : sort === "lowCapacity"
      ? [...filteredValue].sort((a, b) => +a.maxCapacity - +b.maxCapacity)
      : sort === "highCapacity"
      ? [...filteredValue].sort((a, b) => +b.maxCapacity - +a.maxCapacity)
      : filteredValue;

  return (
    <>
      <Header />
      <main className="pt-5 bg-gray-50 min-h-screen">
        <section className="flex justify-between items-center flex-wrap mt-20 px-5">
          <h1 className="text-3xl font-bold text-gray-700"> All Cabins </h1>
          <div className="flex flex-wrap items-center">
            <div className="bg-white border-1 border-gray-100 p-2 rounded my-2">
              <FilterButton
                onClick={() => setFilter("all")}
                filterLabel="filterCabin"
              >
                All
              </FilterButton>
              <FilterButton
                onClick={() => setFilter("no-discount")}
                filterLabel="filterCabin"
              >
                No Discount
              </FilterButton>
              <FilterButton
                onClick={() => setFilter("with-discount")}
                filterLabel="filterCabin"
              >
                With Discount
              </FilterButton>
            </div>
            <div>
              <form>
                <select
                  name="sort"
                  className=" bg-white border-1 border-gray-100 p-3 rounded ml-0 sm:ml-2 outline-0"
                  value={sort || ""}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="name-asc">Sort by Name (A-Z)</option>
                  <option value="name-dsc">Sort by Name (Z-A)</option>
                  <option value="lowPrice">Sort by Price (Low First)</option>
                  <option value="highPrice">Sort by Price (High First)</option>
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
          <AllCabins filteredValue={finalValue} />
        </div>
      </main>
    </>
  );
};

export default memo(Cabin);
