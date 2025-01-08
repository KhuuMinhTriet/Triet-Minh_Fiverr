

import React, {useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {closeModalDelete} from '../../../redux/adminSlice'
import { confirmDelete} from '../method/method';

const DeleteModal = () => {
  const dispatch = useDispatch();
  const {id} = useSelector(state => state.adminSlice);
  const {deleteModal} = useSelector(state => state.adminSlice)
    const currentPage = useSelector((state) => state.adminSlice.currentPage);
   const object = currentPage === '/admin/QuanLyNguoiDung' ? 'người dùng' : 
   currentPage === '/admin/QuanLyCongViec' ? 'công việc' : 
   currentPage === '/admin/QuanLyLoaiCongViec' ? 'loại công việc' : 
   currentPage === '/admin/QuanLyDichVu' ? 'dịch vụ' : 'khác';
   const page = currentPage === '/admin/QuanLyNguoiDung' ? 'users' : 
   currentPage === '/admin/QuanLyCongViec' ? 'jobs' : 
   currentPage === '/admin/QuanLyLoaiCongViec' ? 'jobTypes' : 
   currentPage === '/admin/QuanLyDichVu' ? 'services' : '';
    const confirmDeleteHandler = () =>{ 
      confirmDelete(page, id, dispatch);
      dispatch(closeModalDelete(false))};
  
   return deleteModal? (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
       <div className="bg-white rounded-lg shadow-lg p-6 w-96">
         <h2 className="text-lg font-bold mb-4">Xác nhận xóa</h2>
         <p className="text-gray-600 mb-6">
           Bạn có chắc chắn muốn xóa {object} này? Hành động này không thể hoàn tác.
         </p>
         <div className="flex justify-end space-x-4">
           <button
             className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none"
             onClick={() =>dispatch(closeModalDelete())}
           >
             Hủy
           </button>
           <button
             className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
             onClick={() => confirmDeleteHandler()}
           >
             Xóa
           </button>
         </div>
       </div>
     </div>

     
   ) : null;
 };
 
export default DeleteModal