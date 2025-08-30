import React, { memo, useState } from "react";
import RowCabin from "./RowCabin";
import { fetchCabins } from "../../services/ApiCabins";
import { useQuery } from "@tanstack/react-query";
import Loader from "../common/Loader";
import Error from "../common/Error";
import { PiEmpty } from "react-icons/pi";
import Button from "../common/Button";
import AddCabin from "./AddCabin";
import Modal from "../common/Modal";

const AllCabins = ({ filteredValue }) => {
  const [showForm, setShowForm] = useState(false);

  const { isError, isLoading } = useQuery({
    queryKey: ["cabin"],
    queryFn: () => fetchCabins(),
  });

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <>
      <section className="relative w-full max-w-[100vw] mt-10">
        <div className="w-full overflow-x-auto px-4">
          <table className="min-w-[1000px] w-full text-center border-separate border-spacing-0.5 border border-gray-200">
            <thead className="bg-gray-100">
              <tr className="uppercase">
                <th> </th>
                <th className="p-5 "> cabin</th>
                <th>price</th>
                <th>capacity</th>
                <th>discount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredValue.length === 0 ? (
                <tr className="font-semibold text-blue-900 text-2xl text-center w-full">
                  <td colSpan={6} className="py-6">
                    <p className="flex justify-center items-center gap-2">
                      <PiEmpty />
                      Not Cabins Yet
                    </p>
                  </td>
                </tr>
              ) : (
                filteredValue.map((ele) => {
                  return <RowCabin data={ele} key={ele.id} />;
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="absolute right-0">
          <Button
            onClick={() => {
              setShowForm(!showForm);
            }}
          >
            Add Cabin
          </Button>
        </div>
      </section>
      {showForm && (
        <Modal close={setShowForm} open={showForm}>
          <AddCabin setShowForm={setShowForm} />
        </Modal>
      )}
    </>
  );
};

export default memo(AllCabins);
