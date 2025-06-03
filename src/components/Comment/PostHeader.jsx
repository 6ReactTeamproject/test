// PostHeader.jsx
function PostHeader({ post }) {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>조회수: {post.views ?? 0}회</p>
    </div>
  );
}

export default PostHeader;
