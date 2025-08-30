import { formatDistance } from "date-fns";

export default function useDate({ sDate, eDate }) {
  const startDateString = new Date(sDate);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const startDate = startDateString.toLocaleString("en-US", options);

  const endDateString = new Date(eDate);
  const endDate = endDateString.toLocaleDateString("en-US", options);

  const fromDate = new Date();
  const toDate = new Date(startDate);

  const duration = formatDistance(toDate, fromDate, { addSuffix: true });

  return { startDate, endDate, duration };
}
