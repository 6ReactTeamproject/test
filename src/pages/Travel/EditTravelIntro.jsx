import EditForm from "../../components/Travel&Member/EditForm";
import SelectImage from "../../components/Travel&Member/SelectImage";

export default function EditTravelIntro({ travelPlace, onDone }) {
  // 입력값이 모두 채워졌는지 확인하는 함수
  const isFilled = (data) =>
    data.title?.trim() && data.description?.trim();

  return (
    // 공통 EditForm 컴포넌트를 활용하여 수정 폼 렌더링
    <EditForm
      endpoint="semester"    // 수정할 데이터의 API 엔드포인트
      empty={isFilled}       // 필수값 유효성 검사 함수
      data={travelPlace}     // 수정 전 기존 데이터 전달
      onDone={onDone}        // 수정 완료 후 실행할 콜백 함수
    >
      {/* 장소명 입력 필드 */}
      <input name="title" placeholder="장소명" />
      {/* 장소 소개 입력 필드 */}
      <textarea name="description" placeholder="장소 소개" />
      {/* 이미지 선택 컴포넌트 */}
      <SelectImage />
    </EditForm>
  );
}
