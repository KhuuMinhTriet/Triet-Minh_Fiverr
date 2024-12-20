import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteItemAsync, updateItem } from "../../redux/adminSlice";
import DeleteModal from "./Modal/deleteModal"; 

export default function User() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.adminSlice.users.list);
  const [activeTab, setActiveTab] = useState("personal");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editingId, setEditingId] = useState(null); 
  const [editedData, setEditedData] = useState({}); 

  const itemsPerPage = 10;
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
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      dispatch(deleteItemAsync({ modalType: "users", id: deleteId }));
      console.log(`Đã xóa người dùng có ID: ${deleteId}`);
    }
    setIsModalOpen(false);
  };

  const handleEditClick = (user) => {
    setEditingId(user.id); 
    setEditedData(user); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditedData((prevData) => {
      if (name === "gender") {
        const genderValue = value === "true"; 
        return {
          ...prevData,
          gender: genderValue,
        };
      }
      if (name !== "password" && name !== "avatar" && name !== "bookingJob") {
        return {
          ...prevData,
          [name]: value,
        };
      }
      return prevData; 
    });
  };

  const handleSaveClick = async () => {
    if (editingId) {
      const { password, avatar, bookingJob, ...dataWithoutPasswordAndImage } = editedData;
  
      await dispatch(
        updateItem({ modalType: "users", id: editingId, formData: dataWithoutPasswordAndImage })
      );
  
      setEditingId(null);
  
      dispatch(fetchUsers());
  
      console.log(`Đã lưu thay đổi cho người dùng ID: ${JSON.stringify(dataWithoutPasswordAndImage)}`);
    }
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
        <td className="py-3 px-6">
          {editingId === user.id ? (
            <input
              type="text"
              name="name"
              value={editedData.name || ""}
              onChange={handleChange}
              className="px-2 py-1 border"
            />
          ) : (
            user.name
          )}
        </td>
        {activeTab === "personal" ? (
          <>
            {editingId === user.id ? (
              <>
                <td className="py-3 px-6">
                  <input
                    type="text"
                    name="id"
                    value={editedData.id || ""}
                    onChange={handleChange}
                    className="px-2 py-1 border"
                  />
                </td>
                <td className="py-3 px-6">
                  <input
                    type="email"
                    name="email"
                    value={editedData.email || ""}
                    onChange={handleChange}
                    className="px-2 py-1 border"
                  />
                </td>
                <td className="py-3 px-6">
                  <input
                    type="text"
                    name="password"
                    className="px-2 py-1 border"
                  />
                </td>
                <td className="py-3 px-6">
                  <input
                    type="date"
                    name="birthday"
                    value={editedData.birthday || ""}
                    onChange={handleChange}
                    className="px-2 py-1 border"
                  />
                </td>
                <td className="py-3 px-6">
                  <input
                    type="text"
                    name="phone"
                    value={editedData.phone || ""}
                    onChange={handleChange}
                    className="px-2 py-1 border"
                  />
                </td>
                <td className="py-3 px-6">
                  <select
                    name="gender"
                    value={editedData.gender ? "true" : "false"}
                    onChange={handleChange}
                    className="px-2 py-1 border"
                  >
                    <option value="true">Nam</option>
                    <option value="false">Nữ</option>
                  </select>
                </td>
              </>
            ) : (
              <>
                <td className="py-3 px-6">{user.id}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">{user.password}</td>
                <td className="py-3 px-6">{user.birthday}</td>
                <td className="py-3 px-6">{user.phone}</td>
                <td className="py-3 px-6">{user.gender ? "Nam" : "Nữ"}</td>
              </>
            )}
          </>
        ) : activeTab === "job" ? (
          <>
            {editingId === user.id ? (
              <>
                <td className="py-3 px-6">
                  <input
                    type="text"
                    name="role"
                    value={editedData.role || ""}
                    onChange={handleChange}
                    className="px-2 py-1 border"
                  />
                </td>
                <td className="py-3 px-6">
                  <input
                    type="text"
                    name="skill"
                    value={editedData.skill || ""}
                    onChange={handleChange}
                    className="px-2 py-1 border"
                  />
                </td>
              </>
            ) : (
              <>
                <td className="py-3 px-6">{user.role}</td>
                <td className="py-3 px-6">{user.skill}</td>
              </>
            )}
          </>
        ) : null}
        <td className="py-3 px-6 flex gap-2">
          {editingId === user.id ? (
            <>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                onClick={handleSaveClick}
              >
                Lưu
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                onClick={() => setEditingId(null)}
              >
                Hủy
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                onClick={() => handleEditClick(user)}
              >
                Sửa
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => handleDeleteClick(user.id)}
              >
                Xóa
              </button>
            </>
          )}
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
