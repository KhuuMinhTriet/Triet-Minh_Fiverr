import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/adminSlice';
import LoginState from '../../pages/AdminPage/loginState';

const AdminHeader = () => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal('admin'));
  };


  return (
    <div className="flex justify-between items-center mb-6">
      <button
        className="text-4xl font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-6 py-3 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none shadow-lg flex items-center"
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

      {/* LoginState Component */}
  
    </div>
  );
};

export default AdminHeader;
