import React, { memo } from "react";
import RowBooking from "./RowBooking";
import Loader from "../common/Loader";
import Error from "../common/Error";
import FooterTableBooking from "./FooterTableBooking";
import UsePagination from "../../hooks/UsePagination";

const AllBooking = () => {
  const {
    paginationData,
    currentPage,
    numberPages,
    isLoading,
    isError,
    next,
    prev,
  } = UsePagination();

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <section className="relative w-full max-w-[100vw] mt-10">
      <div className="w-full overflow-x-auto px-4">
        <table className="min-w-[1000px] w-full text-center border-separate border-spacing-0.5 border border-gray-200">
          <thead className="bg-gray-100">
            <tr className="uppercase text-gray-800">
              <th>cabin </th>
              <th className="text-left p-3"> guest</th>
              <th className="text-left p-3">date</th>
              <th>status</th>
              <th>amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginationData.length > 0 &&
              paginationData.map((item) => (
                <RowBooking key={item.id} item={item} />
              ))}
          </tbody>
          <tfoot>
            <FooterTableBooking
              currentPage={currentPage}
              numberPages={numberPages}
              next={next}
              prev={prev}
            />
          </tfoot>
        </table>
      </div>
    </section>
  );
};

export default memo(AllBooking);
