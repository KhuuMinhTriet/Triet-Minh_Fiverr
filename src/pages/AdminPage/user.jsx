import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/adminSlice";
import formConfig from "./formData/formConfig.json";

export default function ShowTable() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.adminSlice.users.list);
  const [activeTab, setActiveTab] = useState("personal");
  const [currentRange, setCurrentRange] = useState([0, 10]);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editValues, setEditValues] = useState({});

  if (users.length === 0) {
    dispatch(fetchUsers());
  }

  const getFilteredData = () => {
    return users.slice(currentRange[0], currentRange[1]);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
      console.log(`Xóa người dùng có ID: ${id}`);
    }
  };

  const handleEdit = (user) => {
    setEditingRowId(user.id);
    setEditValues({ ...user }); // Lưu dữ liệu ban đầu để chỉnh sửa
  };

  const handleSave = () => {
    console.log("Lưu dữ liệu đã chỉnh sửa:", editValues);
    setEditingRowId(null); // Thoát chế độ chỉnh sửa
  };

  const handleCancel = () => {
    setEditingRowId(null); // Hủy chỉnh sửa
  };

  const handleChange = (e, field) => {
    setEditValues({ ...editValues, [field]: e.target.value });
  };

  const renderTabContent = () => {
    const filteredData = getFilteredData();
    return filteredData.map((user) => (
      <tr className="hover:bg-gray-100" key={user.id}>
        {editingRowId === user.id ? (
          <>
            <td className="py-3 px-6">
              <input
                type="text"
                className="border rounded px-2 py-1 w-full"
                value={editValues.name || ""}
                onChange={(e) => handleChange(e, "name")}
              />
            </td>
            {activeTab === "personal" ? (
              <>
                <td className="py-3 px-6">{user.id}</td>
                <td className="py-3 px-6">
                  <input
                    type="text"
                    className="border rounded px-2 py-1 w-full"
                    value={editValues.email || ""}
                    onChange={(e) => handleChange(e, "email")}
                  />
                </td>
                <td className="py-3 px-6">
                  <input
                    type="text"
                    className="border rounded px-2 py-1 w-full"
                    value={editValues.password || ""}
                    onChange={(e) => handleChange(e, "password")}
                  />
                </td>
                <td className="py-3 px-6">
                  <input
                    type="date"
                    className="border rounded px-2 py-1 w-full"
                    value={editValues.birthday || ""}
                    onChange={(e) => handleChange(e, "birthday")}
                  />
                </td>
                <td className="py-3 px-6">
                  <input
                    type="text"
                    className="border rounded px-2 py-1 w-full"
                    value={editValues.phone || ""}
                    onChange={(e) => handleChange(e, "phone")}
                  />
                </td>
                <td className="py-3 px-6">
                  <input
                    type="text"
                    className="border rounded px-2 py-1 w-full"
                    value={editValues.gender || ""}
                    onChange={(e) => handleChange(e, "gender")}
                  />
                </td>
              </>
            ) : (
              <>
                <td className="py-3 px-6">
                  <input
                    type="text"
                    className="border rounded px-2 py-1 w-full"
                    value={editValues.role || ""}
                    onChange={(e) => handleChange(e, "role")}
                  />
                </td>
                <td className="py-3 px-6">{/* Các cột khác */}</td>
              </>
            )}
            <td className="py-3 px-6 flex gap-2">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                onClick={handleSave}
              >
                Lưu
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                onClick={handleCancel}
              >
                Hủy
              </button>
            </td>
          </>
        ) : (
          <>
            <td className="py-3 px-6">{user.name}</td>
            {activeTab === "personal" ? (
              <>
                <td className="py-3 px-6">{user.id}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">{user.password}</td>
                <td className="py-3 px-6">{user.birthday}</td>
                <td className="py-3 px-6">{user.phone}</td>
                <td className="py-3 px-6">{user.gender}</td>
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
                onClick={() => handleEdit(user)}
              >
                Sửa
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(user.id)}
              >
                Xóa
              </button>
            </td>
          </>
        )}
      </tr>
    ));
  };

  return (
    <div className="overflow-x-auto">
      <div className="my-4 flex justify-center">{/* Render nút phân trang */}</div>
      <div className="flex bg-blue-800 text-white">
        <button className={`flex-1 py-3`} onClick={() => setActiveTab("personal")}>
          Thông tin cá nhân
        </button>
        <button className={`flex-1 py-3`} onClick={() => setActiveTab("job")}>
          Công việc
        </button>
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>{/* Render tiêu đề bảng */}</thead>
        <tbody>{renderTabContent()}</tbody>
      </table>
    </div>
  );
}
