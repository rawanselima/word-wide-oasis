import React, { memo, useState } from "react";
import Button from "../ui/common/Button";
import useLogin from "../hooks/useLogin";
import { ImSpinner6 } from "react-icons/im";
import toast from "react-hot-toast";

const Login = () => {
  const styleInput = `border-gray-200/80 border-1 outline-0 rounded py-1 px-2 w-full my-2 focus:border-blue-900`;
  const styleDiv = "my-2 w-full";

  const [email, setEmail] = useState("fady@gmail.com");
  const [password, setPassword] = useState("123456789");
  const { mutate, isPending } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    mutate(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen ">
      <section className="md:w-md w-full m-auto pt-12">
        <div className="text-center">
          <img
            className="w-32 m-auto"
            src="/assets/logo-light.png"
            alt="logo"
          />
          <h1 className="text-blue-950 font-bold text-3xl my-8">
            Log in to your account
          </h1>
        </div>
        <form
          className="bg-white p-5  rounded border-1 border-gray-100"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className={styleDiv}>
            <label htmlFor="email"> Email address </label>
            <input
              type="email"
              name="email"
              value={email}
              className={styleInput}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styleDiv}>
            <label htmlFor="password"> Password </label>
            <input
              type="password"
              name="password"
              value={password}
              className={styleInput}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-900 py-2 px-4 w-full rounded-sm text-white my-2 mx-2 cursor-pointer hover:bg-blue-950 transition-all duration"
          >
            {isPending ? (
              <ImSpinner6 className="animate-spin m-auto" />
            ) : (
              " Login"
            )}
          </button>
        </form>
      </section>
    </main>
  );
};

export default memo(Login);
