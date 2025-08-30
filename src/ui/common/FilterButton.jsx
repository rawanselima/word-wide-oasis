import React from "react";
import { useSearchParams } from "react-router-dom";

const FilterButton = ({ children, onClick, filterLabel }) => {
  const [searchParams] = useSearchParams();
  const label = searchParams.get(filterLabel) || "all";

  return (
    <button
      className={`px-3 py-1 outline-0 rounded-lg  mr-2 ${
        label.toLocaleLowerCase().replace("-", " ") ===
        children.toLocaleLowerCase()
          ? "bg-blue-800 text-white cursor-not-allowed"
          : "cursor-pointer"
      } `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default FilterButton;
