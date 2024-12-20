// NavigatePage.js
import React from 'react';
import { useSelector } from 'react-redux';
import User from '../user';
import Job from '../job';
import JobType from '../jobType';
import Service from '../service';

const NavigatePage = () => {
  const currentPage = useSelector(state => state.adminSlice.currentPage);

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
