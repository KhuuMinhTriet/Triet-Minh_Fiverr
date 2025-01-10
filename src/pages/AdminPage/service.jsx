import React, {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchData, openModalDelete, setItemSearch} from "../../redux/adminSlice";
import Pagination from './method/pagination'
import DeleteModal from "./Modal/deleteModal";
import {
  getFilteredData,
  confirmDelete,
  handleEdit,
  handleSave,
  handleInputChange,
} from './method/method';

export default function Service() {
  const dispatch = useDispatch();
  
  const { list: services, loading } = useSelector((state) => state.adminSlice);
  const {pageSize, isSearch, pageIndex } = useSelector(state => state.adminSlice.pagination);
const {isItemSearch, list} = useSelector(state => state.adminSlice);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const handleSaveClick = () => {
    handleSave("services", editedData, editingId, dispatch, setEditingId).then(() => {
     
            Swal.fire({
              icon: 'success',
              title: 'Cập nhật thành công!',
              text: 'Ảnh đại diện đã được cập nhật.',
              confirmButtonText: 'OK',
            });
          })
          .catch((error) => {
    
            Swal.fire({
              icon: 'error',
              title: 'Cập nhật thất bại!',
              text: error.message || 'Đã xảy ra lỗi khi cập nhật.',
              confirmButtonText: 'Thử lại',
            });
          });
  }
  useEffect(() => {
    
    dispatch(fetchData("services", pageIndex, pageSize));
  }, [dispatch, pageIndex, pageSize]);

  const renderTabContent = () => {
    const filteredData = getFilteredData(services, [], isSearch, pageIndex, pageSize);

    if (filteredData.length === 0) {
      return (
        <tr>
          <td colSpan={6} className="text-center py-3">
            Không có dữ liệu
          </td>
        </tr>
      );
    }

    return filteredData?.map((service) => (
      <tr className="hover:bg-gray-100" key={service.id}>
        <td className="py-3 px-6">
          {editingId === service.id ? (
            <input
              type="text"
              name="id"
              value={editedData.id || ""}
              onChange={(e) => handleInputChange(e, setEditedData)}
              className="border px-2 py-1 rounded"
            />
          ) : (
            service.id
          )}
        </td>
        <td className="py-3 px-6">
          {editingId === service.id ? (
            <input
              type="text"
              name="maCongViec"
              value={editedData.maCongViec || ""}
              onChange={(e) => handleInputChange(e, setEditedData)}
              className="border px-2 py-1 rounded"
            />
          ) : (
            service.maCongViec
          )}
        </td>
        <td className="py-3 px-6">
          {editingId === service.id ? (
            <input
              type="text"
              name="maNguoiThue"
              value={editedData.maNguoiThue || ""}
              onChange={(e) => handleInputChange(e, setEditedData)}
              className="border px-2 py-1 rounded"
            />
          ) : (
            service.maNguoiThue
          )}
        </td>
        <td className="py-3 px-6">
          {editingId === service.id ? (
            <input
              type="date"
              name="ngayThue"
              value={editedData.ngayThue || ""}
              onChange={(e) => handleInputChange(e, setEditedData)}
              className="border px-2 py-1 rounded"
            />
          ) : (
            service.ngayThue
          )}
        </td>
        <td className="py-3 px-6">
  {editingId === service.id ? (
    <select
      name="hoanThanh"
      value={editedData.hoanThanh}
      onChange={(e) => 
        setEditedData((prevData) => ({
          ...prevData,
          hoanThanh: e.target.value === "true", 
        }))
      }
      className="border px-2 py-1 rounded"
    >
      <option value="true">Đã hoàn thành</option>
      <option value="false">Chưa hoàn thành</option>
    </select>
  ) : (
    service.hoanThanh ? "Đã hoàn thành" : "Chưa hoàn thành"
  )}
</td>

        <td className="py-3 px-6 flex gap-2">
          {editingId === service.id ? (
            <>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                onClick={handleSaveClick}
              >
                Lưu
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                onClick={() => setEditingId(null)}
              >
                Hủy
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                onClick={() => handleEdit(service, setEditingId, setEditedData)}
              >
                Sửa
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => dispatch(openModalDelete(service.id))}
              >
                Xóa
              </button>
            </>
          )}
        </td>
      </tr>
    ));
  };

  return (
    <div className="overflow-x-auto">
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => confirmDelete(deleteId, dispatch, setIsModalOpen)}
      />
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="py-3 px-6">Mã dịch vụ</th>
            <th className="py-3 px-6">Mã công việc</th>
            <th className="py-3 px-6">Mã người thuế</th>
            <th className="py-3 px-6">Ngày thuê</th>
            <th className="py-3 px-6">Hoàn thành</th>
            <th className="py-3 px-6">Hành động</th>
          </tr>
        </thead>
        <tbody>{renderTabContent()}</tbody>
      </table>
      <Pagination/>
    </div>
  );
}
