// Admin.js
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPage } from '../../redux/adminSlice';
import User from './user';
import Job from './job';
import JobType from './jobType';
import Service from './service';
import Modal from './Modal'; 

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentPage = useSelector(state => state.adminSlice.currentPage);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [modal, isModal] = useState(false);
  const [modalType, setModalType] = useState(null); 
  const [openMenu, setOpenMenu] = useState(null);

  // Hàm xử lý ẩn/hiện menu con
  const toggleMenu = (menuName, page) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
    navigate(`/admin/${page}`);
  };

  const toggleDashBoard = (dashboardName) => {
    setSidebarOpen(sidebarOpen === dashboardName ? null : dashboardName);
  };

  const renderPage = () => {
    switch (currentPage) {
      case '/admin/QuanLyNguoiDung':
        return <User />;
      case '/admin/QuanLyCongViec':
        return <Job />;
      case '/admin/QuanLyLoaiCongViec':
        return <JobType />;
      case '/admin/QuanLyDichVu':
        return <Service />;
      default:
        return 'Data not found';
    }
  };

  // Hàm xử lý mở modal theo loại
  const openModal = (type) => {
    setModalType(type);
    isModal(true);
  };

  const closeModal = () => {
    isModal(false);
  };

  return (
    <div>
      <div className="flex h-screen bg-gray-100">
        <div
          className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-blue-800 text-white flex flex-col transition-all duration-300 overflow-hidden`}
        >
          <button
            className="text-2xl p-4 focus:outline-none hover:bg-blue-700"
            onClick={() => toggleDashBoard(!sidebarOpen)}
          >
            ☰
          </button>
          {sidebarOpen && (
            <nav className="flex-1">
              <ul className="space-y-2">
                <li>
                  <div
                    className="p-4 flex justify-between items-center hover:bg-blue-700 cursor-pointer"
                    onClick={() => toggleMenu('users', 'QuanLyNguoiDung')}
                  >
                    Quản lý người dùng
                    <span>{openMenu === 'users' ? '▲' : '▼'}</span>
                  </div>
                  {openMenu === 'users' && (
                    <ul className="pl-6 space-y-2">
                      <li
                        className="hover:bg-blue-700 p-2 rounded-md cursor-pointer"
                        onClick={() => dispatch(setPage('/admin/QuanLyNguoiDung'))}
                      >
                        Xem danh sách
                      </li>
                      <li
                        className="hover:bg-blue-700 p-2 rounded-md cursor-pointer"
                        onClick={() => openModal('user')} // Mở modal thêm người dùng
                      >
                        Thêm người dùng
                      </li>
                     
                    </ul>
                  )}
                </li>
                     {/* Menu Quản lý công việc */}
                     <li>
                  <div
                    className="p-4 flex justify-between items-center hover:bg-blue-700 cursor-pointer"
                    onClick={() => toggleMenu('jobs', 'QuanLyCongViec')}
                  >
                    Quản lý công việc
                    <span>{openMenu === 'jobs' ? '▲' : '▼'}</span>
                  </div>
                  {openMenu === 'jobs' && (
                    <ul className="pl-6 space-y-2">
                      <li
                        className="hover:bg-blue-700 p-2 rounded-md cursor-pointer"
                        onClick={() => dispatch(setPage('/admin/QuanLyCongViec'))}
                      >
                        Danh sách công việc
                      </li>
                      <li
                        className="hover:bg-blue-700 p-2 rounded-md cursor-pointer"
                        onClick={() => openModal('job')} // Mở modal thêm công việc
                      >
                        Thêm công việc
                      </li>
                    
                    </ul>
                  )}
                </li>

                {/* Menu Quản lý loại công việc */}
   <li>
     <div
       className="p-4 flex justify-between items-center hover:bg-blue-700 cursor-pointer"
       onClick={() => toggleMenu("jobTypes", 'QuanLyLoaiCongViec')}
     >
       Quản lý loại công việc
       <span>{openMenu === "jobTypes" ? "▲" : "▼"}</span>
     </div>
     {openMenu === "jobTypes" && (
       <ul className="pl-6 space-y-2">
         <li className="hover:bg-blue-700 p-2 rounded-md cursor-pointer" onClick = {() => dispatch(setPage('/admin/QuanLyLoaiCongViec'))}>
           Danh sách loại
         </li>
         <li className="hover:bg-blue-700 p-2 rounded-md cursor-pointer" onClick = {() => openModal('jobType')}>
           Thêm loại công việc
         </li>

       </ul>
     )}
   </li>
   {/* Menu Quản lý dịch vụ */}
   <li>
     <div
       className="p-4 flex justify-between items-center hover:bg-blue-700 cursor-pointer"
       onClick={() => toggleMenu("services", 'QuanLyDichVu')}
     >
       Quản lý dịch vụ
       <span>{openMenu === "services" ? "▲" : "▼"}</span>
     </div>
     {openMenu === "services" && (
       <ul className="pl-6 space-y-2">
         <li className="hover:bg-blue-700 p-2 rounded-md cursor-pointer" onClick = {() => dispatch(setPage('/admin/QuanLyDichVu'))} >
           Danh sách dịch vụ
         </li>
         <li className="hover:bg-blue-700 p-2 rounded-md cursor-pointer" onClick = {() => openModal('service')}>
           Thêm dịch vụ
         </li>
       
       </ul>
     )}
   </li>
              </ul>
            </nav>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Thêm quản trị viên</h2>
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="mt-4 md:mt-0 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          {/* Table */}
          {renderPage()}
        </div>
      </div>

      {/* Modal Component */}
      <Modal isVisible={modal} closeModal={closeModal} modalType={modalType} />
    </div>
  );
};

export default Admin;
