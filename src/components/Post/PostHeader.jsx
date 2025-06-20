import "../../styles/post.css";

// 제목, 내용, 작성일 표시
const PostHeader = ({ post }) => (
  <div className="post-header-container">
    {/* 게시글 제목 */}
    <h2 className="post-header-title">{post.title}</h2>
    
    {/* 게시글 내용 */}
    <p className="post-header-content">{post.content}</p>
    
    {/* 작성일 정보 */}
    <div className="post-header-meta">
      <span className="post-header-date">
        작성일: {post.createdAt}
      </span>
    </div>
  </div>
);

export default PostHeader;
