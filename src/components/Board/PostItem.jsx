const PostItem = ({ post, onClick }) => (
  <li onClick={onClick} style={{ cursor: "pointer" }}>
    <h3>{post.title}</h3>
    <p>{post.content}</p>
    <p>
      작성자 ID: {post.userId} / {post.createdAt} / 조회수: {post.views}
    </p>
  </li>
);

export default PostItem;
