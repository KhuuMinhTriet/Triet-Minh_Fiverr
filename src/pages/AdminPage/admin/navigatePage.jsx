// NavigatePage.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetSearchResults } from '../../../redux/adminSlice'; // Import action
import User from '../user';
import Job from '../job';
import JobType from '../jobType';
import Service from '../service';

const NavigatePage = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.adminSlice.currentPage);

  useEffect(() => {
    dispatch(resetSearchResults());
  }, [currentPage, dispatch]);

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
