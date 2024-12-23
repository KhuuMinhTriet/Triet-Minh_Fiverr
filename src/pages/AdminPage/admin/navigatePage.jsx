import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';  // Sửa lại việc import đúng
import { resetSearchResults } from '../../../redux/adminSlice'; // Import action
import User from '../user';
import Job from '../job';
import JobType from '../jobType';
import Service from '../service';

const NavigatePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Đổi tên biến từ 'Navigate' thành 'navigate'
  const currentPage = useSelector((state) => state.adminSlice.currentPage);

  // Điều hướng trang khi cần thiết nhưng không làm thay đổi currentPage trong Redux
  useEffect(() => {
    dispatch(resetSearchResults());  // Reset search kết quả khi `currentPage` thay đổi
  }, [dispatch, currentPage]);

  const handleNavigation = (page) => {
    navigate(page);  // Sử dụng useNavigate để điều hướng mà không thay đổi Redux state
  };

  const renderPage = () => {
    switch (currentPage) {
      case '/admin/QuanLyNguoiDung':
        return <User />;
      case '/admin/QuanLyCongViec':
        return <Job />;
      case '/admin/QuanLyLoaiCongViec':
        return <JobType />;
      case '/admin/QuanLyDichVu':
        return <Service />;
      default:
        return 'Data not found...';
    }
  };

  return (
    <div className="flex-1 p-6">
      {/* Rendered page */}
      {renderPage()}
  
    </div>
  );
};

export default NavigatePage;
