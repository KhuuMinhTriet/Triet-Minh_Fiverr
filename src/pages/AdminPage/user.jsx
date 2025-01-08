import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, setDeleteId, openModalDelete } from "../../redux/adminSlice";
import DeleteModal from "./Modal/deleteModal"; 
import Pagination from "./method/pagination";
import { 
  getFilteredData, 
  handleDelete, 
  confirmDelete, 
  handleEdit, 
  handleSave, 
  handleInputChange,
} from './method/method';

export default function User() {
  const dispatch = useDispatch();
  const {list: users, loading, error} = useSelector((state) => state.adminSlice);
  const { list: searchResults } = useSelector(state => state.adminSlice.searchResults);
  const { pageIndex, pageSize, isSearch } = useSelector(state => state.adminSlice.pagination);
  const [activeTab, setActiveTab] = useState("personal");
  const Id = useSelector(state => state.adminSlice.id)
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [currentPage, setCurrentPage] = useState(pageIndex || 1); 
  const itemsPerPage = isSearch ? pageSize : 10;
  useEffect(() => {
      
      dispatch(fetchData("users", currentPage, pageSize));
    }, [dispatch, currentPage, pageSize]);
  

  if (loading) {
    return <p>Loading...</p>;
  }


  if (error) {
    return <p>Error: {error}</p>;
  }

  

  const handleDeleteClick = (id) => {
  
    dispatch(openModalDelete(id));
    console.log(Id)
  };


  const handleEditClick = (user) => handleEdit(user, setEditingId, setEditedData);

  const handleSaveClick = () => handleSave('users', editedData, editingId, dispatch, setEditingId);

  const handleChange = (e) => handleInputChange(e, setEditedData);


  const renderTabContent = () => {
    const filteredData = getFilteredData(users, searchResults, isSearch, currentPage, itemsPerPage);
    if (!isSearch && filteredData.length === 0) {
      return (
        <tr>
          <td colSpan={activeTab === "personal" ? 9 : 5} className="text-center py-3">
            Không có dữ liệu
          </td>
        </tr>
      );
    }
    return filteredData?.map((user) => (
      <tr className="hover:bg-gray-100" key={user.id}>
        
        <td className="py-3 px-6">
          {editingId === user.id ? (
            <input
              type="text"
              name="name"
              value={editedData.name || ""}
              onChange={handleChange}
              className="text-sm px-2 py-1 border"
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
                    className="text-sm px-2 py-1 border"
                  />
                </td>
                <td className="py-3 px-6">
                  <input
                    type="email"
                    name="email"
                    value={editedData.email || ""}
                    onChange={handleChange}
                    className="text-sm px-2 py-1 border"
                  />
                </td>
                
                <td className="text-sm py-3 px-6">
                  <input
                    type="text"
                    name="password"
                    className="text-sm px-2 py-1 border"
                  />
                </td>
                <td className="py-3 px-6">
                  <input
                    type="date"
                    name="birthday"
                    value={editedData.birthday || ""}
                    onChange={handleChange}
                    className="text-sm px-2 py-1 border"
                  />
                </td>
                <td className="py-3 px-6">
                  <input
                    type="text"
                    name="phone"
                    value={editedData.phone || ""}
                    onChange={handleChange}
                    className="text-sm px-2 py-1 border"
                  />
                </td>
                <td className="py-3 px-6">
                  <select
                    name="gender"
                    value={editedData.gender ? "true" : "false"}
                    onChange={handleChange}
                    className="text-sm px-2 py-1 border"
                  >
                    <option value="true">Nam</option>
                    <option value="false">Nữ</option>
                  </select>
                </td>
                <td className="py-3 px-6">
                  <input
                    type="text"
                    name="id"
                    value={editedData.avatar || ""}
                    onChange={handleChange}
                    className="text-sm px-2 py-1 border"
                  />
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
                <td className="py-3 px-6">
          <img
            src={user.avatar || "default-avatar-url.jpg"}
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        </td>
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
                onClick={() => {dispatch(openModalDelete(user.id))}}
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
       
      />
      
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
                <th className="py-3 px-6">Ảnh đại diện</th> 
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

      {/* Pagination */}
      <Pagination/>
    </div>
  );
}
