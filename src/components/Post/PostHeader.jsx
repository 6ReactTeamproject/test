function PostHeader({ post }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h2 style={{ marginBottom: "10px" }}>{post.title}</h2>
      <p style={{ whiteSpace: "pre-wrap", marginBottom: "10px" }}>
        {post.content}
      </p>
      <div style={{ color: "#666", fontSize: "0.9em" }}>
        <span style={{ marginRight: "15px" }}>작성일: {post.createdAt}</span>
        <span>조회수: {post.views ?? 0}회</span>
      </div>
    </div>
  );
}

export default PostHeader;
