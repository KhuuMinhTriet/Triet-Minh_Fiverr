import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setSearchResults, searchUserOnPage, resetSearchResults, searchJob, searchTypeJob, searchService, openModal } from '../../../redux/adminSlice';

const SearchMenu = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.adminSlice.currentPage);
  // Determine the page based on the current route
  const page = currentPage === '/admin/QuanLyNguoiDung' ? 'người dùng' : 
               currentPage === '/admin/QuanLyCongViec' ? 'công việc' : 
               currentPage === '/admin/QuanLyLoaiCongViec' ? 'loại công việc' : 
               currentPage === '/admin/QuanLyDichVu' ? 'dịch vụ' : 'khác';

  // Pagination states
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);
  const {list} = useSelector(state => state.adminSlice)
  const handleOpenModal = (modalType) => {
    switch(modalType) {
      case 'người dùng': dispatch(openModal('user'));
      return;
      case 'công việc': dispatch(openModal('job'));
      return;
      case 'loại công việc': dispatch(openModal('jobType'));
      return;
      case 'dịch vụ': dispatch(openModal('service'));
      return;
      default: break;
    }
      dispatch(openModal(modalType));
    };
    
 // Handle search
 const handleSearch = () => {
  const payload = { pageIndex, pageSize };
  switch (page) {
    case "người dùng":
      dispatch(searchUserOnPage(payload));
      break;
    case "công việc":
      dispatch(searchJob(payload));
      break;
    case "loại công việc":
      dispatch(searchTypeJob(payload));
      break;
    case "dịch vụ":
      dispatch(searchService(payload));
      break;
    default:
      break;
  }
  dispatch(setSearchResults(payload));
  console.log(list)
};

// Reset search results
const handleResetSearch = () => {
  dispatch(resetSearchResults());
};
  return (
    <div>
      <div className="flex items-center space-x-4 mb-4">
      <h2> Vui lòng chọn:</h2>
      <label htmlFor="pageSize" className="text-sm font-medium">
        Số {page} hiển thị trong một trang
      </label>
      <input
        type="number"
        id="pageSize"
        value={pageSize}
        onChange={(e) => {
          const newPageSize = parseInt(e.target.value, 10);
          setPageSize(newPageSize);
          setPageIndex(1);  
        }}
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
        onChange={(e) => {
          const newPageIndex = parseInt(e.target.value, 10);
          setPageIndex(newPageIndex);
        }}
        min={1}
        className="border border-gray-300 rounded-md px-2 py-1 w-16"
      />

      {/* Search Button */}
      <button
        onClick={() => handleSearch()}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Tìm kiếm
      </button>

      {/* Reset Button */}
      <button
        onClick={() => handleResetSearch()}
        className="bg-gray-500 text-white px-4 py-2 rounded-md"
      >
        Reset
      </button>
      <button
        onClick={() => handleOpenModal(page)}
        className="text-xl font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-6 py-3 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none shadow-lg flex items-center"
      >
        Thêm {page}
      </button>
      
    </div>
       <div className="mt-4 md:mt-0 relative w-full md:w-auto">
        <input
          type="text"
          placeholder="Nhập vào tài khoản hoặc họ tên người dùng..."
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none pl-10"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 17c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zM11 17l6 6"
          />
        </svg>
      </div>
    </div>
    
  );
};

export default SearchMenu;
