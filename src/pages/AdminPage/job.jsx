import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../redux/adminSlice"; // Import Redux actions
import formConfig from "./formData/formConfig.json";

export default function Job() {
  const dispatch = useDispatch();

  // Lấy danh sách công việc từ Redux Store
  const { list: table, loading, error } = useSelector((state) => state.adminSlice.jobs);

  const [currentRange, setCurrentRange] = useState([0, 10]); // Default range: 1-10

  // Gọi action fetchJobs khi component mount
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  // Filter data based on the current range
  const getFilteredData = () => table.slice(currentRange[0], currentRange[1]);

  // Handle delete job
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa công việc này?")) {
      // Your delete logic here
    }
  };

  // Handle edit job
  const handleEdit = (job) => {
    alert(`Chỉnh sửa công việc: ${job.tenCongViec}`);
  };

  // Render table headers
  const renderTableHeaders = () => {
    const fields = formConfig.job; // Get fields for the "job" form

    return (
      <tr>
        {fields.map((field) => (
          <th key={field.name} className="py-3 px-6 text-left text-gray-600 font-bold">
            {field.title}
          </th>
        ))}
        <th className="py-3 px-6 text-left text-gray-600 font-bold">Hành động</th>
      </tr>
    );
  };

  // Render table content
  const renderTableContent = () => {
    const filteredData = getFilteredData();
    const fields = formConfig.job; // Get fields for the "job" form

    return filteredData.map((job, index) => (
      <tr className="hover:bg-gray-100" key={index}>
        {fields.map((field) => (
          <td key={field.name} className="py-3 px-6">
            {field.type === "select" && field.options ? (
              // Hiển thị giá trị đã chọn từ job[field.name]
              field.options[job[field.name]] || "Chưa chọn"
            ) : (
              job[field.name] || ""
            )}
          </td>
        ))}
        <td className="py-3 px-6 flex gap-2">
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
        </td>
      </tr>
    ));
  };

  // Render pagination buttons
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
          {/* Pagination */}
          <div className="my-4 flex justify-center">{renderPagination()}</div>

          {/* Table */}
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">{renderTableHeaders()}</thead>
            <tbody>{renderTableContent()}</tbody>
          </table>
        </>
      )}
    </div>
  );
}
