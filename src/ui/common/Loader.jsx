import React from "react";
import { ImSpinner6 } from "react-icons/im";

const Loader = () => {
  return (
    <div className="flex justify-center items-center mt-14">
      <button
        type="button"
        disabled
        className="font-bold text-3xl text-blue-900 flex items-center"
      >
        <ImSpinner6 className="animate-spin mr-2" />
        Loading...
      </button>
    </div>
  );
};

export default Loader;
