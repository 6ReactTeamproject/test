import EditForm from "../../components/Travel&Member/EditForm";
import SelectImage from "../../components/Travel&Member/SelectImage";

export default function EditMember({ member, onDone }) {
  // 모든 필드가 유효하게 입력되었는지 확인 (공백 제거 후 값이 있는지 체크)
  const isFilled = (data) =>
    data.name?.trim() && data.role?.trim() && data.introduction?.trim();

  return (
    <EditForm
      endpoint="members"       // 수정할 데이터의 엔드포인트 (API 경로)
      empty={isFilled}         // 유효성 검사 함수 전달
      data={member}            // 수정 대상 데이터
      onDone={onDone}          // 수정 완료 후 처리 함수
    >
      <input name="name" placeholder="이름" />
      <textarea name="introduction" placeholder="소개" />
      <SelectImage />         {/* 이미지 선택 기능 컴포넌트 */}
    </EditForm>
  );
}
