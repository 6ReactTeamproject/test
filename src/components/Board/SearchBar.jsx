const SearchBar = ({
  searchTerm,
  searchType,
  onSearchTermChange,
  onSearchTypeChange,
}) => (
  <div
    style={{
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
      padding: "15px",
      backgroundColor: "#f8f9fa",
      borderRadius: "4px",
    }}
  >
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => onSearchTermChange(e.target.value)}
      placeholder="검색어를 입력하세요"
      style={{
        flex: 1,
        padding: "8px 12px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        fontSize: "14px",
      }}
    />
    <select
      value={searchType}
      onChange={(e) => onSearchTypeChange(e.target.value)}
      style={{
        padding: "8px 12px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        backgroundColor: "#fff",
        fontSize: "14px",
      }}
    >
      <option value="title">제목</option>
      <option value="content">내용</option>
      <option value="title+content">제목+내용</option>
      <option value="userId">작성자</option>
    </select>
  </div>
);

export default SearchBar;
