const PostItem = ({ members, post, onClick }) => {
  const author = members.find((member) => member.id === post.userId.toString());
  return (
    <li
      onClick={onClick}
      style={{
        cursor: "pointer",
        padding: "15px",
        marginBottom: "10px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        backgroundColor: "#fff",
        transition: "background-color 0.2s",
        ":hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <h3 style={{ marginBottom: "8px" }}>{post.title}</h3>
      <p
        style={{
          marginBottom: "8px",
          color: "#666",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {post.content}
      </p>
      <div
        style={{
          fontSize: "0.9em",
          color: "#888",
        }}
      >
        <span style={{ marginRight: "15px" }}>
          작성자: {author?.name || "알 수 없음"}
        </span>
        <span style={{ marginRight: "15px" }}>작성일: {post.createdAt}</span>
        <span>조회수: {post.views || 0}</span>
      </div>
    </li>
  );
};

export default PostItem;