import { useQuery } from "@tanstack/react-query";
import { createdAtBooking } from "../services/ApiBooking";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function useBookingDashboard(days) {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (days && days !== +searchParams.get("last")) {
      searchParams.set("last", days);
      setSearchParams(searchParams);
    }
  }, [days]);

  let numDays = +searchParams.get("last") || 7;

  const startDate = subDays(new Date(), numDays).toISOString();
  const { data, isLoading } = useQuery({
    queryKey: ["allBooking", numDays],
    queryFn: () => createdAtBooking(startDate),
  });

  return { data, isLoading, searchParams };
}
