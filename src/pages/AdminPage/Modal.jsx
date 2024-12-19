import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addItem, fetchUsers, fetchJobs, fetchJobTypes, fetchServices, resetState } from '../../redux/adminSlice';
import formConfig from './formData/formConfig.json';

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
  pointer-events: ${(props) => (props.isVisible ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  max-width: 90%;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transform: ${(props) => (props.isVisible ? 'scale(1)' : 'scale(0.8)')};
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

// Component
const Modal = ({ isVisible, closeModal, modalType }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    resetState();
    if (modalType && formConfig[modalType]) {
      const initialData = formConfig[modalType].reduce((acc, field) => {
        acc[field.name] = '';
        return acc;
      }, {});
      setFormData(initialData);
    }
  }, [modalType]);

  const validateFormData = () => {
    const validationErrors = {};
    if (!formData) return validationErrors;

    formConfig[modalType].forEach((field) => {
      const value = formData[field.name];

      if (field.required && !value) {
        validationErrors[field.name] = `${field.title} là bắt buộc.`;
      }

      if (field.name === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          validationErrors[field.name] = `${field.title} không hợp lệ.`;
        }
      }

      if (field.type === 'number') {
        const numericValue = Number(value); // Chuyển đổi thành số
        if (isNaN(numericValue)) {
          validationErrors[field.name] = `${field.title} phải là số hợp lệ.`;
        }
      }
      

      if (field.type === 'text' && field.maxLength && value) {
        if (value.length > field.maxLength) {
          validationErrors[field.name] = `${field.title} không được dài hơn ${field.maxLength} ký tự.`;
        }
      }
      if (field.type === 'date') {
        const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        if (!dateRegex.test(value)) {
          validationErrors[field.name] = `${field.title} không đúng định dạng (YYYY-MM-DD).`;
        } else {
          // Kiểm tra tính hợp lệ của ngày tháng
          const date = new Date(value);
          const isValidDate = !isNaN(date.getTime());
          if (!isValidDate) {
            validationErrors[field.name] = `${field.title} không hợp lệ.`;
          }
        }
      }
      
    });

    return validationErrors;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    const validationErrors = validateFormData();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const actionPayload = { modalType, formData };
    await dispatch(addItem(actionPayload));
    dispatch(fetchUsers());
    dispatch(fetchJobs());
    dispatch(fetchJobTypes());
    dispatch(fetchServices());
    closeModal();
  };

  const renderFields = (fields) => {
    return fields.map((field) => (
      <td key={field.name} className="py-3 px-6">
        {field.type !== 'select' ? (
          <div>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${
                errors[field.name] ? 'border-red-500' : 'border-gray-300'
              } rounded-md`}
              placeholder={field.placeholder}
            />
            {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
          </div>
        ) : (
          <select
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border ${
              errors[field.name] ? 'border-red-500' : 'border-gray-300'
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
        <h2>{modalType === 'user' && 'Thêm người dùng'}</h2>
        <h2>{modalType === 'job' && 'Thêm công việc'}</h2>
        <h2>{modalType === 'service' && 'Thêm dịch vụ'}</h2>
        <h2>{modalType === 'jobType' && 'Thêm loại công việc'}</h2>

        {modalType && (
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                {formConfig[modalType].map((field) => (
                  <th key={field.name} className="py-3 px-6 text-left text-gray-600 font-bold">
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
            Thêm {modalType === 'user' ? 'người dùng' : modalType === 'job' ? 'công việc' : 'dịch vụ'}
          </button>
          <CloseButton onClick={closeModal}>Đóng Modal</CloseButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
