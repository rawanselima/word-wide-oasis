import React from "react";
import Modal from "./Modal";
import { ImSpinner6 } from "react-icons/im";

const ConfirmDelete = ({
  confirmDelete,
  setConfirmDelete,
  mutation,
  id,
  children,
}) => {
  return (
    <Modal close={setConfirmDelete} open={confirmDelete}>
      {children}
      <div className="my-3">
        <button
          className="bg-red-800 text-white py-2 px-4 rounded cursor-pointer mr-3"
          onClick={() => mutation.mutate(id)}
        >
          {mutation.isPending ? (
            <ImSpinner6 className="animate-spin mr-2" />
          ) : (
            "Delete"
          )}
        </button>
        <button
          className="border-1 border-gray-500  py-2 px-4 rounded cursor-pointer"
          onClick={() => setConfirmDelete(false)}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDelete;
