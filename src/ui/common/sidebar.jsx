import React, { memo } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { IoCalendarOutline, IoSettingsOutline } from "react-icons/io5";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { PiUsersThree } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const SideBar = memo(() => {
  const activeStyle = "bg-gray-100 text-blue-900 ";
  const baseStyle = `flex items-center gap-2 my-4 text-lg px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-900 transition-all duration-300 `;

  return (
    <aside className="border-r border-gray-200 h-screen">
      <div className="text-center mt-10">
        <img
          src="/assets/logo-light.png"
          alt="wideImg"
          className="w-36 m-auto"
        />
      </div>

      <ul className="w-3/4 m-auto mt-6">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            isActive ? `${baseStyle} ${activeStyle}` : baseStyle
          }
        >
          <AiOutlineHome /> Home
        </NavLink>

        <NavLink
          to="/booking"
          className={({ isActive }) =>
            isActive ? `${baseStyle} ${activeStyle}` : baseStyle
          }
        >
          <IoCalendarOutline /> Booking
        </NavLink>

        <NavLink
          to="/cabins"
          className={({ isActive }) =>
            isActive ? `${baseStyle} ${activeStyle}` : baseStyle
          }
        >
          <HiOutlineHomeModern /> Cabins
        </NavLink>

        <NavLink
          to="/user"
          className={({ isActive }) =>
            isActive ? `${baseStyle} ${activeStyle}` : baseStyle
          }
        >
          <PiUsersThree /> Users
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? `${baseStyle} ${activeStyle}` : baseStyle
          }
        >
          <IoSettingsOutline /> Settings
        </NavLink>
      </ul>
    </aside>
  );
});

export default SideBar;
