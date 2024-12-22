import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setPage , fetchData} from "../../redux/adminSlice";

import DeleteModal from "./Modal/deleteModal";
import {
  getFilteredData,
  handleDelete,
  confirmDelete,
  handleEdit,
  handleSave,
  handleInputChange,
} from './method/method';
export default function Service() {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.adminSlice.list);
  const { currentPage, totalPages, pageSize } = useSelector((state) => state.adminSlice.pagination);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const itemsPerPage = pageSize;

  useEffect(() => {
    dispatch(fetchData("services"));
  }, [dispatch]);

  useEffect(() => {
    // Fetch data when currentPage or pagination changes
    dispatch(fetchData("services"));
  }, [dispatch, currentPage, pageSize]);

  const renderTabContent = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const filteredData = services.slice(start, end);

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
        {/* render rows similar to your current implementation */}
      </tr>
    ));
  };

  return (
    <div className="overflow-x-auto">
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => confirmDelete(deleteId, dispatch, setIsModalOpen)}
      />
      <div className="my-4 flex justify-center gap-4">
        <button
          onClick={() => dispatch(setPage(currentPage - 1))}
          disabled={currentPage <= 1}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Trang trước
        </button>
        <span className="px-4 py-2">
          Trang {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => dispatch(setPage(currentPage + 1))}
          disabled={currentPage >= totalPages}
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
