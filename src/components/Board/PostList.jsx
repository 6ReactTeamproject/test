import PostItem from "./PostItem";

const PostList = ({ posts, onClickPost }) => (
  <ul>
    {posts.length > 0 ? (
      posts.map((post) => (
        <PostItem key={post.id} post={post} onClick={() => onClickPost(post.id)} />
      ))
    ) : (
      <p>게시물이 없습니다</p>
    )}
  </ul>
);

export default PostList;
