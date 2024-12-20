// Admin.js
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { setPage } from "../../../redux/adminSlice";
import Sidebar from "../../../components/Sidebar/sidebar";
import NavigatePage from "./navigatePage";
import Modal from "../Modal/addModal";
import AdminHeader from "../../../components/Header/adminHeader";
const Admin = () => {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [modal, isModal] = useState(false);
  const [modalType, setModalType] = useState(null); 
  const [openMenu, setOpenMenu] = useState(null);

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
        {/* Sidebar Component */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          openModal={openModal}
        />

        {/* navigatePage */}
        <div className="flex-1 p-6">
        <AdminHeader openModal = {openModal}/>
        <NavigatePage /></div>

      </div>

      {/* Modal Component */}
      <Modal isVisible={modal} closeModal={closeModal} modalType={modalType} />
    </div>
  );
};

export default Admin;
