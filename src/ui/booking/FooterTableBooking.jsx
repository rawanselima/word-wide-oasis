import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
const FooterTableBooking = ({ next, prev, currentPage, numberPages }) => {
  const style =
    "hover:bg-blue-900 hover:text-white transition-all duration-200 p-2 rounded flex items-center justify-center ";
  return (
    <tr>
      <td colSpan="3" className="text-left pl-3 py-3">
        Showing <span> {currentPage} </span> to <span> {numberPages} </span>
      </td>

      <td colSpan="3" className="text-right pr-3 py-3">
        <p className="flex w-full justify-end-safe items-center gap-4">
          <button
            className={`${
              +currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
            } ${style} `}
            onClick={() => prev()}
          >
            <span className="text-2xl">
              <MdKeyboardArrowLeft />
            </span>
            Previous
          </button>
          <button
            className={`${
              +currentPage === numberPages
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }  ${style}`}
            onClick={() => next()}
          >
            Next
            <span className="text-2xl">
              <MdKeyboardArrowRight />
            </span>
          </button>
        </p>
      </td>
    </tr>
  );
};

export default FooterTableBooking;
