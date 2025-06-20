import { useState } from "react";
import "../../styles/board.css";

const SearchBar = ({
  searchTerm,    // 현재 검색어
  searchType,    // 현재 검색 타입
  onTermChange,  // 검색어 변경
  onTypeChange,  // 검색 타입 변경
  onSearch,      // 검색 실행
}) => {
  // 입력 폼 내부에서 관리하는 입력값 상태
  const [inputValue, setInputValue] = useState("");

  // 검색 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    onTermChange(inputValue);
    onSearch();
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        {/* 검색 입력창 */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="검색어를 입력하세요"
          className="search-input"
        />

        {/* 검색 범위 선택 */}
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

        {/* 검색 버튼 */}
        <button type="submit" className="search-button">
          검색
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
