import Header from "../ui/common/Header";
import UserName from "../ui/userProfile/UserName";
import { memo } from "react";
import UserPassword from "../ui/userProfile/UserPassword";

const UserProfile = () => {
  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen mt-12 md:p-10 p-2">
        <h1 className="text-gray-700 text-3xl md:pt-0 pt-8 mb-6 font-bold">
          Update your account
        </h1>
        <UserName />
        <UserPassword />
      </main>
    </>
  );
};

export default memo(UserProfile);
