import React, { memo } from "react";
import Button from "../common/Button";
import { ImSpinner6 } from "react-icons/im";
import useUpdateUser from "../../hooks/useUdateUser";
import { useForm } from "react-hook-form";

const UserPassword = () => {
  const { mutate, isPending } = useUpdateUser();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  function submit(data) {
    if (!data) return;
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  }

  const styleInput =
    "border-1 border-gray-300 rounded-sm py-1 px-2 outline-0 md:mx-8 my-2 md:w-md w-full focus:border-blue-900";
  const styleDiv = "my-5 flex justify-between items-center flex-wrap";

  return (
    <section className="my-10">
      <h2 className="text-gray-700 text-lg font-semibold mb-4">
        Update password
      </h2>
      <form
        className="bg-white p-5 rounded-sm md:w-3xl"
        onSubmit={handleSubmit(submit)}
      >
        <div className={styleDiv}>
          <label htmlFor="password"> change Password </label>
          <input
            type="password"
            name="password"
            className={styleInput}
            {...register("password", {
              required: "This Field is Required",
              minLength: {
                value: 8,
                message: "Minimum password should be at least 8 characters",
              },
            })}
          />
        </div>
        {errors?.password && (
          <p className="text-red-800 block text-center ms-32">
            {errors.password.message}
          </p>
        )}
        <div className={styleDiv}>
          <label htmlFor="confirmPassword"> Confirm Password </label>
          <input
            type="password"
            name="confirmPassword"
            className={styleInput}
            {...register("confirmPassword", {
              required: "This Field is Required",
              validate: (value) => {
                return (
                  value === getValues("password") || "Password don't Match"
                );
              },
            })}
          />
        </div>
        {errors?.confirmPassword && (
          <p className="text-red-800 block text-center ms-32">
            {errors.confirmPassword.message}
          </p>
        )}

        <div className="flex justify-end">
          <button
            type="reset"
            className="y-2 px-4 rounded-sm text-gray-600 border-2 border-gray-200 my-2 mx-2 cursor-pointer"
          >
            Cancel
          </button>
          <Button type="submit">
            {isPending ? (
              <ImSpinner6 className="animate-spin mr-2" />
            ) : (
              "Change Password"
            )}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default memo(UserPassword);
