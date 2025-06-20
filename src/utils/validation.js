// 다양한 타입의 값이 비어있는지 여부를 확인하는 함수
export const isEmpty = (value) => {
  // 문자열인 경우, 공백 제거 후 비었는지 확인
  if (typeof value === "string") {
    return !value.trim();
  }
  // 배열인 경우, 길이가 0이면 비어있는 것
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  // 객체인 경우, 속성 키가 없으면 비어있는 것
  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }
  // 나머지 falsy 값 (null, undefined, 0, false 등)
  return !value;
};

// 특정 데이터 객체의 필수 필드가 비어있는지 검사하는 함수
export const validateRequired = (data, fields) => {
  const errors = {}; // 에러 메시지를 담을 객체
  fields.forEach((field) => {
    if (isEmpty(data[field])) {
      // 해당 필드가 비어있으면 에러 메시지 등록
      errors[field] = `${field}는 필수 항목입니다.`;
    }
  });
  return errors;
};

// 업로드된 이미지 파일이 유효한 타입인지 검사하는 함수
export const validateImage = (file) => {
  if (!file) return true; // 파일이 없으면 유효한 것으로 처리
  const validTypes = ["image/jpeg", "image/png", "image/gif"]; // 허용된 이미지 타입
  return validTypes.includes(file.type); // 타입이 허용 목록에 있는지 확인
};
