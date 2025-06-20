function LikeButton({ comment, currentUser, onLike }) {
  const likedUserIds = Array.isArray(comment.likedUserIds)
    ? comment.likedUserIds
    : [];
  const alreadyLiked = currentUser
    ? likedUserIds.includes(currentUser.id)
    : false;

  return (
    <button
      onClick={() => onLike(comment, alreadyLiked)}
      className={`like-button ${alreadyLiked ? "liked" : ""}`}
    >
      <span className="like-icon">{alreadyLiked ? "❤️" : "♡"}</span>
    </button>
  );
}

export default LikeButton;
