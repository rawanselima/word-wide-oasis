import { useQuery } from "@tanstack/react-query";
import React, { memo } from "react";
import { FetchBookingDetails } from "../services/ApiBooking";
import { useParams } from "react-router-dom";
import Error from "../ui/common/Error";
import Loader from "../ui/common/Loader";
import Header from "../ui/common/Header";
import BookingNavBar from "../ui/booking/BookingNavBar";
import BookingInfo from "../ui/booking/BookingInfo";
import BookingChecked from "../ui/booking/BookingChecked";
import useFetchSettings from "../hooks/UseFetchSettings";

const CheckInBooking = () => {
  const { id } = useParams();

  const {
    data,
    isLoading: loadingBooking,
    isError,
  } = useQuery({
    queryKey: ["checkIn", id],
    queryFn: () => FetchBookingDetails(id),
  });

  const {
    data: settings,
    isFetched,
    isLoading: loadingSettings,
  } = useFetchSettings();

  if (loadingBooking || loadingSettings) return <Loader />;

  if (isError) return <Error />;

  return (
    <>
      <Header />
      <main className="pt-5 bg-gray-50 min-h-screen px-8">
        <BookingNavBar>
          <p> Check In Booking #{id} </p>
        </BookingNavBar>

        <BookingInfo data={data} />

        <BookingChecked data={data} settings={settings} isFetched={isFetched} />
      </main>
    </>
  );
};

export default memo(CheckInBooking);
