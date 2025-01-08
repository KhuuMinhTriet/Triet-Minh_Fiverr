const validateFormData = (formData, formConfig, modalType) => {
  const validationErrors = {};

  // Check if formData is provided
  if (!formData) return validationErrors;

  formConfig[modalType].forEach((field) => {
    const value = formData[field.name];

    // Check for required fields
    if (field.required && (!value || value.trim() === "")) {
      validationErrors[field.name] = `${field.title} khổng được để trống.`;
    }

    // Validate email field
    if (field.name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        validationErrors[field.name] = `${field.title} không hợp lệ.`;
      }
    }

    // Validate number fields
    if (field.name === "phone") {
      const numericValue = Number(value); 
      if (isNaN(numericValue)) {
        validationErrors[field.name] = `${field.title} phải là số hợp lệ.`;
      }
    }

    // Validate text fields with maxLength
    if (field.type === "text" && field.maxLength && value) {
      if (value.length > field.maxLength) {
        validationErrors[field.name] = `${field.title} không được dài hơn ${field.maxLength} ký tự.`;
      }
    }

    // Validate date fields with correct format
    if (field.type === "date") {
      const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
      if (!dateRegex.test(value)) {
        validationErrors[field.name] = `${field.title} không đúng định dạng (YYYY-MM-DD).`;
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
