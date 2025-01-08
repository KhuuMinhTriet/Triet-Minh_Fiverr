import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeUpdateModal, updateItem } from "../../../redux/adminSlice";
import Swal from "sweetalert2"; // Import SweetAlert2

const UpdateModal = () => {
  const dispatch = useDispatch();
  const { updateModal } = useSelector((state) => state.adminSlice);
  const currentPage = useSelector((state) => state.adminSlice.currentPage);
  const user = JSON.parse(localStorage.getItem("USER_LOGIN")).user;

  // State để lưu thông tin người dùng
  const [userInfo, setUserInfo] = useState({
    id: user?.id || "",
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    birthday: user?.birthday || "",
    bookingJob: user?.bookingJob || "",
    certification: user?.certification || "",
    password: user?.password || "",
    role: user?.role || "",
    gender: user?.gender ? 'Nam' : 'Nữ' || "",
  });

  // Lấy dữ liệu từ localStorage khi component render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);

  // Xử lý khi người dùng chỉnh sửa thông tin
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirm = () => {
    dispatch(closeUpdateModal(false));
    const userUpdate = { ...userInfo, gender: userInfo.gender === 'Nam' ? true : false };
    console.log(userUpdate);

    // Dispatch the update action
    dispatch(updateItem({
      modalType: "users",
      id: userInfo.id,
      formData: userUpdate,
    }));

    // Use SweetAlert2 to show a success message
    Swal.fire({
      title: "Thành công!",
      text: "Thông tin người dùng đã được cập nhật.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return updateModal ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">
          Cập nhật thông tin
        </h2>

        {/* Input fields */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tên</label>
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Số điện thoại</label>
          <input
            type="number"
            name="phone"
            value={userInfo.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Ngày sinh</label>
          <input
            type="date"
            name="birthday"
            value={userInfo.birthday}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Công việc</label>
          <input
            type="text"
            name="bookingJob"
            value={userInfo.bookingJob}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Chứng chỉ</label>
          <input
            type="text"
            name="certification"
            value={userInfo.certification}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Mật khẩu</label>
          <input
            type="password"
            name="password"
            value={userInfo.password}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Thêm select cho giới tính */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Giới tính</label>
          <select
            name="gender"
            value={userInfo.gender}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Chọn giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => dispatch(closeUpdateModal(false))}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default UpdateModal;
