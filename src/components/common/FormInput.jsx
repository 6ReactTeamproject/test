import React from "react";

// 공용 폼 입력(Input) 필드 컴포넌트
export default function FormInput({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  className,
}) {
  // HTML 기본 input 태그를 래핑하여 재사용성을 높임
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  );
}
