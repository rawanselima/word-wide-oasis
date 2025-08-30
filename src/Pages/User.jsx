import React from "react";
import Button from "../ui/common/Button";
import Header from "../ui/common/Header";
import { useForm } from "react-hook-form";
import useSignup from "../hooks/useSignup";
import { ImSpinner6 } from "react-icons/im";
const User = () => {
  const styleInput =
    "border-1 border-gray-300 rounded-sm py-1 px-2 outline-0 md:mx-8 my-2 md:w-md w-full focus:border-blue-900";
  const styleDiv = "my-5 flex justify-between items-center flex-wrap";

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useSignup(reset);

  function submit(data) {
    const newUser = {
      email: data.email,
      password: data.password,
      fullName: data.fullName,
    };
    mutate(newUser);
  }

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen mt-12 md:p-10 p-2">
        <h1 className="text-gray-700 text-3xl md:pt-0 pt-8 md:mx-3 mb-6 font-bold">
          Create New User
        </h1>
        <section>
          <form
            className="bg-white p-5 rounded-sm md:w-3xl"
            onSubmit={handleSubmit(submit)}
          >
            <div className={styleDiv}>
              <label htmlFor="fullName"> Full Name </label>
              <input
                type="text"
                name="fullName"
                className={styleInput}
                {...register("fullName", {
                  required: "This is required.",
                })}
              />
              {errors?.fullName && (
                <p className="text-red-800 block text-center ms-32">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div className={styleDiv}>
              <label htmlFor="email"> Email </label>
              <input
                type="email"
                name="email"
                className={styleInput}
                {...register("email", {
                  required: "This is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
            </div>
            {errors?.email && (
              <p className="text-red-800 block text-center ms-32">
                {errors.email.message}
              </p>
            )}
            <div className={styleDiv}>
              <label htmlFor="password"> Password </label>
              <input
                type="password"
                name="password"
                className={styleInput}
                {...register("password", {
                  required: "This is required.",
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
              <label htmlFor="confirmPassword">Confirm Password </label>
              <input
                type="password"
                name="confirmPassword"
                className={styleInput}
                {...register("confirmPassword", {
                  required: "This is required.",
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
              <Button type="submit">
                {isPending ? (
                  <ImSpinner6 className="animate-spin mr-2" />
                ) : (
                  "Create New User "
                )}
              </Button>
              <button
                type="reset"
                className="border-1 border-gray-300 py-2 px-4 rounded-sm text-gray-800 my-2 mx-2 cursor-pointer"
              >
                cancel
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default User;
