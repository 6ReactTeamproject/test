export const isEmpty = (value) => {
  if (typeof value === "string") {
    return !value.trim();
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }
  return !value;
};

export const validateRequired = (data, fields) => {
  const errors = {};
  fields.forEach((field) => {
    if (isEmpty(data[field])) {
      errors[field] = `${field}는 필수 항목입니다.`;
    }
  });
  return errors;
};

export const validateImage = (file) => {
  if (!file) return true;
  const validTypes = ["image/jpeg", "image/png", "image/gif"];
  return validTypes.includes(file.type);
};
