// 게시글 배열에서 키워드와 검색 유형에 따라 필터링하는 함수
export const filterPosts = (posts, keyword, searchType) => {
  // 검색 키워드가 비어있으면 모든 게시글 반환
  if (!keyword.trim()) return posts;

  return posts.filter((post) => {
    // 게시글 제목과 내용을 소문자로 변환 (대소문자 구분 없이 검색하기 위해)
    const title =
      typeof post.title === "string" ? post.title.toLowerCase() : "";
    const content =
      typeof post.content === "string" ? post.content.toLowerCase() : "";

    // userId는 숫자일 수 있으므로 문자열로 변환
    const userId = post.userId?.toString();

    // 검색 유형에 따라 필터 조건 결정
    switch (searchType) {
      case "title":
        return title.includes(keyword); // 제목에 키워드가 포함되었는지
      case "content":
        return content.includes(keyword); // 내용에 키워드가 포함되었는지
      case "title_content":
        return title.includes(keyword) || content.includes(keyword); // 제목 또는 내용에 키워드 포함 여부
      case "userId":
        return userId === keyword; // 작성자 ID와 정확히 일치하는지
      default:
        return false; // 정의되지 않은 검색 유형일 경우 결과 제외
    }
  });
};
