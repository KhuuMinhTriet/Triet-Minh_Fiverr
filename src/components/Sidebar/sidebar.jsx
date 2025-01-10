import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPage } from "../../redux/adminSlice";
import {
  FaUsers,
  FaBriefcase,
  FaLayerGroup,
  FaServicestack,
  FaBars,
} from "react-icons/fa";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(true);
  const [active, setActive] = useState(""); // Track active menu

  const navigateToPage = (page, menuName) => {
    navigate(`/admin/${page}`);
    dispatch(setPage(`/admin/${page}`));
    setActive(menuName); // Highlight active menu
  };

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  const menuItems = [
    { name: "users", label: "Quản lý người dùng", icon: <FaUsers />, page: "QuanLyNguoiDung" },
    { name: "jobs", label: "Quản lý công việc", icon: <FaBriefcase />, page: "QuanLyCongViec" },
    { name: "jobTypes", label: "Quản lý loại công việc", icon: <FaLayerGroup />, page: "QuanLyLoaiCongViec" },
    { name: "services", label: "Quản lý dịch vụ", icon: <FaServicestack />, page: "QuanLyDichVu" },
  ];

  return (
    <div
      className={`${
        sidebar ? "w-64" : "w-16"
      } bg-blue-800 text-white h-screen flex flex-col`}
      style={{
        position: "sticky",
        top: 0, 
        height: "100vh", 
        zIndex: 10,
      }}
    >
      {/* Toggle Sidebar Button */}
      <button
        className="text-2xl p-4 hover:bg-blue-700 focus:outline-none"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      {/* Sidebar Menu */}
      <ul className="flex-1 flex flex-col mt-4 space-y-2">
        {menuItems.map((item) => (
          <li key={item.name}>
            <div
              className={`p-4 flex items-center cursor-pointer hover:bg-blue-700 transition-all duration-200 ${
                active === item.name ? "bg-blue-600" : ""
              }`}
              onClick={() => navigateToPage(item.page, item.name)}
            >
              <div className="text-xl">{item.icon}</div>
              {sidebar && <span className="ml-4">{item.label}</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
