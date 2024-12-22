import React from "react";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import { setComponent } from "../../../redux/adminSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const { pagination: { currentPage, totalPages } } = useSelector((state) => state.adminSlice);
  const handlePageChange = (selectedItem) => {
    const selectedPage = selectedItem.selected + 1; 
    dispatch(setComponent({ currentPage: selectedPage }));
  };

  return (
    <div className="flex justify-center my-4">
      <ReactPaginate
        previousLabel="Trước"
        nextLabel="Tiếp"
        breakLabel="..."
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName="flex gap-2"
        pageClassName="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        pageLinkClassName="no-underline"
        activeClassName="bg-blue-500 text-white"
        previousClassName="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
        nextClassName="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
        disabledClassName="opacity-50 cursor-not-allowed"
        forcePage={currentPage - 1} 
      />
    </div>
  );
};

export default Pagination;
