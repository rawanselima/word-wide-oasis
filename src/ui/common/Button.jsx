import React from "react";

const Button = ({ children, onClick, type }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="bg-blue-900 py-2 px-4 rounded-sm text-white my-2 mx-2 cursor-pointer hover:bg-blue-950 transition-all duration"
    >
      {children}
    </button>
  );
};

export default Button;
