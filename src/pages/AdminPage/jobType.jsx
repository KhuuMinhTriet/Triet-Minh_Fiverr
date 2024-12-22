import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../../redux/adminSlice";
import DeleteModal from "./Modal/deleteModal";
import Pagination from "./method/pagination";
import {
  getFilteredData,
  handleDelete,
  confirmDelete,
  handleEdit,
  handleSave,
  handleInputChange,
} from "./method/method";

export default function JobType() {
  const dispatch = useDispatch();
  const { list: jobTypes, loading, error } = useSelector((state) => state.adminSlice);
  const { list: searchResults } = useSelector((state) => state.adminSlice.searchResults);
  const { pageIndex, pageSize, isSearch } = useSelector((state) => state.adminSlice.pagination);

  const [editingId, setEditingId] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [currentPage, setCurrentPage] = useState(pageIndex || 1);

  const itemsPerPage = isSearch ? pageSize : 10;
  const totalPages = Math.ceil(jobTypes.length / itemsPerPage);
  const validTotalPages = totalPages > 0 ? totalPages : 1;

  useEffect(() => {
      
      dispatch(fetchData("jobTypes", currentPage, pageSize));
    }, [dispatch, currentPage, pageSize]);
  
  const handleDeleteClick = (id) => handleDelete(id, setDeleteTarget, () => setDeleteTarget(id));
  const confirmDeleteHandler = () => confirmDelete(deleteTarget, dispatch, () => setDeleteTarget(null));
  const handleEditClick = (job) => {
    setEditingId(job.id);
    setEditMode({ name: job.tenLoaiCongViec }); 
  };
  const handleSaveEdit = () => handleSave("jobTypes", editMode, editingId, dispatch, setEditingId);

  const handlePageChange = ({ selected }) => {
    const pageNumber = selected + 1;
    setCurrentPage(pageNumber);
  };

  const renderTable = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const filteredData = getFilteredData(jobTypes, searchResults, isSearch, currentPage, itemsPerPage);

    return filteredData?.map((job) => (
      <tr className="hover:bg-gray-100" key={job.id}>
        <td className="py-3 px-6">{job.id}</td>
        <td className="py-3 px-6">
          {editingId === job.id ? (
            <input
              className="border px-2 py-1"
              name="name"
              value={editMode.name || ''}
              onChange={(e) => handleInputChange(e, setEditMode)}
            />
          ) : (
            job.tenLoaiCongViec
          )}
        </td>
        <td className="py-3 px-6">
          {editingId === job.id ? (
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded"
              onClick={handleSaveEdit}
            >
              Lưu
            </button>
          ) : (
            <button
              className="bg-yellow-500 text-white px-2 py-1 rounded"
              onClick={() => handleEditClick(job)}
            >
              Sửa
            </button>
          )}
          <button
            className="bg-red-500 text-white px-2 py-1 rounded ml-2"
            onClick={() => handleDeleteClick(job.id)}
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
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDeleteHandler}
      />
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-6 text-left text-gray-600 font-bold">Mã loại công việc</th>
            <th className="py-3 px-6 text-left text-gray-600 font-bold">Tên loại công việc</th>
            <th className="py-3 px-6 text-left text-gray-600 font-bold">Actions</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={validTotalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
