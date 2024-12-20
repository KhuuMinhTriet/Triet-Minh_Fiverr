import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices, addItem, updateItem, deleteItemAsync } from "../../redux/adminSlice";
import DeleteModal from "./Modal/deleteModal";

export default function Service() {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.adminSlice.services.list);
  const [activeTab, setActiveTab] = useState("service");  // Manage tabs if needed
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const itemsPerPage = 10;
  const totalPages = Math.ceil(services.length / itemsPerPage);

  useEffect(() => {
    if (services.length === 0) {
      dispatch(fetchServices());
    }
  }, [dispatch, services.length]);

  const getFilteredData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return services.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      dispatch(deleteItemAsync({ modalType: "services", id: deleteId }));
    }
    setIsModalOpen(false);
  };

  const handleEditClick = (service) => {
    setEditingId(service.id);
    setEditedData(service);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setEditedData((prevData) => {
      if (name === "hoanThanh") {
        return {
          ...prevData,
          hoanThanh: value === "true" // Cập nhật đúng giá trị boolean
        };
      } else if (name !== "password" && name !== "avatar" && name !== "bookingJob") {
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
      await dispatch(updateItem({ modalType: "services", id: editingId, formData: editedData }));
      setEditingId(null);
      dispatch(fetchServices());
    }
  };
  const renderTabContent = () => {
    const filteredData = getFilteredData();
    if (filteredData.length === 0) {
      return (
        <tr>
          <td colSpan={6} className="text-center py-3">
            Không có dữ liệu
          </td>
        </tr>
      );
    }
    return filteredData.map((service) => (
      <tr className="hover:bg-gray-100" key={service.id}>
         <td className="py-3 px-6">
          {editingId === service.id ? (
            <input
              type="text"
              name="maCongViec"
              value={editedData.id || ""}
              onChange={handleChange}
              className="border px-2 py-1 rounded"
            />
          ) : (
            service.id
          )}
        </td>
        <td className="py-3 px-6">
          {editingId === service.id ? (
            <input
              type="text"
              name="maCongViec"
              value={editedData.maCongViec || ""}
              onChange={handleChange}
              className="border px-2 py-1 rounded"
            />
          ) : (
            service.maCongViec
          )}
        </td>
        <td className="py-3 px-6">
          {editingId === service.id ? (
            <input
              type="text"
              name="maNguoiThue"
              value={editedData.maNguoiThue || ""}
              onChange={handleChange}
              className="border px-2 py-1 rounded"
            />
          ) : (
            service.maNguoiThue
          )}
        </td>
        <td className="py-3 px-6">
          {editingId === service.id ? (
            <input
              type="date"
              name="ngayThue"
              value={editedData.ngayThue || ""}
              onChange={handleChange}
              className="border px-2 py-1 rounded"
            />
          ) : (
            service.ngayThue
          )}
        </td>
        <td className="py-3 px-6">
          {editingId === service.id ? (
            <select
            name="hoanThanh"
            value={editedData.hoanThanh || false} 
            onChange={handleChange}
            className="border px-2 py-1 rounded"
          >
            <option value={true}>Đã hoàn thành</option>
            <option value={false}>Chưa hoàn thành</option>
          </select>
          ) : (
            service.hoanThanh ? "Đã hoàn thành" : "Chưa hoàn thành"
          )}
        </td>
        <td className="py-3 px-6 flex gap-2">
          {editingId === service.id ? (
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
                onClick={() => handleEditClick(service)}
              >
                Sửa
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => handleDeleteClick(service.id)}
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
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="py-3 px-6">Mã dịch vụ</th>
            <th className="py-3 px-6">Mã công việc</th>
            <th className="py-3 px-6">Mã người thuế</th>
            <th className="py-3 px-6">Ngày thuê</th>
            <th className="py-3 px-6">Hoàn thành</th>
            <th className="py-3 px-6">Hành động</th>
          </tr>
        </thead>
        <tbody>{renderTabContent()}</tbody>
      </table>
    </div>
  );
}
