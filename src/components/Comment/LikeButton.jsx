// 좋아요 버튼 컴포넌트
function LikeButton({ comment, currentUser, onLike }) {
  // likedUserIds가 배열인지 확인 후 아니면 빈배열
  const likedUserIds = Array.isArray(comment.likedUserIds)
    ? comment.likedUserIds
    : [];

  // 현재 사용자가 이미 이 댓글을 좋아요 눌렀는지 확인
  const alreadyLiked = currentUser
    ? likedUserIds.includes(currentUser.id)
    : false;

  return (
    <button
      // 좋아요 상태에 따라 onClick 시 like 또는 unlike 처리
      onClick={() => onLike(comment, alreadyLiked)}
      // 좋아요 여부에 따라 스타일 클래스 다르게 설정
      className={`like-button ${alreadyLiked ? "liked" : ""}`}
    >
      {/* 아이콘은 ❤️(좋아요 누름), ♡(좋아요 안 누름) 으로 표현 */}
      <span className="like-icon">{alreadyLiked ? "❤️" : "♡"}</span>
    </button>
  );
}

export default LikeButton;
