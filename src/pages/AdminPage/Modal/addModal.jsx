import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { fetchUsers, fetchJobs, fetchJobTypes, fetchServices, addItem } from "../../../redux/adminSlice";
import validateFormData from "./validateInput";
import formRequest from "../formData/formRequest.json";
import styled from "styled-components";

const Modal = ({ isVisible, closeModal, modalType }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (modalType && formRequest[modalType]) {
      const initialData = formRequest[modalType].reduce((acc, field) => {
        acc[field.name] = field.name === "skill" || field.name === "certification" ? [] : "";
        return acc;
      }, {});
      setFormData(initialData);
    }
  }, [modalType]);

  const validationSchema = Yup.object(
    formRequest[modalType]?.reduce((acc, field) => {
      if (field.required) {
        acc[field.name] = Yup.string().required(`${field.title} là bắt buộc`);
      } else {
        acc[field.name] = Yup.string();
      }
      return acc;
    }, {})
  );
  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const validationErrors = validateFormData(values, formRequest, modalType);
  
      // If there are validation errors, set them and prevent submission
      if (Object.keys(validationErrors).length > 0) {
        formik.setErrors(validationErrors);
        return; // Prevent form submission if there are errors
      }
  
      const processedValues = { ...values };
  
      // Process skills and certifications into arrays
      if (processedValues.skill) {
        processedValues.skill = processedValues.skill.split(",").map((item) => item.trim());
      }
  
      if (processedValues.certification) {
        processedValues.certification = processedValues.certification.split(",").map((item) => item.trim());
      }
  
      // Convert number fields
      const numericFields = ["nguoiTao", "saoCongViec", "giaTien", "danhGia"];
      numericFields.forEach((field) => {
        if (processedValues[field]) {
          processedValues[field] = parseFloat(processedValues[field]);
        }
      });
  
      const actionPayload = { modalType, formData: processedValues };
      dispatch(addItem(actionPayload));
      dispatch(fetchUsers());
      dispatch(fetchJobs());
      dispatch(fetchJobTypes());
      dispatch(fetchServices());
  
      closeModal();
  
      Swal.fire({
        title: `${modalType === "user" ? "người dùng" : modalType === "job" ? "công việc" : modalType === "jobType" ? "loại công việc" : "dịch vụ"} đã được thêm`,
        text: `Thông tin ${modalType === "user" ? "người dùng" : modalType === "job" ? "công việc" : modalType === "jobType" ? "loại công việc" : "dịch vụ"} đã được thêm thành công.`,
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          popup: "bg-white shadow-lg rounded-lg",
          title: "text-xl font-semibold text-gray-700",
          confirmButton: "bg-blue-500 text-white px-6 py-2 rounded-md",
        },
      });
    },
  });
  
  const renderFields = () => {
    return formRequest[modalType].map((field) => (
      <InputFieldContainer key={field.name}>
        <Label htmlFor={field.name}>{field.title}</Label>
        {field.type === "select" ? (
          <Select
            name={field.name}
            id={field.name}
            onChange={(e) => {
              const selectedOption = e.target.options[e.target.selectedIndex];
              const selectedValue = selectedOption.getAttribute("data-value") === "true"; 
              formik.setFieldValue(field.name, selectedValue); 
            }}
            onBlur={formik.handleBlur}
          >
            <Option value="">Chọn {field.title}</Option>
            {field.options &&
              field.options.map((option, index) => (
                <Option key={index} value={option} data-value={index === 0 ? "true" : "false"}>
                  {option}
                </Option>
              ))}
          </Select>
        ) : (
          <Input
            type={field.type}
            name={field.name}
            id={field.name}
            value={formik.values[field.name] || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isError={formik.touched[field.name] && formik.errors[field.name]}
            placeholder={field.placeholder}
          />
        )}
        {formik.touched[field.name] && formik.errors[field.name] && (
          <ErrorMessage>{formik.errors[field.name]}</ErrorMessage>
        )}
      </InputFieldContainer>
    ));
  };
  
  return isVisible ? (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
        <h2>{modalType === "user" && "Thêm người dùng"}</h2>
          <h2>{modalType === "job" && "Thêm công việc"}</h2>
          <h2>{modalType === "service" && "Thêm dịch vụ"}</h2>
          <h2>{modalType === "jobType" && "Thêm loại công việc"}</h2>
          <CloseButton onClick={closeModal}>X</CloseButton>
        </ModalHeader>

        <form onSubmit={formik.handleSubmit}>
          <ModalBody>
            <FormGrid>{renderFields()}</FormGrid>

            <FormValidation>
              {Object.keys(formik.errors).length > 0 && (
                <ErrorSummary>
                  <ul>
                    {Object.keys(formik.errors).map((key) => (
                      <li key={key}>{formik.errors[key]}</li>
                    ))}
                  </ul>
                </ErrorSummary>
              )}
            </FormValidation>
          </ModalBody>

          <ModalFooter>
            <CancelButton type="button" onClick={closeModal}>Hủy</CancelButton>
            <SubmitButton type="submit" disabled={formik.isSubmitting}>
  {modalType === "user" && "Thêm người dùng"}
  {modalType === "job" && "Thêm công việc"}
  {modalType === "service" && "Thêm dịch vụ"}
  {modalType === "jobType" && "Thêm loại công việc"}
</SubmitButton>

          </ModalFooter>
        </form>
      </ModalContainer>
    </ModalOverlay>
  ) : null;
};

export default Modal;



const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 600px;
  max-width: 100%;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
`;

const ModalBody = styled.div`
  margin-top: 1rem;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InputFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.875rem;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-top: 0.25rem;
  border: 1px solid ${(props) => (props.isError ? "red" : "#ccc")};
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  margin-top: 0.25rem;
  border: 1px solid ${(props) => (props.isError ? "red" : "#ccc")};
  border-radius: 4px;
`;

const Option = styled.option`
  padding: 0.75rem;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.875rem;
`;

const FormValidation = styled.div`
  margin-top: 1rem;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 4px;
`;

const ErrorSummary = styled.div`
  ul {
    list-style-type: none;
    padding-left: 0;
  }

  li {
    color: red;
    font-size: 0.875rem;
  }
`;

const CancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    opacity: 0.9;
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #4caf50;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;
