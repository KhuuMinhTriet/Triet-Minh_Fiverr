import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/adminSlice';

const AdminHeader = () => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal('admin')); 
  };

  return (
    <div className="mb-6">
      <button
        className="text-4xl font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-6 py-3 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none shadow-lg flex items-center mb-6"
        onClick={handleOpenModal}
      >
        <svg
          className="w-5 h-5 mr-2 ms-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="6"
            d="M12 5v14m7-7H5"
          />
        </svg>
        Thêm quản trị viên
      </button>
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

export default AdminHeader;
