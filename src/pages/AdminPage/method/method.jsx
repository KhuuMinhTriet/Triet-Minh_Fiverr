// helpers.js

import { fetchData, deleteItemAsync, updateItem } from "../../../redux/adminSlice";

// Hàm xử lý việc lọc dữ liệu người dùng dựa trên trang và tìm kiếm
export const getFilteredData = (users, searchResults, isSearch, currentPage, itemsPerPage) => {
    const data = isSearch ? searchResults : users;
    const startIndex = (currentPage - 1) * itemsPerPage;
    return Array.isArray(data)? data.slice(startIndex, startIndex + itemsPerPage) : users.slice(startIndex, startIndex + itemsPerPage);
  };


// Hàm xác nhận xóa 
export const confirmDelete = async (modalType, deleteId, dispatch) => {
  if (deleteId) {
    await dispatch(deleteItemAsync({ modalType: modalType, id: deleteId }));
  }
};

// Hàm xử lý việc chỉnh sửa 
export const handleEdit = (user, setEditingId, setEditedData) => {
  setEditingId(user.id);
  setEditedData(user);
};

// Hàm lưu thông tin đã chỉnh sửa
export const handleSave = async (object, editedData, editingId, dispatch, setEditingId) => {

  if (editingId) {
    const { password, avatar, bookingJob, ...dataWithoutPasswordAndImage } = editedData;
    
    await dispatch(
      updateItem({ modalType: object, id: editingId, formData: dataWithoutPasswordAndImage })
    );

    setEditingId(null);
    dispatch(fetchData(object));
  }
};

// Hàm xử lý thay đổi input trong quá trình chỉnh sửa
export const handleInputChange = (e, setEditedData) => {
  const { name, value } = e.target;

  setEditedData((prevData) => {
    if (name === "gender") {
      const genderValue = value === "true";
      return {
        ...prevData,
        gender: genderValue,
      };
    }
    if (name === "skill" || name === "certification") {
     
      const arrayValue = value.split(",").map((item) => item.trim());
      return {
        ...prevData,
        [name]: arrayValue,
      };
    }
    
    if (name === "maCongViec" || name === 'maNguoiThue') {
  
      return {
        ...prevData,
        [name]: Number(value),
      };
    }
   
    if (name !== "password" && name !== "avatar" && name !== "bookingJob") {
      return {
        ...prevData,
        [name]: value,
      };
    }
    return prevData;
  });
};
