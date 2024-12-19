import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteItemAsync } from "../../redux/adminSlice";
import { DeleteModal } from "./Modal/Modal"; // Import modal component

export default function ShowTable() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.adminSlice.users.list); // Updated state reference
  const [activeTab, setActiveTab] = useState("personal");
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [deleteId, setDeleteId] = useState(null); // ID to delete

  const itemsPerPage = 10; // Number of items to display per page
  const totalPages = Math.ceil(users.length / itemsPerPage);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

  const getFilteredData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return users.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsModalOpen(true); // Open modal
  };

  const confirmDelete = () => {
    if (deleteId) {
      dispatch(deleteItemAsync({ modalType: "users", id: deleteId }));
      console.log(`Đã xóa người dùng có ID: ${deleteId}`);
    }
    setIsModalOpen(false);
  };

  const renderTabContent = () => {
    const filteredData = getFilteredData();
    if (filteredData.length === 0) {
      return (
        <tr>
          <td colSpan={activeTab === "personal" ? 8 : 4} className="text-center py-3">
            Không có dữ liệu
          </td>
        </tr>
      );
    }
    return filteredData.map((user) => (
      <tr className="hover:bg-gray-100" key={user.id}>
        <td className="py-3 px-6">{user.name}</td>
        {activeTab === "personal" ? (
          <>
            <td className="py-3 px-6">{user.id}</td>
            <td className="py-3 px-6">{user.email}</td>
            <td className="py-3 px-6">{user.password}</td>
            <td className="py-3 px-6">{user.birthday}</td>
            <td className="py-3 px-6">{user.phone}</td>
            <td className="py-3 px-6">{user.gender ? "Nam" : "Nữ"}</td>
          </>
        ) : (
          <>
            <td className="py-3 px-6">{user.role}</td>
            <td className="py-3 px-6">{user.skill}</td>
          </>
        )}
        <td className="py-3 px-6 flex gap-2">
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
          >
            Sửa
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            onClick={() => handleDeleteClick(user.id)}
          >
            Xóa
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="overflow-x-auto">
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
      <div className="my-4 flex justify-center gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Trang trước
        </button>
        <span className="px-4 py-2">
          Trang {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Trang tiếp theo
        </button>
      </div>
      <div className="flex bg-blue-800 text-white">
        <button
          className={`flex-1 py-3 ${activeTab === "personal" ? "bg-blue-600" : ""}`}
          onClick={() => setActiveTab("personal")}
        >
          Thông tin cá nhân
        </button>
        <button
          className={`flex-1 py-3 ${activeTab === "job" ? "bg-blue-600" : ""}`}
          onClick={() => setActiveTab("job")}
        >
          Công việc
        </button>
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="py-3 px-6">Tên</th>
            {activeTab === "personal" ? (
              <>
                <th className="py-3 px-6">ID</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Mật khẩu</th>
                <th className="py-3 px-6">Ngày sinh</th>
                <th className="py-3 px-6">SĐT</th>
                <th className="py-3 px-6">Giới tính</th>
              </>
            ) : (
              <>
                <th className="py-3 px-6">Chức vụ</th>
                <th className="py-3 px-6">Kỹ năng</th>
              </>
            )}
            <th className="py-3 px-6">Hành động</th>
          </tr>
        </thead>
        <tbody>{renderTabContent()}</tbody>
      </table>
    </div>
  );
}
