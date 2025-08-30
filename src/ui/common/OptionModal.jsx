import React, { useEffect, useRef } from "react";
const OptionModal = ({ data, bottom, close, open }) => {
  const ref = useRef();

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        close(false);
      }
    };

    const timeout = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 50);

    return () => {
      clearTimeout(timeout);
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`absolute ${bottom} right-7 shadow-2xl rounded border-1 border-gray-300 z-3 min-w-32 bg-white`}
    >
      <ul>
        {data.map((item, index) => {
          return (
            item.label && (
              <li
                key={index}
                className="px-3 flex items-center justify-center text-gray-700 py-2 cursor-pointer hover:bg-gray-100 transition-all duration-200"
                onClick={item.function}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
};

export default OptionModal;
