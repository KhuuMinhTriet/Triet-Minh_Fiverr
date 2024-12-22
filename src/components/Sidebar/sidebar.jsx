import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPage, openModal } from '../../redux/adminSlice';

const Sidebar = ({ sidebarOpen, setSidebarOpen, openMenu, setOpenMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentPage = useSelector(state => state.adminSlice.currentPage);

  const toggleMenu = (menuName, page) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
    navigate(`/admin/${page}`);
    dispatch(setPage(`/admin/${page}`));
  };

  const toggleDashBoard = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Helper to determine active page
  const isActivePage = (pageName) => currentPage === `/admin/${pageName}`;

  // Function to handle modal opening
  const handleOpenModal = (modalType) => {
    dispatch(openModal(modalType)); // Dispatch openModal with the modal type
  };

  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-blue-800 text-white flex flex-col transition-all duration-300 overflow-hidden`}>
      <button className="text-2xl p-4 focus:outline-none hover:bg-blue-700" onClick={toggleDashBoard}>
        ☰
      </button>
      {sidebarOpen && (
        <nav className="flex-1">
          <ul className="space-y-2">
            {/* Quản lý người dùng */}
            <li>
              <div
                className={`p-4 flex justify-between items-center cursor-pointer ${isActivePage('QuanLyNguoiDung') ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
                onClick={() => toggleMenu('users', 'QuanLyNguoiDung')}
              >
                Quản lý người dùng
                <span>{openMenu === 'users' ? '▲' : '▼'}</span>
              </div>
              {openMenu === 'users' && (
                <ul className="pl-6 space-y-2">
                  <li
                    className="hover:bg-blue-700 p-2 rounded-md cursor-pointer"
                    onClick={() => handleOpenModal('user')} // Open 'user' modal
                  >
                    Thêm người dùng
                  </li>
                </ul>
              )}
            </li>

            {/* Quản lý công việc */}
            <li>
              <div
                className={`p-4 flex justify-between items-center cursor-pointer ${isActivePage('QuanLyCongViec') ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
                onClick={() => toggleMenu('jobs', 'QuanLyCongViec')}
              >
                Quản lý công việc
                <span>{openMenu === 'jobs' ? '▲' : '▼'}</span>
              </div>
              {openMenu === 'jobs' && (
                <ul className="pl-6 space-y-2">
                  <li
                    className="hover:bg-blue-700 p-2 rounded-md cursor-pointer"
                    onClick={() => handleOpenModal('job')} // Open 'job' modal
                  >
                    Thêm công việc
                  </li>
                </ul>
              )}
            </li>

            {/* Quản lý loại công việc */}
            <li>
              <div
                className={`p-4 flex justify-between items-center cursor-pointer ${isActivePage('QuanLyLoaiCongViec') ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
                onClick={() => toggleMenu('jobTypes', 'QuanLyLoaiCongViec')}
              >
                Quản lý loại công việc
                <span>{openMenu === 'jobTypes' ? '▲' : '▼'}</span>
              </div>
              {openMenu === 'jobTypes' && (
                <ul className="pl-6 space-y-2">
                  <li
                    className="hover:bg-blue-700 p-2 rounded-md cursor-pointer"
                    onClick={() => handleOpenModal('jobType')} // Open 'jobType' modal
                  >
                    Thêm loại công việc
                  </li>
                </ul>
              )}
            </li>

            {/* Quản lý dịch vụ */}
            <li>
              <div
                className={`p-4 flex justify-between items-center cursor-pointer ${isActivePage('QuanLyDichVu') ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
                onClick={() => toggleMenu('services', 'QuanLyDichVu')}
              >
                Quản lý dịch vụ
                <span>{openMenu === 'services' ? '▲' : '▼'}</span>
              </div>
              {openMenu === 'services' && (
                <ul className="pl-6 space-y-2">
                  <li
                    className="hover:bg-blue-700 p-2 rounded-md cursor-pointer"
                    onClick={() => handleOpenModal('service')} // Open 'service' modal
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
