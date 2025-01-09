import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchData, openModalDelete} from "../../redux/adminSlice";
import DeleteModal from "./Modal/deleteModal";
import formTable from "./formData/formTable.json";
import Pagination from "./method/pagination";
import {
  getFilteredData,
  handleDelete,
  confirmDelete,
  handleEdit,
  handleSave,
  handleInputChange,
} from "./method/method";

export default function Job() {
  const dispatch = useDispatch();
  const { list: jobs, loading, error } = useSelector((state) => state.adminSlice);
  const { list: searchResults } = useSelector((state) => state.adminSlice.searchResults);
  const { isSearch } = useSelector((state) => state.adminSlice.pagination);
  const {isItemSearch, searchItem} = useSelector(state => state.adminSlice);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [activeTab, setActiveTab] = useState(1);
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});

  // Fetch job data when the component mounts
  useEffect(() => {
    dispatch(fetchData('jobs'));
  }, [dispatch]);

  // Handle pagination and search filter
  const getPaginatedData = () => {
    return getFilteredData(jobs, searchResults, isSearch, currentPage, itemsPerPage);
  };


  // Handle edit action
  const handleEditClick = (job) => {
    handleEdit(job, setEditingRow, setEditedData);
  };
  // Save edited data
  const handleSaveEdit = (id) => {
    handleSave('jobs', editedData, id, dispatch, setEditingRow).then(() => {
        
               Swal.fire({
                 icon: 'success',
                 title: 'Cập nhật thành công!',
                 text: 'Ảnh đại diện đã được cập nhật.',
                 confirmButtonText: 'OK',
               });
             })
             .catch((error) => {
       
               Swal.fire({
                 icon: 'error',
                 title: 'Cập nhật thất bại!',
                 text: error.message || 'Đã xảy ra lỗi khi cập nhật.',
                 confirmButtonText: 'Thử lại',
               });
             });
 }

  

  // Handle input change when editing a job
  const handleInputChangeEvent = (field, value) => {
    handleInputChange({ target: { name: field, value } }, setEditedData);
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
  
    return paginatedData?.map((job, index) => (
      <tr className="hover:bg-gray-100" key={index}>
        {tabFields.map((field) => (
          <td key={field.name} className="py-3 px-6">
            {editingRow === job.id ? (
              field.name === "hinhAnh" ? (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          handleInputChangeEvent(field.name, reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full p-2 border rounded"
                  />
                  {editedData[field.name] && (
                    <img
                      src={editedData[field.name]}
                      alt="Xem trước"
                      className="w-20 h-20 object-cover mt-2"
                    />
                  )}
                </div>
              ) : (
                <input
                  type={field.type === "number" ? "number" : "text"}
                  value={editedData[field.name] || ""}
                  onChange={(e) => handleInputChangeEvent(field.name, e.target.value)}
                  className="w-full p-2 border rounded"
                />
              )
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
                onClick={() => setEditingRow(null)}
              >
                Hủy
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                onClick={() => handleEditClick(job)}
              >
                Sửa
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => dispatch(openModalDelete(job.id))}
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
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="text-red-500">Lỗi: {error}</p>
      ) : (
        <>
          <div className="flex justify-center my-4">
            <button
              className={`px-4 py-2 mx-2 ${activeTab === 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"} rounded`}
              onClick={() => setActiveTab(1)}
            >
              Công việc
            </button>
            <button
              className={`px-4 py-2 mx-2 ${activeTab === 2 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"} rounded`}
              onClick={() => setActiveTab(2)}
            >
              Chi tiết công việc
            </button>
          </div>
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">{renderTableHeaders()}</thead>
            <tbody>{renderTableContent()}</tbody>
          </table>
          <Pagination
          />
          <DeleteModal/>
        </>
      )}
    </div>
  );
}
