// validateInput.js
const validateFormData = (formData, formConfig, modalType) => {
    const validationErrors = {};
  
    if (!formData) return validationErrors;
  
    formConfig[modalType].forEach((field) => {
      const value = formData[field.name];
  
      if (field.required && !value) {
        validationErrors[field.name] = `${field.title} là bắt buộc.`;
      }
  
      if (field.name === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          validationErrors[field.name] = `${field.title} không hợp lệ.`;
        }
      }
  
      if (field.type === "number") {
        const numericValue = Number(value); // Chuyển đổi thành số
        if (isNaN(numericValue)) {
          validationErrors[field.name] = `${field.title} phải là số hợp lệ.`;
        }
      }
  
      if (field.type === "text" && field.maxLength && value) {
        if (value.length > field.maxLength) {
          validationErrors[
            field.name
          ] = `${field.title} không được dài hơn ${field.maxLength} ký tự.`;
        }
      }
  
      if (field.type === "date") {
        const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        if (!dateRegex.test(value)) {
          validationErrors[
            field.name
          ] = `${field.title} không đúng định dạng (YYYY-MM-DD).`;
        } else {
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
  
  export default validateFormData;
  