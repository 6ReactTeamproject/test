import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditMember from "./EditMember";
import DeleteButton from "../../components/Travel&Member/DeleteButton";
import { useUser } from "../../hooks/UserContext";
import "../../styles/travel.css";
import "../../styles/post.css";

const API_URL = "http://localhost:3001/members";

function DetailMember() {
  const [members, setMembers] = useState(null); // 멤버 상세 정보 저장
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
  const { id } = useParams(); // URL 파라미터에서 멤버 ID 추출
  const navigate = useNavigate(); // 페이지 이동용 훅
  const { user } = useUser(); // 현재 로그인한 사용자 정보 가져오기

  useEffect(() => {
    // 페이지 로딩 시 해당 멤버 정보 불러오기
    fetch(`${API_URL}/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setMembers(data); // 상태에 멤버 데이터 저장
      });
  }, [id]);

  // 아직 데이터 로딩 중인 경우
  if (!members) return <p>로딩 중...</p>;

  // 현재 로그인한 사용자가 해당 멤버 정보를 작성한 사람인지 확인
  const isOwner = String(user?.id) === String(members.authorId);

  return (
    <>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ position: "relative" }}
      >
        {/* 닫기 버튼 */}
        <button
          className="close-button"
          onClick={() => navigate(-1)} // 뒤로가기
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

        {isEditing ? (
          // 수정 모드일 경우 수정 컴포넌트 표시
          <EditMember
            member={members}
            onDone={(updated) => {
              setMembers(updated); // 수정 완료된 정보로 상태 업데이트
              setIsEditing(false); // 수정 모드 종료
            }}
          />
        ) : (
          <>
            {/* 이미지가 있는 경우 보여줌 */}
            {members.imageUrl && (
              <img
                src={members.imageUrl}
                alt="preview"
                style={{ width: "100%", borderRadius: "8px" }}
              />
            )}

            <br />
            {/* 이름 및 소개 출력 */}
            <strong>{members.name}</strong>
            <p>{members.introduction}</p>

            {/* 작성자 본인일 경우만 수정/삭제 버튼 표시 */}
            {isOwner && (
              <div className="button-group">
                <button
                  onClick={() => setIsEditing(true)}
                  className="add-button"
                >
                  ✏️ 수정
                </button>
                <DeleteButton
                  endpoint="members"
                  Id={members.id}
                  backaddress="/team"
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default DetailMember;
