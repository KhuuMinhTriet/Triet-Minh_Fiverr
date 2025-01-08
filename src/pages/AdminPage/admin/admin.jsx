import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/sidebar";
import Modal from "../Modal/addModal";
import AdminHeader from "../../../components/Header/adminHeader";
import NavigatePage from "./navigatePage";
import SearchMenu from '../method/search'

const Admin = () => { 
  return (
    <div>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar Component */}
        <Sidebar
        />

        {/* Main Content */}
        <div className="flex-1 p-6">
          <AdminHeader  />

          {/* Search Menu Component */}
          <SearchMenu
  
          />

          {/* Page Content */}
          <NavigatePage/>
        </div>
      </div>

      {/* Modal Component */}
      <Modal />
    </div>
  );
};

export default Admin;
