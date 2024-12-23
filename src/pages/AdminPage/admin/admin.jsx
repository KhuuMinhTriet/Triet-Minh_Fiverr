import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchResults, searchUserOnPage, resetSearchResults, searchJob, searchTypeJob, searchService } from "../../../redux/adminSlice";
import Sidebar from "../../../components/Sidebar/sidebar";
import Modal from "../Modal/addModal";
import AdminHeader from "../../../components/Header/adminHeader";
import NavigatePage from "./navigatePage";
import SearchMenu from '../method/search'

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

          {/* Search Menu Component */}
          <SearchMenu
            pageSize={pageSize}
            pageIndex={pageIndex}
            onPageSizeChange={(e) => {
              const newPageSize = parseInt(e.target.value, 10);
              setPageSize(newPageSize);
              setPageIndex(1);  
            }}
            onPageIndexChange={(e) => {
              const newPageIndex = parseInt(e.target.value, 10);
              setPageIndex(newPageIndex);
            }}
            onSearch={handleSearch}
            onResetSearch={handleResetSearch}
            page={page}
          />

          {/* Page Content */}
          <NavigatePage searchResults={searchResults} />
        </div>
      </div>

      {/* Modal Component */}
      <Modal />
    </div>
  );
};

export default Admin;
