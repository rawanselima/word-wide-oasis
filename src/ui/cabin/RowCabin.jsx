import React, { memo, useState } from "react";
import { UseDeleteCabin } from "../../hooks/UseDeleteCabin";
import EditCabinFrom from "./EditCabinForm";
import Modal from "../common/Modal";
import { SlOptionsVertical } from "react-icons/sl";
import OptionModal from "../common/OptionModal";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { ImSpinner6 } from "react-icons/im";
import ConfirmDelete from "../common/ConfirmDelete";
import { BsDashLg } from "react-icons/bs";
import EditCabinForm from "./EditCabinForm";
const RowCabin = ({ data }) => {
  const { id, discount, name, maxCapacity, regularPrice, image } = data;

  const mutation = UseDeleteCabin();
  const [editCabin, setEditCabin] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <>
      <tr className="bg-white relative" key={id}>
        <td>
          <img
            src={image}
            alt={name}
            className="w-30 h-20 bg-cover"
            loading="lazy"
          />
        </td>
        <td className="font-semibold"> {name} </td>
        <td> {regularPrice} $</td>
        <td>Fits up to {maxCapacity} guests</td>
        <td className="text-green-700">
          {discount ? (
            discount + "$"
          ) : (
            <span className="text-black flex justify-center text-2xl">
              <BsDashLg />
            </span>
          )}
        </td>
        <td>
          <button
            className="text-gray-700 cursor-pointer p-2 rounded-sm  hover:bg-gray-100 transition-all duration-200"
            onClick={() => setShowOptions(!showOptions)}
          >
            <SlOptionsVertical />
          </button>
        </td>

        {showOptions && (
          <td>
            <OptionModal
              open={showOptions}
              close={setShowOptions}
              bottom={"-bottom-17"}
              data={[
                {
                  icon: <RiDeleteBin6Fill />,
                  label: "delete",
                  function: () => setConfirmDelete(true),
                },
                {
                  icon: <MdEdit />,
                  label: "Edit",
                  function: () => setEditCabin(!editCabin),
                },
              ]}
            ></OptionModal>
          </td>
        )}
      </tr>

      {confirmDelete && (
        <tr>
          <td className="text-left">
            <ConfirmDelete
              confirmDelete={confirmDelete}
              setConfirmDelete={setConfirmDelete}
              id={id}
              mutation={mutation}
            >
              <h1 className="text-2xl font-bold my-2"> Delete Cabin </h1>
              <p className="text-gray-700">
                Are you sure you want to delete this cabins permanently? This
                action cannot be undone.
              </p>
            </ConfirmDelete>
          </td>
        </tr>
      )}

      {editCabin && (
        <tr>
          <td>
            <Modal close={setEditCabin} open={editCabin}>
              <EditCabinForm data={data} onClose={setEditCabin} />
            </Modal>
          </td>
        </tr>
      )}
    </>
  );
};

export default memo(RowCabin);
