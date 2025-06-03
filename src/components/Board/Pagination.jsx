const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => (
  <div>
    <button onClick={onPrev} disabled={currentPage === 1}>이전</button>
    <span>{currentPage} / {totalPages}</span>
    <button onClick={onNext} disabled={currentPage === totalPages}>다음</button>
  </div>
);

export default Pagination;
