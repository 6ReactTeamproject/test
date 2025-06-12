import { apiDelete } from "../../api/fetch";

const buttonStyle = {
  marginLeft: "10px",
  padding: "5px 10px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const editButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#4CAF50",
  color: "white",
};

const deleteButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#f44336",
  color: "white",
};

function PostActions({ post, postUser, currentUser, id, navigate }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <span style={{ marginRight: "15px" }}>
        작성자: {postUser ? postUser.name : "알 수 없음"}
      </span>
      {currentUser && String(currentUser.id) === String(post.userId) && (
        <>
          <button
            style={editButtonStyle}
            onClick={() => navigate(`/edit/${id}`)}
          >
            수정
          </button>
          <button
            style={deleteButtonStyle}
            onClick={() => {
              if (window.confirm("게시글을 삭제할까요?")) {
                apiDelete("posts", id).then(() => navigate(-1));
              }
            }}
          >
            삭제
          </button>
        </>
      )}
    </div>
  );
}

export default PostActions;
