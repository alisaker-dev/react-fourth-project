import ReactPaginate from "react-paginate";
import "./pagination.css";

export default function PaginatedItems({ setPage, itemsPerPage, total }) {
  const pageCount = total / itemsPerPage;
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => setPage(e.selected + 1)}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="custom-pagination d-flex align-items-center justify-content-end"
        pageLinkClassName="pagination-tag-anchor mx-2 text-secondary rounded-circle"
        activeClassName="bg-primary rounded-circle"
        activeLinkClassName="text-white "
      />
    </>
  );
}
