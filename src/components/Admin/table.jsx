import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTable, fetchData } from '../../redux/adminSlice'

const UserTable = () => {
  const dispatch = useDispatch();
  
  // Lấy dữ liệu từ Redux store
  const tableData = useSelector((state) => state.adminSlice.tableData); // Truy cập tableData
  const activeTable = useSelector((state) => state.adminSlice.activeTable); // Truy cập bảng hiện tại
  const pagination = useSelector((state) => state.adminSlice.pagination); // Truy cập thông tin phân trang
  const loading = useSelector((state) => state.adminSlice.loading); // Trạng thái loading

  // Kiểm tra bảng đang là `users`
  React.useEffect(() => {
    if (activeTable === "users") {
      
      dispatch(setActiveTable("users")); // Chuyển đổi sang bảng users

    }
  }, [activeTable, dispatch]);

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <div>
      <h2>Bảng Người Dùng</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            {/* Duyệt qua các tiêu đề cột từ JSON */}
            {tableData?.name?.map((header, index) => (
              <th key={index}>{header.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Hiển thị danh sách users */}
          {tableData?.rows?.length > 0 ? (
            tableData.rows.map((user, index) => (
              <tr key={index}>
                {Object.values(user).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={tableData?.headers?.length || 1}>
                Không có dữ liệu người dùng.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Phân trang */}
      <div>
        <p>
          Trang hiện tại: {pagination.currentPage} / {pagination.totalPages}
        </p>
      </div>
    </div>
  );
};

export default UserTable;
