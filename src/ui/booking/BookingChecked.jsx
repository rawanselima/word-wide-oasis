import React, { memo, useState } from "react";
import Loader from "../common/Loader";
import useEditBooking from "../../hooks/useEditBooking";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

const BookingChecked = ({ data, settings, isFetched }) => {
  const { numGuests, guestID, numNights, hasBreakfast, id, isPaid, status } =
    data;
  const navigate = useNavigate();

  let totalBreakfastPrice = 0;

  if (isFetched) {
    if (numGuests > 0) {
      totalBreakfastPrice = numGuests * numNights * settings[0].breakFastPrice;
    } else {
      totalBreakfastPrice = numNights * settings[0].breakFastPrice;
    }
  }

  const [formState, setFormState] = useState({
    hasBreakfast: hasBreakfast,
    isPaid: isPaid,
    status: status,
  });

  const { mutate, isPending } = useEditBooking();

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormState((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      updatedBooking: formState,
      id: id,
    });

    if (formState.hasBreakfast && formState.isPaid) {
      mutate({
        updatedBooking: { ...formState, status: "checkedin" },
        id: id,
      });
    }
  };

  return (
    <section className="relative">
      <form onSubmit={handleSubmit}>
        <div className="bg-white my-5 p-5 text-lg flex items-center text-gray-800 ">
          <input
            type="checkbox"
            name="hasBreakfast"
            className="cursor-pointer w-6 h-6 accent-blue-900 mr-3"
            checked={formState.hasBreakfast}
            onChange={handleChange}
          />
          <label htmlFor="hasBreakfast">
            Want to add breakfast for ${totalBreakfastPrice} ?
          </label>
        </div>
        <div className="bg-white my-5 p-5 text-lg flex items-center text-gray-800 ">
          <input
            type="checkbox"
            name="isPaid"
            className="cursor-pointer w-6 h-6 accent-blue-900 mr-3"
            checked={formState.isPaid}
            onChange={handleChange}
          />

          <label htmlFor="isPaid">
            I confirm that{guestID.fullName} has paid the total amount of
            $650.00
          </label>
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </form>

      <p className="absolute bottom-0 left-35">
        <Button onClick={() => navigate(-1)}> Back </Button>
      </p>
    </section>
  );
};

export default memo(BookingChecked);
