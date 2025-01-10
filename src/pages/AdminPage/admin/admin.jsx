import React from "react";
import Sidebar from "../../../components/Sidebar/sidebar";  // Sidebar được sử dụng ở đây
import Modal from "../Modal/addModal";
import AdminHeader from "../../../components/Header/adminHeader";
import NavigatePage from "./navigatePage";
import SearchMenu from "../method/search";
import LoginState from "../loginState";

const Admin = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
        {/* Sidebar Component */}
       

          <Sidebar className="w-full lg:w-auto" />
   

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-end mb-4">
            <LoginState className="flex-1 mb-4 lg:mb-0 lg:ml-4" />
          </div>

          {/* Search Menu */}
          <div className="mb-6">
            <AdminHeader className="flex-1 mb-2 lg:mb-0" />
            <SearchMenu />
          </div>

          {/* Page Content */}
          <div className="overflow-auto">
            <NavigatePage />
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <Modal />
    </div>
  );
};

export default Admin;
