const SearchBar = ({ inputTerm, searchType, onTermChange, onTypeChange, onSearch }) => (
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
    <select
      value={searchType}
      onChange={(e) => onTypeChange(e.target.value)}
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
      <option value="title_content">제목+내용</option>
      <option value="userId">작성자</option>
    </select>

    <input
      type="text"
      value={inputTerm}
      onChange={(e) => onTermChange(e.target.value)}
      placeholder="검색어를 입력하세요"
      style={{
        flex: 1,
        padding: "8px 12px",    
        border: "1px solid #ddd",
        borderRadius: "4px",
        fontSize: "14px",
      }}
    />
    <button onClick={onSearch}>검색</button>
  </div>
);

export default SearchBar;