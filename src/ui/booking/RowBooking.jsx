import React, { memo, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import OptionModal from "../common/OptionModal";
import { ImEye } from "react-icons/im";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import useDate from "../../hooks/useDate";
import ConfirmDelete from "../common/ConfirmDelete";
import { useDeleteBooking } from "../../hooks/useDeleteBooking";
import { IoBagCheckOutline } from "react-icons/io5";
import useEditBooking from "../../hooks/useEditBooking";
const RowBooking = ({ item }) => {
  const {
    id,
    cabinID,
    guestID,
    startDate: sDate,
    endDate: eDate,
    status,
    numNights,
    totalPrice,
  } = item;

  const { startDate, endDate, duration } = useDate({ sDate, eDate });
  const [showOptions, setShowOptions] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const navigate = useNavigate();
  const { mutation } = useDeleteBooking();
  const { mutate } = useEditBooking();

  return (
    <>
      <tr key={id} className="bg-white relative">
        <td> {cabinID.name} </td>
        <td className="text-left pl-3 my-.5 py-2">
          <p> {guestID.fullName} </p>
          <p className="text-gray-500"> {guestID.email} </p>
        </td>
        <td className="pl-3">
          <p className="flex items-center">
            {duration}
            <span className="mx-2 mt-2 text-xl">
              <IoIosArrowRoundForward />
            </span>
            {numNights} night day
          </p>
          <p className="text-gray-500 flex items-center my-.5">
            {startDate}
            <span className="mx-2  mt-2 text-xl">
              <IoIosArrowRoundForward />
            </span>
            {endDate}
          </p>
        </td>
        <td className="uppercase font-bold text-xs tracking-wider">
          <p
            className={`w-fit rounded-full py-2 px-4 m-auto ${
              status === "checkedin"
                ? "text-green-700 bg-green-100"
                : status === "checkedout"
                ? "text-gray-700 bg-gray-100"
                : "text-blue-800 bg-blue-100"
            }`}
          >
            {status}
          </p>
        </td>
        <td>{totalPrice} $</td>

        <td>
          <button
            className="text-gray-700 cursor-pointer p-2 rounded-sm  hover:bg-gray-100 transition-all duration-200"
            onClick={() => setShowOptions(!showOptions)}
          >
            <SlOptionsVertical />
          </button>
        </td>

        <td>
          {showOptions && (
            <OptionModal
              close={setShowOptions}
              open={showOptions}
              bottom={" -bottom-27"}
              data={[
                {
                  function: () => navigate(`/booking/${id}`),
                  icon: <ImEye />,
                  label: "show details",
                },
                status === "unconfirmed" && {
                  function: () => navigate(`/checkIn/${id}`),
                  icon: <IoMdCheckmarkCircleOutline />,
                  label: "checkIn",
                },
                status === "checkedin" && {
                  function: () =>
                    mutate({
                      updatedBooking: {
                        ...item,
                        guestID: item.guestID.id,
                        cabinID: item.cabinID.id,
                        status: "checkedout",
                      },
                      id,
                    }),

                  icon: <IoBagCheckOutline />,
                  label: "checkOut",
                },

                {
                  function: () => setConfirmDelete(!confirmDelete),
                  icon: <RiDeleteBin6Fill />,
                  label: "delete booking",
                },
              ]}
            />
          )}
        </td>
      </tr>

      {confirmDelete && (
        <tr>
          <td className="text-left">
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
          </td>
        </tr>
      )}
    </>
  );
};

export default memo(RowBooking);
