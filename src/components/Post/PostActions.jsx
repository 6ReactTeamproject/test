import { apiDelete } from "../../api/fetch";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();

  const handleDelete = () => {
    if (window.confirm("게시글을 삭제할까요?")) {
      apiDelete("posts", id).then(() => {
        // 게시판에서 왔다면 해당 페이지로 돌아가기
        if (location.state?.fromBoard) {
          navigate(
            "/post" +
              (location.state.page ? `?page=${location.state.page}` : "")
          );
        } else {
          navigate(-1);
        }
      });
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <span style={{ marginRight: "15px" }}>
        작성자: {postUser ? postUser.name : "알 수 없음"}
      </span>
      {currentUser && String(currentUser.id) === String(post.userId) && (
        <>
          <button
            style={editButtonStyle}
            onClick={() =>
              navigate(`/edit/${id}`, {
                state: {
                  fromBoard: location.state?.fromBoard,
                  page: location.state?.page,
                },
              })
            }
          >
            수정
          </button>
          <button style={deleteButtonStyle} onClick={handleDelete}>
            삭제
          </button>
        </>
      )}
    </div>
  );
}

export default PostActions;
