import React, { useState } from "react";

const AdminPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState(null); // Để theo dõi menu đang mở

  // Hàm xử lý ẩn/hiện menu con
  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-blue-800 text-white flex flex-col transition-all duration-300`}
      >
        <button
          className="text-2xl p-4 focus:outline-none hover:bg-blue-700"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>
        <nav className="flex-1">
          <ul className="space-y-2">
            {/* Menu Quản lý người dùng */}
            <li>
              <div
                className="p-4 flex justify-between items-center hover:bg-blue-700 cursor-pointer"
                onClick={() => toggleMenu("users")}
              >
                Quản lý người dùng
                <span>{openMenu === "users" ? "▲" : "▼"}</span>
              </div>
              {openMenu === "users" && (
                <ul className="pl-6 space-y-2">
                  <li className="hover:bg-blue-700 p-2 rounded-md cursor-pointer">
                    Xem danh sách
                  </li>
                  <li className="hover:bg-blue-700 p-2 rounded-md cursor-pointer">
                    Thêm người dùng
                  </li>
                </ul>
              )}
            </li>

            {/* Menu Quản lý công việc */}
            <li>
              <div
                className="p-4 flex justify-between items-center hover:bg-blue-700 cursor-pointer"
                onClick={() => toggleMenu("jobs")}
              >
                Quản lý công việc
                <span>{openMenu === "jobs" ? "▲" : "▼"}</span>
              </div>
              {openMenu === "jobs" && (
                <ul className="pl-6 space-y-2">
                  <li className="hover:bg-blue-700 p-2 rounded-md cursor-pointer">
                    Danh sách công việc
                  </li>
                  <li className="hover:bg-blue-700 p-2 rounded-md cursor-pointer">
                    Thêm công việc
                  </li>
                </ul>
              )}
            </li>

            {/* Menu Quản lý loại công việc */}
            <li>
              <div
                className="p-4 flex justify-between items-center hover:bg-blue-700 cursor-pointer"
                onClick={() => toggleMenu("jobTypes")}
              >
                Quản lý loại công việc
                <span>{openMenu === "jobTypes" ? "▲" : "▼"}</span>
              </div>
              {openMenu === "jobTypes" && (
                <ul className="pl-6 space-y-2">
                  <li className="hover:bg-blue-700 p-2 rounded-md cursor-pointer">
                    Danh sách loại
                  </li>
                  <li className="hover:bg-blue-700 p-2 rounded-md cursor-pointer">
                    Thêm loại công việc
                  </li>
                </ul>
              )}
            </li>

            {/* Menu Quản lý dịch vụ */}
            <li>
              <div
                className="p-4 flex justify-between items-center hover:bg-blue-700 cursor-pointer"
                onClick={() => toggleMenu("services")}
              >
                Quản lý dịch vụ
                <span>{openMenu === "services" ? "▲" : "▼"}</span>
              </div>
              {openMenu === "services" && (
                <ul className="pl-6 space-y-2">
                  <li className="hover:bg-blue-700 p-2 rounded-md cursor-pointer">
                    Danh sách dịch vụ
                  </li>
                  <li className="hover:bg-blue-700 p-2 rounded-md cursor-pointer">
                    Thêm dịch vụ
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
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
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-6 text-left text-gray-600 font-bold">
                  Mã người dùng
                </th>
                <th className="py-3 px-6 text-left text-gray-600 font-bold">
                  Tên người dùng
                </th>
                <th className="py-3 px-6 text-left text-gray-600 font-bold">
                  Công việc
                </th>
                <th className="py-3 px-6 text-left text-gray-600 font-bold">
                  Loại công việc
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100">
                <td className="py-3 px-6">001</td>
                <td className="py-3 px-6">Nguyễn Văn A</td>
                <td className="py-3 px-6">Thiết kế</td>
                <td className="py-3 px-6">Đồ họa</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="py-3 px-6">002</td>
                <td className="py-3 px-6">Trần Thị B</td>
                <td className="py-3 px-6">Lập trình</td>
                <td className="py-3 px-6">Web</td>
              </tr>
              {/* Thêm các hàng khác */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
