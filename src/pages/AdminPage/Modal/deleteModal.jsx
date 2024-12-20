

import React from "react";


export const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
 
   return (
     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
       <div className="bg-white rounded-lg shadow-lg p-6 w-96">
         <h2 className="text-lg font-bold mb-4">Xác nhận xóa</h2>
         <p className="text-gray-600 mb-6">
           Bạn có chắc chắn muốn xóa nhân viên này? Hành động này không thể hoàn tác.
         </p>
         <div className="flex justify-end space-x-4">
           <button
             className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none"
             onClick={onClose}
           >
             Hủy
           </button>
           <button
             className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
             onClick={onConfirm}
           >
             Xóa
           </button>
         </div>
       </div>
     </div>
   );
 };
 
export default DeleteModal