import React from "react";
import { BiError } from "react-icons/bi";

const Error = () => {
  return (
    <div>
      <p className="mt-10 font-bold text-6xl text-red-800  flex justify-center items-center">
        <span>
          <BiError />
        </span>
        Error
      </p>
    </div>
  );
};

export default Error;
