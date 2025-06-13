const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginTop: "5px",  }}>
    <span onClick={onPrev} style={{ cursor: "pointer" }}>&lt;</span>
    <span>{currentPage} / {totalPages}</span>
    <span onClick={onNext} style={{ cursor: "pointer" }}>&gt;</span>
</div>
);

export default Pagination;
