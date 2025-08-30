import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import UseFilterBooking from "./UseFilterBooking";

export default function UsePagination() {
  const { filteredValue = [], isLoading, isError } = UseFilterBooking();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = 10;

  useEffect(() => {
    if (!searchParams.get("page")) {
      searchParams.set("page", "1");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  const currentPage = +searchParams.get("page") || 1;
  const numberPages = Math.ceil(filteredValue.length / pageSize);

  function next() {
    if (currentPage < numberPages) {
      searchParams.set("page", String(currentPage + 1));
      setSearchParams(searchParams);
    }
  }

  function prev() {
    if (currentPage > 1) {
      searchParams.set("page", String(currentPage - 1));
      setSearchParams(searchParams);
    }
  }

  const startIndex = (currentPage - 1) * pageSize;
  const paginationData = filteredValue.slice(startIndex, startIndex + pageSize);

  return {
    next,
    prev,
    paginationData,
    currentPage,
    numberPages,
    isLoading,
    isError,
  };
}
