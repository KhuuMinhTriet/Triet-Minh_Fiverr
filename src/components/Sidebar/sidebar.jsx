import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPage, openModal } from '../../redux/adminSlice';

const Sidebar = ({ sidebarOpen, setSidebarOpen, openMenu, setOpenMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentPage = useSelector((state) => state.adminSlice.currentPage);

  // Toggle the menu (expand/collapse) without navigation
  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  // Handle navigation only for specific items (e.g., "Danh sách người dùng")
  const navigateToPage = (page) => {
    navigate(`/admin/${page}`);
    dispatch(setPage(`/admin/${page}`));
  };

  // Toggle sidebar visibility
  const toggleDashBoard = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Check if the current page is active
  const isActivePage = (pageName) => currentPage === `/admin/${pageName}`;

  // Open modal for adding new entities
  const handleOpenModal = (modalType) => {
    dispatch(openModal(modalType));
  };

  return (
    <div
      className={`${
        sidebarOpen ? 'w-64' : 'w-16'
      } bg-blue-800 text-white flex flex-col transition-all duration-300 overflow-hidden`}
    >
      <button
        className="text-2xl p-4 focus:outline-none hover:bg-blue-700"
        onClick={toggleDashBoard}
      >
        ☰
      </button>
      {sidebarOpen && (
        <nav className="flex-1">
          <ul className="space-y-2">
            {/* Quản lý người dùng */}
            <li>
              <div
                className={`p-4 flex justify-between items-center cursor-pointer ${
                  openMenu === 'users' ? 'bg-blue-700' : 'hover:bg-blue-700'
                }`}
                onClick={() => toggleMenu('users')}
              >
                Quản lý người dùng
                <span>{openMenu === 'users' ? '▲' : '▼'}</span>
              </div>
              {openMenu === 'users' && (
                <ul className="pl-6 space-y-2">
                   <li
                    className="hover:bg-blue-700 p-2 rounded-md cursor-pointer"
                    onClick={() => navigateToPage('QuanLyNguoiDung')}
                  >
                    Danh sách người dùng
                  </li>
                  <li
                    className="hover:bg-blue-700 p-2 rounded-md cursor-pointer"
                    onClick={() => handleOpenModal('user')}
                  >
                    Thêm người dùng
                  </li>
                 
                </ul>
              )}
            </li>

            {/* Quản lý công việc */}
            <li>
              <div
                className={`p-4 flex justify-between items-center cursor-pointer ${
                  openMenu === 'jobs' ? 'bg-blue-700' : 'hover:bg-blue-700'
                }`}
                onClick={() => toggleMenu('jobs')}
              >
                Quản lý công việc
                <span>{openMenu === 'jobs' ? '▲' : '▼'}</span>
              </div>
              {openMenu === 'jobs' && (
                <ul className="pl-6 space-y-2">
                  <li
                    className="hover:bg-blue-700 p-2 rounded-md cursor-pointer"
                    onClick={() => navigateToPage('QuanLyCongViec')}
                  >
                    Danh sách công việc
                  </li>
                  <li
                    className="hover:bg-blue-700 p-2 rounded-md cursor-pointer"
                    onClick={() => handleOpenModal('job')}
                  >
                    Thêm công việc
                  </li>
                  
                </ul>
              )}
            </li>

            {/* Quản lý loại công việc */}
            <li>
              <div
                className={`p-4 flex justify-between items-center cursor-pointer ${
                  openMenu === 'jobTypes' ? 'bg-blue-700' : 'hover:bg-blue-700'
                }`}
                onClick={() => toggleMenu('jobTypes')}
              >
                Quản lý loại công việc
                <span>{openMenu === 'jobTypes' ? '▲' : '▼'}</span>
              </div>
              {openMenu === 'jobTypes' && (
                <ul className="pl-6 space-y-2">
                  <li
                    className="hover:bg-blue-700 p-2 rounded-md cursor-pointer"
                    onClick={() => navigateToPage('QuanLyLoaiCongViec')}
                  >
                    Danh sách loại công việc
                  </li>
                  <li
                    className="hover:bg-blue-700 p-2 rounded-md cursor-pointer"
                    onClick={() => handleOpenModal('jobType')}
                  >
                    Thêm loại công việc
                  </li>
                </ul>
              )}
            </li>

            {/* Quản lý dịch vụ */}
            <li>
              <div
                className={`p-4 flex justify-between items-center cursor-pointer ${
                  openMenu === 'services' ? 'bg-blue-700' : 'hover:bg-blue-700'
                }`}
                onClick={() => toggleMenu('services')}
              >
                Quản lý dịch vụ
                <span>{openMenu === 'services' ? '▲' : '▼'}</span>
              </div>
              {openMenu === 'services' && (
                <ul className="pl-6 space-y-2">
                  <li
                    className="hover:bg-blue-700 p-2 rounded-md cursor-pointer"
                    onClick={() => navigateToPage('QuanLyDichVu')}
                  >
                    Danh sách công việc
                  </li>
                  <li
                    className="hover:bg-blue-700 p-2 rounded-md cursor-pointer"
                    onClick={() => handleOpenModal('service')}
                  >
                    Thêm dịch vụ
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Sidebar;
