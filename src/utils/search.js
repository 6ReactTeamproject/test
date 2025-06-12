export const filterPosts = (posts, keyword, searchType) => {
  if (!keyword.trim()) return posts;

  return posts.filter((post) => {
    const title =
      typeof post.title === "string" ? post.title.toLowerCase() : "";
    const content =
      typeof post.content === "string" ? post.content.toLowerCase() : "";
    const userId = post.userId?.toString();

    switch (searchType) {
      case "title":
        return title.includes(keyword);
      case "content":
        return content.includes(keyword);
      case "title_content":
        return title.includes(keyword) || content.includes(keyword);
      case "userId":
        return userId === keyword;
      default:
        return false;
    }
  });
};
