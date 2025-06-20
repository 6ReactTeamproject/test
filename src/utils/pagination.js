// 현재 페이지에 해당하는 항목들을 잘라서 반환하는 함수
export const getPaginatedItems = (items, currentPage, itemsPerPage) => {
  // 현재 페이지의 마지막 항목 인덱스 계산
  const indexOfLastItem = currentPage * itemsPerPage;

  // 현재 페이지의 첫 번째 항목 인덱스 계산
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // 해당 페이지에 해당하는 항목만 잘라서 반환
  return items.slice(indexOfFirstItem, indexOfLastItem);
};

// 전체 페이지 수를 계산하는 함수
export const getTotalPages = (totalItems, itemsPerPage) => {
  // 전체 항목 수를 페이지당 항목 수로 나누고 올림 처리하여 페이지 수 반환
  return Math.ceil(totalItems.length / itemsPerPage);
};
