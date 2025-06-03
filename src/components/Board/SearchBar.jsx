const SearchBar = ({ searchTerm, searchType, onTermChange, onTypeChange }) => (
  <div>
    <input
      type="text"
      placeholder="검색어 입력"
      value={searchTerm}
      onChange={(e) => onTermChange(e.target.value)}
    />
    <select value={searchType} onChange={(e) => onTypeChange(e.target.value)}>
      <option value="title">제목</option>
      <option value="content">내용</option>
      <option value="title_content">제목+내용</option>
      <option value="userId">작성자 ID</option>
    </select>
  </div>
);

export default SearchBar;
