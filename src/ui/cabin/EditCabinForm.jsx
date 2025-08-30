import React, { memo } from "react";
import Button from "../common/Button";
import { useForm } from "react-hook-form";

import { ImSpinner6 } from "react-icons/im";
import { UseCreateCabin } from "../../hooks/UseCreateCabin";
import { EditCabin } from "../../services/ApiCabins";
import { UseEditCabin } from "../../hooks/UseEditCabin";
const EditCabinForm = ({ onClose, data }) => {
  const { register, formState, handleSubmit, getValues, reset } = useForm({
    defaultValues: {
      name: data.name,
      maxCapacity: data.maxCapacity,
      regularPrice: data.regularPrice,
      discount: data.discount,
      description: data.description,
      image: data.image,
    },
  });

  const { errors } = formState;

  const mutation = UseEditCabin({
    onClose,
    reset,
  });
  
  function onSubmitting(dataForm) {
    const image =
      typeof dataForm.image === "string" ? dataForm.image : dataForm.image[0];
    const updatedCabin = {
      ...dataForm,
      image: image,
    };

    mutation.mutate({ newCabin: updatedCabin, id: data.id });
  }

  const styleInput = `border-gray-300 border-1 outline-0 rounded-lg py-2 px-3 mx-3 w-1/2 sm:w-3/4 ${
    mutation.isPending && "bg-gray-300"
  }`;
  const styleDiv = "my-7 flex justify-between items-center w-full";

  return (
    <form onSubmit={handleSubmit(onSubmitting)} className="max-w-3xl m-auto">
      <div className={styleDiv}>
        <label htmlFor="name">Cabin Name</label>
        <input
          type="text"
          className={styleInput}
          disabled={mutation.isPending}
          {...register("name", { required: "this filled is required" })}
        />
      </div>
      {errors?.name?.message ? (
        <p className="text-red-800 block text-center ms-32">
          {errors.name.message}
        </p>
      ) : null}

      <div className={styleDiv}>
        <label htmlFor="maxCapacity">Maximum capacity</label>
        <input
          type="number"
          disabled={mutation.isPending}
          className={styleInput}
          min={1}
          {...register("maxCapacity", { required: "this filled is required" })}
        />
      </div>
      {errors?.maxCapacity?.message ? (
        <p className="text-red-800 block text-center ms-32">
          {errors.maxCapacity.message}
        </p>
      ) : null}

      <div className={styleDiv}>
        <label htmlFor="regularPrice">Regular price</label>
        <input
          type="number"
          disabled={mutation.isPending}
          name="regularPrice"
          className={styleInput}
          min={0}
          {...register("regularPrice", { required: "this filled is required" })}
        />
      </div>
      {errors?.regularPrice?.message ? (
        <p className="text-red-800 block text-center ms-32">
          {errors.regularPrice.message}
        </p>
      ) : null}

      <div className={styleDiv}>
        <label htmlFor="discount">Discount</label>
        <input
          disabled={mutation.isPending}
          type="number"
          name="discount"
          className={styleInput}
          min={0}
          {...register("discount", {
            required: "This field is required",
            validate: (discount) => {
              const regularPrice = getValues("regularPrice");
              return (
                parseFloat(discount) <= parseFloat(regularPrice) ||
                "Discount must be less than or equal to regular price"
              );
            },
          })}
        />
      </div>
      {errors?.discount?.message ? (
        <p className="text-red-800 block text-center ms-32">
          {errors.discount.message}
        </p>
      ) : null}

      <div className={styleDiv}>
        <label htmlFor="image"> Cabin image </label>
        <input
          disabled={mutation.isPending}
          type="file"
          name="image"
          accept="images/*"
          className={styleInput}
          {...register("image")}
        />
      </div>

      <div className="">
        <label htmlFor="Description" className="block text-left">
          Description for website
        </label>
        <textarea
          name="description"
          disabled={mutation.isPending}
          id=""
          rows={4}
          className={`${styleInput} w-full sm:w-full ms-0 mt-3`}
          {...register("description", { required: "this filled is required" })}
        ></textarea>
      </div>
      {errors?.description?.message ? (
        <p className="text-red-800 block text-center ms-32">
          {errors.description.message}
        </p>
      ) : null}

      <Button type="submit">
        {mutation.isPending ? (
          <ImSpinner6 className="animate-spin mr-2" />
        ) : (
          "Edit Cabin"
        )}
      </Button>
    </form>
  );
};

export default memo(EditCabinForm);
