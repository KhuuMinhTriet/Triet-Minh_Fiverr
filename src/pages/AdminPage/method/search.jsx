import React from 'react';
import { fetchDetail } from '../../../redux/adminSlice';
const SearchMenu = ({
  pageSize,
  pageIndex,
  onPageSizeChange,
  onPageIndexChange,
  onSearch,
  onResetSearch,
  page
}) => {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <h2> Vui lòng chọn:</h2>
      <label htmlFor="pageSize" className="text-sm font-medium">
        Số {page} hiển thị trong một trang
      </label>
      <input
        type="number"
        id="pageSize"
        value={pageSize}
        onChange={onPageSizeChange}
        min={1}
        className="border border-gray-300 rounded-md px-2 py-1 w-20"
      />

      {/* Page Index Label and Input */}
      <label htmlFor="pageIndex" className="text-sm font-medium">
        Trang hiển thị
      </label>
      <input
        type="number"
        id="pageIndex"
        value={pageIndex}
        onChange={onPageIndexChange}
        min={1}
        className="border border-gray-300 rounded-md px-2 py-1 w-16"
      />

      {/* Search Button */}
      <button
        onClick={onSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Tìm kiếm
      </button>

      {/* Reset Button */}
      <button
        onClick={onResetSearch}
        className="bg-gray-500 text-white px-4 py-2 rounded-md"
      >
        Reset
      </button>
    </div>
  );
};

export default SearchMenu;
