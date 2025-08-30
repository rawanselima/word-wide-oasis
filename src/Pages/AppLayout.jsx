import React, { memo } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../ui/common/sidebar";

const AppLayout = () => {
  return (
    <div className="flex">
      <div className="w-64 h-screen fixed top-0 xl:left-0 bg-white z-40 left-[-100%]">
        <SideBar />
      </div>

      <div className="flex-1 xl:ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default memo(AppLayout);
