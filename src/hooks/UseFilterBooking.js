import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { FetchBooking } from "../services/ApiBooking";

export default function UseFilterBooking() {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: FetchBooking,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filterBooking") || "all";

  const filteredValue =
    filter === "checkedIn"
      ? data.filter((item) => item.status.toLowerCase() === "checkedin")
      : filter === "checkedOut"
      ? data.filter((item) => item.status.toLowerCase() === "checkedout")
      : filter === "unConfirmed"
      ? data.filter((item) => item.status.toLowerCase() === "unconfirmed")
      : data;

  function setFilter(value) {
    searchParams.set("filterBooking", value);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return { filteredValue, setFilter, isLoading, isError };
}
