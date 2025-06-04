function PostActions({ post, postUser, currentUser, id, navigate }) {
  return (
    <p>
      작성자: {postUser ? postUser.name : "알 수 없음"}
      {currentUser && String(currentUser.id) === String(post.userId) && (
        <>
          <button onClick={() => navigate(`/edit/${id}`)}>수정</button>
          <button
            onClick={() => {
              if (window.confirm("게시글을 삭제할까요?")) {
                fetch(`http://localhost:3001/posts/${id}`, {
                  method: "DELETE",
                }).then(() => navigate(-1));
              }
            }}
          >
            삭제
          </button>
        </>
      )}
    </p>
  );
}

export default PostActions;
