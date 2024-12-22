import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchResults, searchUserOnPage, resetSearchResults, searchJob, searchTypeJob, searchService } from "../../../redux/adminSlice";
import Sidebar from "../../../components/Sidebar/sidebar";
import Modal from "../Modal/addModal";
import AdminHeader from "../../../components/Header/adminHeader";
import NavigatePage from "./navigatePage";

const Admin = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.adminSlice.currentPage);
  const { list: searchResults } = useSelector(state => state.adminSlice.searchResults);
  const modalType = useSelector(state => state.adminSlice.modalType);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [modal, isModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  
  // Determine the page based on the current route
  const page = currentPage === '/admin/QuanLyNguoiDung' ? 'người dùng' : 
               currentPage === '/admin/QuanLyCongViec' ? 'công việc' : 
               currentPage === '/admin/QuanLyLoaiCongViec' ? 'loại công việc' : 
               currentPage === '/admin/QuanLyDichVu' ? 'dịch vụ' : 'khác';

  // Pagination states
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);


  const openModal = (type) => {

    isModal(true);
  };

  const closeModal = () => {
    isModal(false);
  };

  // Pagination handlers
  const handlePageSizeChange = (e) => {
    const newPageSize = parseInt(e.target.value, 10);
    setPageSize(newPageSize);
    setPageIndex(1);  
  };

  const handlePageIndexChange = (e) => {
    const newPageIndex = parseInt(e.target.value, 10);
    setPageIndex(newPageIndex);
  };

  // Handle search
  const handleSearch = () => {
    
    const payload = {
      pageIndex,
      pageSize
    };

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
    dispatch(setSearchResults(payload))
  };

  // Reset search results
  const handleResetSearch = () => {
    dispatch(resetSearchResults());
  };

  return (
    <div>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar Component */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          openModal={openModal}
        />

        {/* Main Content */}
        <div className="flex-1 p-6">
          <AdminHeader openModal={openModal} />

          <div className="flex items-center space-x-4 mb-4">
            <h2> Vui lòng chọn:</h2>
            <label htmlFor="pageSize" className="text-sm font-medium">
              Số {page} hiển thị trong một trang
            </label>
            <input
              type="number"
              id="pageSize"
              value={pageSize}
              onChange={handlePageSizeChange}
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
              onChange={handlePageIndexChange}
              min={1}
              className="border border-gray-300 rounded-md px-2 py-1 w-16"
            />

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Tìm kiếm
            </button>

            {/* Reset Button */}
            <button
              onClick={handleResetSearch}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Reset
            </button>
          </div>

          {/* Page Content */}
          <NavigatePage searchResults={searchResults} />
        </div>
      </div>

      {/* Modal Component */}
      <Modal isVisible={modal} closeModal={closeModal} modalType={modalType} />
    </div>
  );
};

export default Admin;
