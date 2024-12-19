import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import formConfig from "../formData/formConfig.json";
import validateFormData from "./validateInput";
import {
  fetchUsers,
  fetchJobs,
  fetchJobTypes,
  fetchServices,
  addItem,
  deleteItemAsync
} from "../../../redux/adminSlice";

// Styled-components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  pointer-events: ${(props) => (props.isVisible ? "auto" : "none")};
  transition: opacity 0.3s ease;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  max-width: 90%;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transform: ${(props) => (props.isVisible ? "scale(1)" : "scale(0.8)")};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: transform 0.3s ease, opacity 0.3s ease;
`;

const CloseButton = styled.button`
  background: crimson;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background: darkred;
  }
`;

const Modal = ({ isVisible, closeModal, modalType }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
 
    if (modalType && formConfig[modalType]) {
      const initialData = formConfig[modalType].reduce((acc, field) => acc, {});
      setFormData(initialData);
    }
  }, [modalType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
 
    if (name === "gender" || name === "hoanThanh") {
      const genderValue = value === "Nam" ? true : false;
      setFormData((prevData) => ({
        ...prevData,
        [name]: genderValue,
      }));
      return;
    } 
    // Nếu là các trường như 'skill', 'certification'
    else if (name === "skill" || name === "certification") {
      const arrayValue = value.split(",").map((item) => item.trim());
      setFormData((prevData) => ({
        ...prevData,
        [name]: arrayValue,
      }));
      return;
    }
  
    // Cập nhật giá trị cho các trường khác
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Đảm bảo giá trị được lưu vào formData đúng cách
    }));
  };
  
  const handleSubmit = async () => {
    const validationErrors = validateFormData(formData, formConfig, modalType);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const actionPayload = { modalType, formData };
    dispatch(addItem(actionPayload));
    dispatch(fetchUsers());
    dispatch(fetchJobs());
    dispatch(fetchJobTypes());
    dispatch(fetchServices());
    closeModal();
  };

  const renderFields = (fields) => {
    return fields.map((field) => (
      <td key={field.name} className="py-3 px-6">
        {field.type !== "select" ? (
          <div>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${
                errors[field.name] ? "border-red-500" : "border-gray-300"
              } rounded-md`}
              placeholder={field.placeholder}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        ) : (
          <select
          name={field.name}
          
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border ${
            errors[field.name] ? "border-red-500" : "border-gray-300"
          } rounded-md`}
        >
          <option value="">Chọn {field.title}</option>
          {field.options &&
            field.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
        </select>
        
        )}
      </td>
    ));
  };

  return (
    <ModalOverlay isVisible={isVisible} onClick={closeModal}>
      <ModalContent isVisible={isVisible} onClick={(e) => e.stopPropagation()}>
        <h2>{modalType === "user" && "Thêm người dùng"}</h2>
        <h2>{modalType === "job" && "Thêm công việc"}</h2>
        <h2>{modalType === "service" && "Thêm dịch vụ"}</h2>
        <h2>{modalType === "jobType" && "Thêm loại công việc"}</h2>

        {modalType && (
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                {formConfig[modalType].map((field) => (
                  <th
                    key={field.name}
                    className="py-3 px-6 text-left text-gray-600 font-bold"
                  >
                    {field.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>{renderFields(formConfig[modalType])}</tr>
            </tbody>
          </table>
        )}

        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
            onClick={handleSubmit}
          >
            Thêm{" "}
            {modalType === "user"
              ? "người dùng"
              : modalType === "job"
              ? "công việc"
              : modalType === "jobType"
              ? "loại công việc"
              : "dịch vụ"}
          </button>
          <CloseButton onClick={closeModal}>Đóng Modal</CloseButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

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



export default Modal;
