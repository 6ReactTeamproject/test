import "../../styles/board.css";

const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => (
  <div className="pagination-container">
    {/* 이전 페이지 버튼 */}
    <span onClick={onPrev} className="pagination-button" role="button" tabIndex={0}>
      &lt;
    </span>

    {/* 현재/총 페이지 표시 */}
    <span className="pagination-info">
      {currentPage} / {totalPages}
    </span>

    {/* 다음 페이지 버튼 */}
    <span onClick={onNext} className="pagination-button" role="button" tabIndex={0}>
      &gt;
    </span>
  </div>
);

export default Pagination;
