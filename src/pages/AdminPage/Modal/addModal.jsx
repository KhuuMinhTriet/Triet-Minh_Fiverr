import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";  // Import Yup for validation
import { addItem, closeModal } from "../../../redux/adminSlice";
import formRequest from "../formData/formRequest.json"; 
import styled from "styled-components";

const Modal = () => {
  const dispatch = useDispatch();
  const { isVisible, modalType } = useSelector((state) => state.adminSlice);  
  const [formData, setFormData] = useState({});

  const modalTitles = {
    user: "người dùng",
    job: "công việc",
    service: "dịch vụ",
    jobType: "loại công việc",
    admin: "quản trị viên",
  };

  useEffect(() => {
    if (modalType && formRequest[modalType]) {
      const initialData = formRequest[modalType].reduce((acc, field) => {
        if (field.name === "role" && modalType === "admin") {
          acc[field.name] = "Admin"; 
        } else {
          acc[field.name] = field.name === "skill" || field.name === "certification" ? [] : "";
        }
        return acc;
      }, {});
      setFormData(initialData);
    }
  }, [modalType]);

  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;
    if (fieldName === "skill" || fieldName === "certification") {
      const newValue = value ? value.split(",").map((item) => item.trim()) : [];
      formik.setFieldValue(fieldName, newValue);
    } else {
      formik.handleChange(e);
    }
  };

//validation
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email không được để trống"),
    name: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "Tên không chứa ký tự đặc biệt")
      .required("Họ tên không được để trống"),
    username: Yup.string()
      .max(10, "Tên đăng nhập không được quá 10 ký tự"),
    birthday: Yup.date()
      .required("Ngày tháng không được để trống"),
      id: Yup.string()
      .required("Dữ liệu không được để trống"),
      gender: Yup.string()
      .required("Dữ liệu  không được để trống"),
      password: Yup.string()
      .required("Dữ liệu không được để trống"),
      role: Yup.string()
      .required("Dữ liệu không được để trống"),
      phone: Yup.string()
      .required("Dữ liệu không được để trống"),
     
  });
// Hàm kiểm tra tính hợp lệ cho từng trường
const checkFieldValidity = (formRequest, validationSchema) => {
  const invalidFields = [];

  Object.keys(formRequest).forEach(category => {
    formRequest[category].forEach(field => {
      const fieldName = field.valid;
      if (validationSchema.fields[fieldName]) {
        // Kiểm tra nếu trường hợp lệ
        const fieldValidation = validationSchema.fields[fieldName];
        try {
          fieldValidation.validateSync("test value");
        } catch (error) {
          invalidFields.push({ fieldName, error: error.message });
        }
      } else {
        // Nếu trường không có trong schema
        invalidFields.push({ fieldName, error: "Không có validation trong schema" });
      }
    });
  });

  return invalidFields;
};

// Gọi hàm để kiểm tra
const invalidFields = checkFieldValidity(formRequest, validationSchema);
console.log(invalidFields);
  // Formik
  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const processedValues = { ...values };
  
      if (modalType === "admin") {
        processedValues.role = "ADMIN";
      }

      try {
        const actionPayload = { resourceType: modalType, formData: processedValues };
        await dispatch(addItem(actionPayload)).unwrap(); // unwrap để bắt lỗi từ Redux thunk

        dispatch(closeModal());
        Swal.fire({
          title: `${modalTitles[modalType]?.charAt(0).toUpperCase() + modalTitles[modalType]?.slice(1)} đã được thêm`,
          text: `Thông tin ${modalTitles[modalType]} đã được thêm thành công.`,
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        Swal.fire({
          title: "Thêm thất bại",
          text: `Đã xảy ra lỗi khi thêm ${modalTitles[modalType]}. Vui lòng thử lại.`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
  });

  const renderFields = () => {
    return formRequest[modalType]?.map((field) => {
      const isSelectField = field.type === "select";
      const isGenderField = field.name === "gender" || field.name === "hoanThanh"; 
      const isSkillOrCertification = field.name === "skill" || field.name === "certification";

      return (
        <InputFieldContainer key={field.name}>
          <Label htmlFor={field.name}>{field.title}</Label>

          {isSelectField ? (
            <Select
              name={field.name}
              id={field.name}
              value={formik.values[field.name] || ""}
              onChange={(e) => {
                const selectedValue = e.target.value;
                if (isGenderField) {
                  formik.setFieldValue(field.name, selectedValue === "true");
                } else {
                  formik.handleChange(e);
                }
              }}
              onBlur={formik.handleBlur}
              isError={formik.touched[field.name] && formik.errors[field.name]}
            >
              <Option value="">Chọn {field.title}</Option>
              {isGenderField ? (
                <>
                  <Option value="true">{field.name === 'gender'? 'Nam' : 'Đã hoàn thành'}</Option>
                  <Option value="false">{field.name === 'gender'? 'Nữ' : 'Chưa hoàn thành'}</Option>
                </>
              ) : (
                field.options?.map((option, index) => (
                  <Option key={index} value={option}>
                    {option}
                  </Option>
                ))
              )}
            </Select>
          ) : isSkillOrCertification ? (
            <Input
              type="text"
              name={field.name}
              id={field.name}
              value={Array.isArray(formik.values[field.name]) ? formik.values[field.name].join(", ") : ""}
              onChange={(e) => handleInputChange(e, field.name)}
              onBlur={formik.handleBlur}
              isError={formik.touched[field.name] && formik.errors[field.name]}
              placeholder={`Nhập các ${field.title} (cách nhau bởi dấu phẩy)`}
            />
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
      );
    });
  };

  return isVisible ? (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <h2>{modalType === "user" && "Thêm người dùng"}</h2>
          <h2>{modalType === "job" && "Thêm công việc"}</h2>
          <h2>{modalType === "service" && "Thêm dịch vụ"}</h2>
          <h2>{modalType === "jobType" && "Thêm loại công việc"}</h2>
          <h2>{modalType === "admin" && "Thêm quản trị viên"}</h2>
          <CloseButton onClick={() => dispatch(closeModal())}>X</CloseButton>
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
            <CancelButton type="button" onClick={() => dispatch(closeModal())}>
              Hủy
            </CancelButton>
            <SubmitButton type="submit" disabled={formik.isSubmitting}>
              {modalType === "user" && "Thêm người dùng"}
              {modalType === "job" && "Thêm công việc"}
              {modalType === "service" && "Thêm dịch vụ"}
              {modalType === "jobType" && "Thêm loại công việc"}
              {modalType === "admin" && "Thêm quản trị viên"}
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
