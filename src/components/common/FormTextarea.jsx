import React from "react";

// 공용 폼 텍스트 영역(Textarea) 컴포넌트
export default function FormTextarea({
  name,
  value,
  onChange,
  placeholder,
  className,
}) {
  // HTML 기본 textarea 태그를 래핑하여 재사용성을 높임
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  );
}
