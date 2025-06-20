import { useState } from "react";
import "../../styles/board.css";

const SearchBar = ({
  searchTerm,
  searchType,
  onTermChange,
  onTypeChange,
  onSearch,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onTermChange(inputValue);
    onSearch();
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="검색어를 입력하세요"
          className="search-input"
        />
        <select
          value={searchType}
          onChange={(e) => onTypeChange(e.target.value)}
          className="search-select"
        >
          <option value="title_content">제목+내용</option>
          <option value="title">제목만</option>
          <option value="content">내용만</option>
          <option value="author">작성자</option>
        </select>
        <button type="submit" className="search-button">
          검색
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
