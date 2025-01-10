import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchResults,
  setItemSearch,
  setSearchItem,
  searchUserOnPage,
  resetSearchResults,
  searchJob,
  searchTypeJob,
  searchService,
  openModal
} from '../../../redux/adminSlice';

const SearchMenu = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.adminSlice.currentPage);

  const page = currentPage === '/admin/QuanLyNguoiDung' ? 'người dùng' : 
               currentPage === '/admin/QuanLyCongViec' ? 'công việc' : 
               currentPage === '/admin/QuanLyLoaiCongViec' ? 'loại công việc' : 
               currentPage === '/admin/QuanLyDichVu' ? 'dịch vụ' : 'khác';

  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [filterRating, setFilterRating] = useState('');
  const [filterStars, setFilterStars] = useState('');
  const { list, originalData } = useSelector((state) => state.adminSlice);

  const handleOpenModal = (modalType) => {
    switch (modalType) {
      case 'người dùng': dispatch(openModal('user')); return;
      case 'công việc': dispatch(openModal('job')); return;
      case 'loại công việc': dispatch(openModal('jobType')); return;
      case 'dịch vụ': dispatch(openModal('service')); return;
      default: break;
    }
    dispatch(openModal(modalType));
  };

  const handleJobChange = (e) => {
    dispatch(setItemSearch(true));
    const searchData = originalData.filter((data) => {
      const danhGia = parseFloat(data.danhGia);
      const giaTien = parseFloat(data.giaTien);
      const sao = parseFloat(data.saoCongViec);

      const matchesRating =
        (filterRating === '1' && danhGia >= 20 && danhGia < 50) ||
        (filterRating === '2' && danhGia >= 50 && danhGia < 100) ||
        (filterRating === '3' && danhGia >= 100 && danhGia < 250) ||
        (filterRating === '4' && danhGia >= 250 && danhGia < 500) ||
        (filterRating === '5' && danhGia >= 500);

      const matchesPrice =
        (filterPrice === 'low' && giaTien < 20) ||
        (filterPrice === 'medium' && giaTien >= 20 && giaTien <= 50) ||
        (filterPrice === 'high' && giaTien > 50);

      const matchesStars =
        (filterStars === '1' && sao === 1) ||
        (filterStars === '2' && sao === 2) ||
        (filterStars === '3' && sao === 3) ||
        (filterStars === '4' && sao === 4) ||
        (filterStars === '5' && sao === 5);

      return (filterRating === '' || matchesRating) &&
             (filterPrice === '' || matchesPrice) &&
             (filterStars === '' || matchesStars);
    });

    dispatch(setSearchItem(searchData));
  };

  const handleSearchChange = (e) => {
    const itemSearch = e.target.value;

    if (itemSearch !== '') {
      dispatch(setItemSearch(true));
    } else {
      dispatch(setItemSearch(false));
    }

    const searchData = originalData.filter((data) => {
      const item = page === 'dịch vụ' ? itemSearch.toLowerCase() : itemSearch;
      const regex = new RegExp(`^${item}`);
      const trangThai = data.hoanThanh ? 'Đã hoàn thành' : 'Chưa hoàn thành';

      const matchesSearch =
        regex.test(data.name?.toLowerCase()) ||
        regex.test(data.email?.toLowerCase()) ||
        regex.test(data.tenCongViec?.toLowerCase()) ||
        regex.test(data.tenLoaiCongViec?.toLowerCase()) ||
        regex.test(trangThai?.toLowerCase()) ||
        regex.test(data.id?.toString());

      return matchesSearch;
    });

    dispatch(setSearchItem(searchData));
  };

  const handleSearch = () => {
    const payload = { pageIndex, pageSize, filterStatus, filterPrice, filterRating, filterStars };
    switch (page) {
      case 'người dùng': dispatch(searchUserOnPage(payload)); break;
      case 'công việc': dispatch(searchJob(payload)); break;
      case 'loại công việc': dispatch(searchTypeJob(payload)); break;
      case 'dịch vụ': dispatch(searchService(payload)); break;
      default: break;
    }
    dispatch(setSearchResults(payload));
  };

  const handlePriceSearch = (e) => {
    return setFilterPrice(e.target.value);
  };

  const handleStarSearch = (e) => {
    return setFilterStars(e.target.value);
  };

  const handleRatinSearch = (e) => {
    return setFilterRating(e.target.value);
  };

  const handleResetSearch = () => {
    dispatch(resetSearchResults());
    setFilterStatus('');
    setFilterPrice('');
    setFilterRating('');
    setFilterStars('');
  };

  return (
    <div className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between space-x-4 mb-4">
        <h2 className="text-xl font-semibold">Vui lòng chọn:</h2>
        <div className="flex flex-wrap sm:flex-nowrap space-x-4">
          <div className="flex items-center">
            <label htmlFor="pageSize" className="text-sm font-medium">
              Số {page} hiển thị trong một trang
            </label>
            <input
              type="number"
              id="pageSize"
              value={pageSize}
              onChange={(e) => {
                const newPageSize = parseInt(e.target.value, 10);
                setPageSize(newPageSize);
                setPageIndex(1);
              }}
              min={1}
              className="border border-gray-300 rounded-md px-2 py-1 w-20"
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="pageIndex" className="text-sm font-medium">
              Trang hiển thị
            </label>
            <input
              type="number"
              id="pageIndex"
              value={pageIndex}
              onChange={(e) => {
                const newPageIndex = parseInt(e.target.value, 10);
                setPageIndex(newPageIndex);
              }}
              min={1}
              className="border border-gray-300 rounded-md px-2 py-1 w-16"
            />
          </div>

          <div className="flex items-center flex-wrap space-x-4 mt-4 sm:mt-0 w-full sm:w-auto">
            <button
              onClick={() => handleSearch()}
              className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-md mt-2 sm:mt-0"
            >
              Tìm kiếm
            </button>

            <button
              onClick={() => handleResetSearch()}
              className="w-full sm:w-auto bg-gray-500 text-white px-4 py-2 rounded-md mt-2 sm:mt-0"
            >
              Reset
            </button>

            <button
              onClick={() => handleOpenModal(page)}
              className="w-full sm:w-auto text-xl font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-6 py-3 mt-2 sm:mt-0 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none shadow-lg"
            >
              Thêm {page}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 relative">
        <input
          type="text"
          placeholder={page === 'người dùng' ? 'Tìm kiếm theo tên người dùng hoặc email' : `Tìm kiếm ${page}`}
          onChange={handleSearchChange}
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:outline-none pl-10"
        />

{page === 'công việc' && (
  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div className="flex flex-col">
      <label htmlFor="filterPrice" className="block text-sm font-medium">
        Giá tiền
      </label>
      <select
        id="filterPrice"
        onChange={(e) => handlePriceSearch(e)}
        className="border border-gray-300 rounded-md px-3 py-2 w-full"
      >
        <option value="">Tất cả</option>
        <option value="low">Thấp (Nhỏ hơn 20)</option>
        <option value="medium">Trung bình (20 đến 50)</option>
        <option value="high">Cao (50 trở lên)</option>
      </select>
    </div>

    <div className="flex flex-col">
      <label htmlFor="filterRating" className="block text-sm font-medium">
        Đánh giá
      </label>
      <select
        id="filterRating"
        onChange={(e) => handleRatinSearch(e)}
        className="border border-gray-300 rounded-md px-3 py-2 w-full"
      >
        <option value="">Tất cả</option>
        <option value="1">20-50</option>
        <option value="2">50-100</option>
        <option value="3">100-250</option>
        <option value="4">250-500</option>
        <option value="5">Lớn hơn 500</option>
      </select>
    </div>

    <div className="flex flex-col">
      <label htmlFor="filterStars" className="block text-sm font-medium">
        Sao
      </label>
      <select
        id="filterStars"
        onChange={(e) => handleStarSearch(e)}
        className="border border-gray-300 rounded-md px-3 py-2 w-full"
      >
        <option value="">Tất cả</option>
        {[1, 2, 3, 4, 5].map((star) => (
          <option value={star} key={star}>
            {star} sao
          </option>
        ))}
      </select>
    </div>

    {/* Nút Tìm kiếm */}
    <div className="flex items-end">
      <button
        onClick={handleJobChange}
        className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md w-full sm:w-auto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 inline-block"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 3 7.5a7.5 7.5 0 0 0 13.65 9.15z"
          />
        </svg>
      </button>
    </div>
  </div>
)}
 {page === 'dịch vụ' && (
          <div className="mt-4">
            <label htmlFor="filterStatus" className="block text-sm font-medium">
              Trạng thái hoàn thành công việc
            </label>
            <select
              id="filterStatus"
              onChange={handleSearchChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            >
              <option value="">Tất cả</option>
              <option value="Đã hoàn thành">Đã hoàn thành</option>
              <option value="Chưa hoàn thành">Chưa hoàn thành</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchMenu;
