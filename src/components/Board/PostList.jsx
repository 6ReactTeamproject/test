import PostItem from "./PostItem";

const PostList = ({ members, posts, onClickPost, currentPage }) => (
  <ul>
    {posts.length > 0 ? (
      posts.map((post) => (
        <PostItem
          key={post.id}
          members={members}
          post={post}
          onClick={() => onClickPost(post.id, currentPage)}
        />
      ))
    ) : (
      <p>게시물이 없습니다</p>
    )}
  </ul>
);

export default PostList;
