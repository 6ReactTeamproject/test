function CommentForm({ currentUser, id, setComments }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text").trim();
    if (!text) return;

    fetch("http://localhost:3001/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: Number(id),
        userId: currentUser?.id,
        text,
        createdAt: new Date().toISOString(),
        likes: 0,
        likedUserIds: [],
      }),
    }).then(() => {
      e.target.reset();
      fetch(`http://localhost:3001/comments?postId=${id}`)
        .then((res) => res.json())
        .then((data) => {
          const enriched = data.map((c) => ({
            ...c,
            createdAt: c.createdAt || new Date().toISOString(),
            likes: c.likes || 0,
            likedUserIds: Array.isArray(c.likedUserIds) ? c.likedUserIds : [],
          }));
          setComments(enriched);
        });
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="text" placeholder="댓글을 입력하세요" />
      <button type="submit">댓글 작성</button>
    </form>
  );
}

export default CommentForm;
