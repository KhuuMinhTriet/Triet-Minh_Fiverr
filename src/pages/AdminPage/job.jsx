import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, updateItem } from "../../redux/adminSlice"; // Import Redux actions
import formTable from "./formData/formTable.json";

export default function Job() {
  const dispatch = useDispatch();
  const { list: table, loading, error } = useSelector((state) => state.adminSlice.jobs);

  const [currentRange, setCurrentRange] = useState([0, 10]);
  const [activeTab, setActiveTab] = useState(1); // State to track active tab
  const [editingRow, setEditingRow] = useState(null); // Track the currently edited row
  const [editedData, setEditedData] = useState({}); // Store the edited data

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const getFilteredData = () => table.slice(currentRange[0], currentRange[1]);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa công việc này?")) {
      // Your delete logic here
    }
  };

  const handleEdit = (job) => {
    setEditingRow(job.id); // Set the current row as editable
    setEditedData(job); // Pre-fill the form with the current row's data
  };

  const handleCancelEdit = () => {
    setEditingRow(null); // Exit edit mode
    setEditedData({}); // Clear edited data
  };

  const handleSaveEdit = (id) => {
    dispatch(updateItem({ id, ...editedData })); // Dispatch the update action
    setEditingRow(null); // Exit edit mode
  };

  const handleInputChange = (field, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const renderTableHeaders = () => {
    const fields = formTable.job;

    // Phân chia cột theo tab
    const tabFields =
      activeTab === 1
        ? fields.slice(0, fields.findIndex((field) => field.name === "hinhAnh") + 1)
        : fields.slice(fields.findIndex((field) => field.name === "moTa"));

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
    const filteredData = getFilteredData();
    const fields = formTable.job;

    // Phân chia cột theo tab
    const tabFields =
      activeTab === 1
        ? fields.slice(0, fields.findIndex((field) => field.name === "hinhAnh") + 1)
        : fields.slice(fields.findIndex((field) => field.name === "moTa"));

    return filteredData.map((job, index) => (
      <tr className="hover:bg-gray-100" key={index}>
        {tabFields.map((field) => (
          <td key={field.name} className="py-3 px-6">
            {editingRow === job.id ? (
              field.name === "hinhAnh" ? (
                // Chế độ chỉnh sửa: Cho phép nhập URL ảnh mới
                <input
                  type="text"
                  value={editedData[field.name] || ""}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="URL hình ảnh"
                />
              ) : (
                <input
                  type={field.type === "number" ? "number" : "text"}
                  value={editedData[field.name] || ""}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="w-full p-2 border rounded"
                />
              )
            ) : field.name === "hinhAnh" ? (
              // Hiển thị ảnh khi không ở chế độ chỉnh sửa
              <img
                src={job[field.name]}
                alt="Hình ảnh công việc"
                className="w-20 h-20 object-cover rounded"
              />
            ) : field.type === "select" && field.options ? (
              field.options[job[field.name]] || "Chưa chọn"
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

  const renderPagination = () => {
    const total = table.length;
    const ranges = [];

    for (let i = 0; i < total; i += 10) {
      ranges.push([i, i + 10]);
    }

    return ranges.map((range, index) => (
      <button
        key={index}
        className={`px-4 py-2 mx-1 ${
          currentRange[0] === range[0]
            ? "bg-blue-700 text-white"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        } rounded`}
        onClick={() => setCurrentRange(range)}
      >
        {range[0] + 1}-{range[1] > total ? total : range[1]}
      </button>
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
          {/* Tab điều hướng */}
          <div className="flex justify-center my-4">
            <button
              className={`px-4 py-2 mx-2 ${
                activeTab === 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
              } rounded`}
              onClick={() => setActiveTab(1)}
            >
              Tab 1: Mã công việc - Hình ảnh
            </button>
            <button
              className={`px-4 py-2 mx-2 ${
                activeTab === 2 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
              } rounded`}
              onClick={() => setActiveTab(2)}
            >
              Tab 2: Mô tả - Hết
            </button>
          </div>

          {/* Phân trang */}
          <div className="my-4 flex justify-center">{renderPagination()}</div>

          {/* Bảng dữ liệu */}
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">{renderTableHeaders()}</thead>
            <tbody>{renderTableContent()}</tbody>
          </table>
        </>
      )}
    </div>
  );
}
