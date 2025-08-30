import React, { memo, useState } from "react";
import Header from "../ui/common/Header";
import { useQuery } from "@tanstack/react-query";
import { FetchBookingDetails } from "../services/ApiBooking";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../ui/common/Error";
import Loader from "../ui/common/Loader";
import BookingNavBar from "../ui/booking/BookingNavBar";
import BookingInfo from "../ui/booking/BookingInfo";
import Button from "../ui/common/Button";
import { useDeleteBooking } from "../hooks/useDeleteBooking";
import ConfirmDelete from "../ui/common/ConfirmDelete";
import useEditBooking from "../hooks/useEditBooking";
const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["bookingDetails", id],
    queryFn: () => FetchBookingDetails(id),
  });

  const { mutation } = useDeleteBooking();
  const { mutate } = useEditBooking();

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <>
      <Header />
      <main className="pt-5 bg-gray-50 min-h-screen px-8">
        <BookingNavBar>
          <div className="flex items-center">
            <p>Booking #{id} </p>
            <span
              className={`w-fit rounded-full py-2 px-4 ml-3 text-sm font-medium ${
                data.status === "checkedin"
                  ? "text-green-700 bg-green-100"
                  : data.status === "checkedout"
                  ? "text-gray-700 bg-gray-100"
                  : "text-blue-800 bg-blue-100"
              }`}
            >
              {data.status}
            </span>
          </div>
        </BookingNavBar>

        <BookingInfo data={data} />

        <div className="flex justify-end">
          {data.status === "unconfirmed" ? (
            <Button onClick={() => navigate(`/checkIn/${id}`)}>Check In</Button>
          ) : data.status === "checkedin" ? (
            <Button
              onClick={() =>
                mutate({
                  updatedBooking: {
                    ...data,
                    guestID: data.guestID.id,
                    cabinID: data.cabinID.id,
                    status: "checkedout",
                  },
                  id,
                })
              }
            >
              CheckOut
            </Button>
          ) : null}
          <button
            className="bg-red-800 py-2 px-4 rounded-sm text-white my-2 cursor-pointer hover:bg-red-900 transition-all duration"
            onClick={() => setConfirmDelete(!confirmDelete)}
          >
            delete booking
          </button>
          <button
            className="border-2 border-gray-200 py-2 px-4 rounded-sm my-2 mx-2 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            back
          </button>
        </div>
        {confirmDelete && (
          <ConfirmDelete
            confirmDelete={confirmDelete}
            setConfirmDelete={setConfirmDelete}
            mutation={mutation}
            id={id}
          >
            <h1 className="text-2xl font-bold my-2"> Delete Booking </h1>
            <p className="text-gray-700">
              Are you sure you want to delete this Booking permanently? This
              action cannot be undone.
            </p>
          </ConfirmDelete>
        )}
      </main>
    </>
  );
};

export default memo(BookingDetails);
