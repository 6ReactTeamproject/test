import { apiDelete } from "../../api/fetch";
import { useLocation } from "react-router-dom";
import "../../styles/post.css";

function PostActions({ post, postUser, currentUser, id, navigate }) {
  const location = useLocation();

  const handleDelete = () => {
    if (window.confirm("게시글을 삭제할까요?")) {
      apiDelete("posts", id).then(() => {
        // 게시판에서 왔다면 해당 페이지로 돌아가기
        if (location.state?.fromBoard) {
          let url = "/post";
          const params = [];
          if (location.state.page) params.push(`page=${location.state.page}`);
          if (location.state.sort) params.push(`sort=${location.state.sort}`);
          if (params.length > 0) url += "?" + params.join("&");
          navigate(url);
        } else {
          navigate(-1);
        }
      });
    }
  };

  return (
    <div className="post-actions-container">
      <span className="post-author-info">
        작성자: {postUser ? postUser.name : "알 수 없음"}
      </span>
      {currentUser && String(currentUser.id) === String(post.userId) && (
        <>
          <button
            className="edit-button"
            onClick={() =>
              navigate(`/edit/${id}`, {
                state: {
                  fromBoard: location.state?.fromBoard,
                  page: location.state?.page,
                  sort: location.state?.sort,
                },
              })
            }
          >
            수정
          </button>
          <button className="delete-button" onClick={handleDelete}>
            삭제
          </button>
        </>
      )}
    </div>
  );
}

export default PostActions;
