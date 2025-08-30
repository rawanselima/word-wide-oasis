import React, { memo, useEffect } from "react";
import Header from "../ui/common/Header";
import { EditingSettings, FetchSettingsData } from "../services/ApiSettings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Loader from "../ui/common/Loader";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../ui/common/Button";
import { ImSpinner6 } from "react-icons/im";
import useFetchSettings from "../hooks/UseFetchSettings";

const Settings = () => {
  const styleInput =
    "border-1 border-gray-300 rounded-sm py-1 px-2 outline-0 md:mx-8 my-2  md:w-md w-full focus:border-blue-900";
  const styleDiv = "my-5 flex justify-between items-center flex-wrap";

  const { isFetched, isError, isLoading, data } = useFetchSettings();

  const { handleSubmit, register, reset } = useForm({});

  useEffect(() => {
    if (isFetched) {
      reset({
        minBookingLength: data[0].minBookingLength,
        maxBookingLength: data[0].maxBookingLength,
        maxGuestsPerBooking: data[0].maxGuestsPerBooking,
        breakFastPrice: data[0].breakFastPrice,
      });
    }
  }, [isFetched, data, reset]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: EditingSettings,
    onSuccess: () => {
      toast.success("Successfully Edited !");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmitting(newSettings) {
    const id = data[0].id;
    mutation.mutate({ newSettings, id });
  }

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen mt-12 md:p-10 p-2">
        <h1 className="text-gray-700 text-3xl md:pt-0 pt-8 md:mx-3 mb-6 font-bold">
          Update hotel settings
        </h1>
        {isLoading && <Loader />}
        {isError && <Error />}
        {!isLoading && !isError && (
          <form
            className="bg-white p-5 rounded-sm md:w-3xl"
            onSubmit={handleSubmit(onSubmitting)}
          >
            <div className={styleDiv}>
              <label htmlFor="minBookingLength">Minimum Night/Booking</label>
              <input
                type="number"
                name="minBookingLength"
                className={styleInput}
                {...register("minBookingLength")}
              />
            </div>
            <div className={styleDiv}>
              <label htmlFor="maxBookingLength">Maximum Night/Booking</label>
              <input
                type="number"
                name="maxBookingLength"
                className={styleInput}
                {...register("maxBookingLength")}
              />
            </div>
            <div className={styleDiv}>
              <label htmlFor="maxGuestsPerBooking">
                Maximum guests/booking
              </label>
              <input
                type="number"
                name="maxGuestsPerBooking"
                className={styleInput}
                {...register("maxGuestsPerBooking")}
              />
            </div>
            <div className={styleDiv}>
              <label htmlFor="breakFastPrice"> Breakfast Price </label>
              <input
                type="number"
                name="breakFastPrice"
                className={styleInput}
                {...register("breakFastPrice")}
              />
            </div>
            <div className="flex flex-row-reverse mr-6">
              <Button type="submit">
                {mutation.isPending ? (
                  <ImSpinner6 className="animate-spin mr-2" />
                ) : (
                  "Edit Settings"
                )}
              </Button>
            </div>
          </form>
        )}
      </main>
    </>
  );
};

export default memo(Settings);
