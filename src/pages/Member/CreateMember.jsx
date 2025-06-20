import CreateButton from "../../components/Travel&Member/CreateButton";
import SelectImage from "../../components/Travel&Member/SelectImage.jsx";

export default function CreateMember() {
  // 모든 필드가 채워져 있는지 확인하는 함수
  const isFilled = (data) =>
    data.name?.trim() && data.role?.trim() && data.introduction?.trim();

  return (
    // 공통 버튼 컴포넌트를 활용하여 멤버 생성 폼 렌더링
    <CreateButton
      endpoint="members" // POST 요청이 보내질 서버 endpoint
      redirect="/team"     // 작성 후 이동할 페이지 경로
      empty={isFilled}     // 모든 필드가 입력되었는지 체크하는 유효성 함수 전달
    >
      {/* 이름 입력 필드 */}
      <input name="name" placeholder="이름" />
      {/* 역할 입력 필드 */}
      <input name="role" placeholder="역할" />
      {/* 자기소개 입력 필드 */}
      <textarea name="introduction" placeholder="조원 소개" />
<<<<<<< Updated upstream
      <SelectImage cropShape="square" />
=======
      {/* 이미지 업로더 컴포넌트 */}
      <PostImgUploader />
>>>>>>> Stashed changes
    </CreateButton>
  );
}
