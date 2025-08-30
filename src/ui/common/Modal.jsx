import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ children, close, open }) => {
  const ref = useRef();

  useEffect(() => {
    if (!open) return;

    function closeModal(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        close(false);
      }
    }

    const timeout = setTimeout(() => {
      document.addEventListener("click", closeModal);
    }, 50);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("click", closeModal);
    };
  }, [open]);

  return (
    <>
      <div className="fixed top-0 left-0 inset-0 backdrop-blur-sm z-40 w-full min-h-screen"></div>

      <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center overflow-y-auto p-4">
        <div
          className="bg-white w-full max-w-2xl p-5 rounded-lg shadow-lg relative"
          ref={ref}
        >
          <button
            className="absolute right-5 top-5 text-xl cursor-pointer hover:scale-150 transition-all duration-200"
            onClick={() => close(false)}
          >
            <IoClose />
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
