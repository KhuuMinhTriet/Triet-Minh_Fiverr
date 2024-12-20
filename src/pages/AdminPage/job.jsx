import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, updateItem, deleteItemAsync } from "../../redux/adminSlice";
import DeleteModal from "./Modal/deleteModal";
import formTable from "./formData/formTable.json";

export default function Job() {
  const dispatch = useDispatch();
  const { list: table, loading, error } = useSelector((state) => state.adminSlice.jobs);
  const [deleteId, setDeleteId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 10; // Số mục trên mỗi trang
  const [activeTab, setActiveTab] = useState(1);
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const totalItems = table.length; // Tổng số công việc
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Tổng số trang

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return table.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteItemAsync({ modalType: "jobs", id: deleteId }));
    setIsModalOpen(false);
  };

  const handleEdit = (job) => {
    setEditingRow(job.id);
    setEditedData(job);
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
    setEditedData({});
  };

  const handleSaveEdit = (id) => {
    dispatch(updateItem({ modalType: "jobs", id: id, formData: editedData }));
    setEditingRow(null);
  };

  const handleInputChange = (field, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderTableHeaders = () => {
    const fields = formTable.jobs;
    const tabFields =
      activeTab === 1
        ? fields.slice(0, fields.findIndex((field) => field.name === "hinhAnh") + 1)
        : fields.slice(fields.findIndex((field) => field.name === "maChiTietLoaiCongViec"));

    return (
      <tr>
        {tabFields.map((field) => (
          <th key={field.name} className="py-3 px-6 text-left text-gray-600 font-bold">
            {field.title}
          </th>
        ))}
        <th className="py-3 px-6 text-left text-gray-600 font-bold">Hành động</th>
      </tr>
    );
  };

  const renderTableContent = () => {
    const paginatedData = getPaginatedData();
    const fields = formTable.jobs;
    const tabFields =
      activeTab === 1
        ? fields.slice(0, fields.findIndex((field) => field.name === "hinhAnh") + 1)
        : fields.slice(fields.findIndex((field) => field.name === "maChiTietLoaiCongViec"));

    return paginatedData.map((job, index) => (
      <tr className="hover:bg-gray-100" key={index}>
        {tabFields.map((field) => (
          <td key={field.name} className="py-3 px-6">
            {editingRow === job.id ? (
              <input
                type={field.type === "number" ? "number" : "text"}
                value={editedData[field.name] || ""}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                className="w-full p-2 border rounded"
              />
            ) : field.name === "hinhAnh" ? (
              <img
                src={job[field.name]}
                alt="Hình ảnh công việc"
                className="w-20 h-20 object-cover rounded"
              />
            ) : (
              job[field.name] || ""
            )}
          </td>
        ))}
        <td className="py-3 px-6 flex gap-2">
          {editingRow === job.id ? (
            <>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                onClick={() => handleSaveEdit(job.id)}
              >
                Lưu
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                onClick={handleCancelEdit}
              >
                Hủy
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                onClick={() => handleEdit(job)}
              >
                Sửa
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(job.id)}
              >
                Xóa
              </button>
            </>
          )}
        </td>
      </tr>
    ));
  };

  const renderPagination = () => (
    <div className="flex justify-center gap-2 my-4">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
      >
        Trước
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`px-4 py-2 rounded ${
            currentPage === index + 1
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
      >
        Tiếp
      </button>
    </div>
  );

  return (
    <div className="overflow-x-auto">
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="text-red-500">Lỗi: {error}</p>
      ) : (
        <>
          <div className="flex justify-center my-4">
            <button
              className={`px-4 py-2 mx-2 ${
                activeTab === 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
              } rounded`}
              onClick={() => setActiveTab(1)}
            >
              Công việc
            </button>
            <button
              className={`px-4 py-2 mx-2 ${
                activeTab === 2 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
              } rounded`}
              onClick={() => setActiveTab(2)}
            >
              Chi tiết công việc
            </button>
          </div>
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">{renderTableHeaders()}</thead>
            <tbody>{renderTableContent()}</tbody>
          </table>
          {renderPagination()}
          {isModalOpen && (
            <DeleteModal
              onConfirm={handleConfirmDelete}
              onClose={() => setIsModalOpen(false)}
              isOpen={isModalOpen}
            />
          )}
        </>
      )}
    </div>
  );
}
