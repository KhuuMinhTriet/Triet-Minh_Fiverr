import React from 'react';
import {useState} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPage} from '../../redux/adminSlice';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hover, setHover] = useState(false)
  const [sidebar, setSidebar] = useState(true)
  // Hàm trỏ đến trang quản lý tương ứng
  const toggleMenu = (menuName) => {
  

    switch(menuName){
      case 'users': navigateToPage('QuanLyNguoiDung');
      setHover('users');
      return;
      case 'jobs': navigateToPage('QuanLyCongViec');
      setHover('jobs');
      return;
      case 'jobTypes': navigateToPage('QuanLyLoaiCongViec');
      setHover('jobTypes');
      return;
      case 'services': navigateToPage('QuanLyDichVu');
      setHover('services');
      return;
      default: setHover(false);
    }
  };

  // Handle navigation only for specific items (e.g., "Danh sách người dùng")
  const navigateToPage = (page) => {
    navigate(`/admin/${page}`);
    dispatch(setPage(`/admin/${page}`));
  };

  // Toggle sidebar visibility
  const toggleDashBoard = () => {
    setSidebar(!sidebar)
  };


  return (
    <div
      className={`${
        sidebar ? 'w-64' : 'w-16'
      } bg-blue-800 text-white flex flex-col transition-all duration-300 overflow-hidden`}
    >
      <button
        className="text-2xl p-4 focus:outline-none hover:bg-blue-700"
        onClick={toggleDashBoard}
      >
        ☰
      </button>
      {sidebar && (
        <nav className="flex-1">
          <ul className="space-y-2">
            {/* Quản lý người dùng */}
            <li>
              <div
                className={`p-4 flex justify-between items-center cursor-pointer hover:bg-blue-700 ${
                  hover === 'users'? " bg-blue-700" : ""
                }`}
                onClick={() => toggleMenu('users')}
              >
                Quản lý người dùng
               
              </div>
            </li>

            {/* Quản lý công việc */}
            <li>
              <div
                className={`p-4 flex justify-between items-center cursor-pointer  hover:bg-blue-700${
                  hover === 'jobs' ? " bg-blue-700" : ""
                }`}
                onClick={() => toggleMenu('jobs')}
              >
                Quản lý công việc
             
              </div>
            </li>

            {/* Quản lý loại công việc */}
            <li>
              <div
                className={`p-4 flex justify-between items-center cursor-pointer  hover:bg-blue-700${
                  hover === 'jobTypes' ? " bg-blue-700" : ""
                }`}
                onClick={() => toggleMenu('jobTypes')}
              >
                Quản lý loại công việc
           
              </div>
            </li>

            {/* Quản lý dịch vụ */}
            <li>
              <div
                className={`p-4 flex justify-between items-center cursor-pointer  hover:bg-blue-700${
                  hover === 'services' ? " bg-blue-700" : ""
                }`}
                onClick={() => toggleMenu('services')}
              >
                Quản lý dịch vụ
  
              </div>
              
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Sidebar;
