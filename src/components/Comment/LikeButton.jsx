// 좋아요 버튼 컴포넌트
function LikeButton({ comment, currentUser, onLike }) {
  // likedUserIds가 배열이 아니면 빈 배열로 초기화 (안전장치)
  const likedUserIds = Array.isArray(comment.likedUserIds)
    ? comment.likedUserIds
    : [];
  // 현재 유저가 이미 좋아요 눌렀는지 확인 (유저가 로그인했고, likedUserIds에 유저 id가 있으면 true)
  const alreadyLiked = currentUser
    ? likedUserIds.includes(currentUser.id)
    : false;

  return (
    <button
      onClick={() => onLike(comment, alreadyLiked)}
      className={`like-button ${alreadyLiked ? "liked" : ""}`}
    >
      {/* 이미 좋아요 눌렀으면 빨간 하트, 아니면 빈 하트 */}
      <span className="like-icon">{alreadyLiked ? "❤️" : "♡"}</span>
    </button>
  );
}

export default LikeButton;
