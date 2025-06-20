import "../../styles/post.css";

const PostHeader = ({ post }) => (
  <div className="post-header-container">
    <h2 className="post-header-title">{post.title}</h2>
    <p className="post-header-content">{post.content}</p>
    <div className="post-header-meta">
      <span className="post-header-date">작성일: {post.createdAt}</span>
    </div>
  </div>
);

export default PostHeader;
