import CreateButton from "../../components/Travel&Member/CreateButton";
import SelectImage from "../../components/Travel&Member/SelectImage.jsx";

export default function CreateTravelIntro() {
  // 사용자가 모든 필드를 입력했는지 확인하는 함수
  // title과 description 모두 공백이 아닌 값이 있어야 true 반환
  const isFilled = (data) =>
    data.title?.trim() && data.description?.trim();

  return (
    // 여행 소개 글을 등록하는 폼
    // CreateButton은 공통 버튼 컴포넌트로, 내부의 input 값을 모아서 POST 요청을 보냄
    <CreateButton
      endpoint="semester"       // 글 작성 시 POST 요청을 보낼 API 엔드포인트
      redirect="/intro"         // 글 작성이 성공하면 이동할 페이지 경로
      empty={isFilled}          // 버튼 활성화를 위한 입력값 유효성 검사 함수
    >
      {/* 사용자가 여행 장소 제목을 입력하는 필드 */}
      <input name="title" placeholder="현지학기제 장소" />

      {/* 사용자가 여행에 대한 설명을 입력하는 필드 */}
      <textarea name="description" placeholder="현지학기제 소개" />
<<<<<<< Updated upstream
      <SelectImage cropShape="square" />
=======

      {/* 여행 이미지 업로드 기능을 제공하는 컴포넌트 */}
      <PostImgUploader />
>>>>>>> Stashed changes
    </CreateButton>
  );
}
