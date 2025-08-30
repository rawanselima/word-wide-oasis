import React, { memo, useEffect, useRef, useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { CiDark } from "react-icons/ci";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import SideBar from "./sidebar";
import useLogout from "../../hooks/useLogout";
import { ImSpinner6 } from "react-icons/im";
import useUser from "../../hooks/useUser";
import { NavLink } from "react-router-dom";
const Header = () => {
  const styleNav =
    "mr-3 cursor-pointer hover:text-blue-900 hover:scale-150 transition-all duration-300";

  const [showSideBar, setShowSideBar] = useState(false);
  const { mutate, isPending } = useLogout();
  const { data } = useUser();
  const { fullName, avatar } = data.user_metadata;
  const ref = useRef();

  useEffect(() => {
    if (!showSideBar) return;

    function closeSideBar(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowSideBar(false);
      }
    }

    const timeout = setTimeout(() => {
      document.addEventListener("click", closeSideBar);
    }, 50);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("click", closeSideBar);
    };
  }, [showSideBar]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-30 bg-white flex flex-row-reverse items-center border-b border-gray-200 p-3">
        <ul className="flex items-center text-xl text-blue-700 ml-7">
          <NavLink to="/userProfile" className={styleNav}>
            <CiUser />
          </NavLink>
          <li className={styleNav} onClick={() => mutate()}>
            {isPending ? (
              <ImSpinner6 className="animate-spin mr-2" />
            ) : (
              <IoIosLogOut />
            )}
          </li>
          <li
            className={`${styleNav} block xl:hidden`}
            onClick={() => setShowSideBar(!showSideBar)}
          >
            <HiMiniBars3CenterLeft />
          </li>
        </ul>
        <div className="flex items-center">
          <img
            src={avatar || "/assets/team-02.png"}
            alt="user"
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="text-gray-700"> {fullName} </span>
        </div>
      </header>

      {showSideBar && (
        <div className="fixed top-0 left-0 inset-0 backdrop-blur-sm z-40 w-full min-h-screen"></div>
      )}

      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          showSideBar ? "translate-x-0" : "-translate-x-full"
        }`}
        ref={ref}
      >
        <SideBar />
      </div>
    </>
  );
};

export default memo(Header);
