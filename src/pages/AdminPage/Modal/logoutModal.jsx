

import React, {useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {closeLogoutModal} from '../../../redux/adminSlice'
import { confirmDelete} from '../method/method';

const LogoutModal = () => {
  const dispatch = useDispatch();
  const {logoutModal} = useSelector(state => state.adminSlice)
  const confirmDeleteHandler = () =>{ 
        localStorage.removeItem("USER_LOGIN");
        window.location.href = "/";
      dispatch(closeLogoutModal(false))};
  
   return logoutModal? (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
       <div className="bg-white rounded-lg shadow-lg p-6 w-96">
         <h2 className="text-lg font-bold mb-4">Xác nhận thoát</h2>
         <p className="text-gray-600 mb-6">
           Bạn có chắc chắn muốn thoát?
         </p>
         <div className="flex justify-end space-x-4">
           <button
             className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none"
             onClick={() =>dispatch(closeLogoutModal())}
           >
             Hủy
           </button>
           <button
             className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
             onClick={() => confirmDeleteHandler()}
           >
             Thoát
           </button>
         </div>
       </div>
     </div>

     
   ) : null;
 };
 
export default LogoutModal