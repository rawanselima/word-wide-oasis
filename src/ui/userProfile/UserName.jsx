import React, { memo, useState } from "react";
import useUser from "../../hooks/useUser";
import Button from "../common/Button";
import useUpdateUser from "../../hooks/useUdateUser";
import { ImSpinner6 } from "react-icons/im";

const UserName = () => {
  const { data } = useUser();
  const { fullName, avatar } = data.user_metadata;
  const [newFullName, setNewFullName] = useState(fullName);
  const [newAvatar, setNewAvatar] = useState(null);
  const { mutate, isPending } = useUpdateUser();

  console.log(data);

  const styleInput =
    "border-1 border-gray-300 rounded-sm py-1 px-2 outline-0 md:mx-8 my-2 md:w-md w-full focus:border-blue-900";
  const styleDiv = "my-5 flex justify-between items-center flex-wrap";

  function handleSubmit(e) {
    e.preventDefault();
    const updatedData = {
      fullName: newFullName,
    };
    if (
      newAvatar instanceof File ||
      (typeof Blob !== "undefined" && newAvatar instanceof Blob)
    ) {
      updatedData.avatar = newAvatar;
    }
    mutate(updatedData);
    console.log(newFullName, newAvatar);
  }
  return (
    <section>
      <h2 className="text-gray-700 text-lg font-semibold mb-4">
        Update User Data
      </h2>
      <form
        className="bg-white p-5 rounded-sm md:w-3xl"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className={styleDiv}>
          <label htmlFor="email"> Email address </label>
          <input
            type="email"
            name="Email"
            className={`${styleInput} bg-gray-200 cursor-not-allowed`}
            value={data.email}
            disabled={true}
            readOnly={true}
          />
        </div>
        <div className={styleDiv}>
          <label htmlFor="fullName"> Full name </label>
          <input
            type="text"
            name="fullName"
            className={styleInput}
            value={newFullName}
            onChange={(e) => setNewFullName(e.target.value)}
          />
        </div>
        <div className={styleDiv}>
          <label htmlFor="avatar"> Avatar Image </label>
          <div className="flex flex-col gap-2">
            {/* Show current avatar if it exists */}
            {avatar && (
              <div className=" ml-8 flex items-center gap-2">
                <span className="text-sm text-gray-600">Current avatar:</span>
                <img
                  src={avatar}
                  alt="Current avatar"
                  className="w-12 h-12 rounded-full object-cover border"
                />
              </div>
            )}

            <input
              type="file"
              name="avatar"
              className={styleInput}
              accept="image/*"
              onChange={(e) =>
                setNewAvatar(
                  e.target.files && e.target.files[0] ? e.target.files[0] : null
                )
              }
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="reset"
            className="y-2 px-4 rounded-sm text-gray-600 border-2 border-gray-200 my-2 mx-2 cursor-pointer"
          >
            {" "}
            Cancel{" "}
          </button>
          <Button type="submit">
            {isPending ? (
              <ImSpinner6 className="animate-spin mr-2" />
            ) : (
              "Update Account"
            )}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default memo(UserName);
