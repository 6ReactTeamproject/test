import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteButton from "../../components/Travel&Member/DeleteButton";
import EditTravelIntro from "./EditTravelIntro";
import { useUser } from "../../hooks/UserContext";
import "../../styles/post.css";
import "../../styles/travel.css";

export default function DetailTravel() {
  // 여행지 정보 상태 관리
  const [travelPlace, setTravelPlace] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
  const { id } = useParams(); // URL에서 id 추출
  const navigate = useNavigate();
  const { user } = useUser(); // 로그인된 사용자 정보

  // 컴포넌트 마운트 시 해당 여행지 정보 조회
  useEffect(() => {
    fetch(`http://localhost:3001/semester/${id}`)
      .then((res) => res.json())
      .then((data) => setTravelPlace(data));
  }, [id]);

  // 여행지 정보가 로딩되지 않았다면 출력
  if (!travelPlace) return <p>로딩 중...</p>;

  // 현재 로그인한 사용자가 이 글의 작성자인지 확인
  const isOwner = String(user?.id) === String(travelPlace.authorId);

  return (
    <div
      className="modal-content"
      onClick={(e) => e.stopPropagation()} // 모달 닫힘 방지
      style={{ position: "relative" }}
    >
      {/* 닫기 버튼 (이전 페이지로 이동) */}
      <button
        className="close-button"
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: "12px",
          right: "20px",
          background: "none",
          border: "none",
          fontSize: "2rem",
          color: "#888",
          cursor: "pointer",
          zIndex: 10,
        }}
        aria-label="닫기"
      >
        ×
      </button>

      {/* 수정 모드일 경우 수정 컴포넌트 출력 */}
      {isEditing ? (
        <EditTravelIntro
          travelPlace={travelPlace}
          onDone={(updated) => {
            setTravelPlace(updated); // 수정된 데이터로 상태 업데이트
            setIsEditing(false); // 수정 모드 종료
          }}
        />
      ) : (
        <>
          {/* 이미지가 있을 경우 출력 */}
          {travelPlace.imageUrl && (
            <img
              src={travelPlace.imageUrl}
              alt="preview"
              style={{ width: "100%", borderRadius: "8px" }}
            />
          )}
          <h3>{travelPlace.title}</h3>
          <p>{travelPlace.description}</p>

          {/* 글 작성자만 수정/삭제 버튼 표시 */}
          {isOwner && (
            <div className="button-group">
              <button
                onClick={() => setIsEditing(true)}
                className="add-button"
              >
                ✏️ 수정
              </button>
              <DeleteButton
                endpoint="semester"      // 삭제할 데이터의 엔드포인트
                Id={travelPlace.id}      // 삭제할 항목의 ID
                backaddress="/intro"     // 삭제 후 돌아갈 페이지
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
