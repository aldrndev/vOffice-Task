import { Pagination } from "@nextui-org/react";

const PaginationPage = ({ totalPage, currentPage, onPageChange }) => {
  return (
    <Pagination
      total={totalPage}
      initialPage={1}
      page={currentPage}
      onChange={onPageChange}
    />
  );
};

export default PaginationPage;
