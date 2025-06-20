import React from "react";

// 공용 폼 버튼 컴포넌트
export default function FormButton({
  onClick,
  children,
  type = "button",
  className,
}) {
  // HTML 기본 button 태그를 래핑하여 일관된 스타일과 동작을 제공
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}
