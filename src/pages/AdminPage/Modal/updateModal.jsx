import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2"; 
import { fiverrService } from '../../../services/fetchAPI';
import { closeUpdateModal, updateItem } from "../../../redux/adminSlice";
import { FaPencilAlt } from "react-icons/fa";

const UpdateModal = () => {
  const dispatch = useDispatch();
  const [uploadFile, setUploadFile] = useState(null)
  const { updateModal } = useSelector((state) => state.adminSlice);
  const user = JSON.parse(localStorage.getItem("USER_LOGIN")).user;

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
    gender: user?.gender ? "Nam" : "Nữ" || "",
    avatar: user?.avatar || "",
  });

  // State để lưu trạng thái chỉnh sửa
  const [editingField, setEditingField] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
   
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserInfo((prev) => ({ ...prev, avatar: reader.result }));
      };
      setUploadFile(file)
      reader.readAsDataURL(file);
    }
  };

  const handleFieldClick = (field) => {
    setEditingField(field);
  };

  const handleBlur = () => {
    setEditingField(null);
  };

  const handleConfirm = async () => {
    try {
      const userUpdate = {
        ...userInfo,
        gender: userInfo.gender === "Nam" ? true : false,
      };
      dispatch(updateItem({
        modalType: 'image',
        formData: uploadFile
      }))
     dispatch(updateItem({
        modalType: "users",
        id: userInfo.id,
        formData: userUpdate,
      }));
     
      const response = await fiverrService.layUserTheoID(userInfo.id);
      const updatedUser = response.data.content;
      const storedUser = JSON.parse(localStorage.getItem("USER_LOGIN"));
      localStorage.setItem("USER_LOGIN", JSON.stringify({ ...storedUser, user: updatedUser }));
      
      setUserInfo(updatedUser);

      Swal.fire({
        title: "Thành công!",
        text: "Thông tin người dùng đã được cập nhật.",
        icon: "success",
        confirmButtonText: "OK",
      });

      dispatch(closeUpdateModal(false));
    } catch (error) {
      console.error("Cập nhật thất bại:", error);

      Swal.fire({
        title: "Lỗi!",
        text: "Có lỗi xảy ra khi cập nhật thông tin người dùng.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return updateModal ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Cập nhật thông tin</h2>

        {/* Render avatar */}
        <div className="mb-4 text-center">
          <label className="block text-sm font-medium mb-2"></label>
          <div className="relative">
            <img
              src={userInfo.avatar || ""}
              alt="Avatar"
              className="w-24 h-24 rounded-full mx-auto border"
            />
            <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer">
              <FaPencilAlt />
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Render các trường */}
        {[{ label: "Tên", field: "name" },
          { label: "Email", field: "email" },
          { label: "Số điện thoại", field: "phone" },
          { label: "Ngày sinh", field: "birthday", type: "date" },
          { label: "Công việc", field: "bookingJob" },
          { label: "Chứng chỉ", field: "certification" },
        ].map(({ label, field, type }) => (
          <div key={field} className="mb-4">
            <label className="block text-sm font-medium mb-1">{label}</label>
            {editingField === field ? (
              <input
                type={type || "text"}
                name={field}
                value={userInfo[field]}
                onChange={handleInputChange}
                onBlur={handleBlur}
                autoFocus
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <div className="flex items-center">
                <span className="flex-grow">{userInfo[field]}</span>
                <FaPencilAlt
                  className="cursor-pointer text-gray-500 ml-2"
                  onClick={() => handleFieldClick(field)}
                />
              </div>
            )}
          </div>
        ))}

        {/* Thêm select cho giới tính */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Giới tính</label>
          {editingField === "gender" ? (
            <select
              name="gender"
              value={userInfo.gender}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              autoFocus
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          ) : (
            <div className="flex items-center">
              <span className="flex-grow">{userInfo.gender}</span>
              <FaPencilAlt
                className="cursor-pointer text-gray-500 ml-2"
                onClick={() => handleFieldClick("gender")}
              />
            </div>
          )}
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
