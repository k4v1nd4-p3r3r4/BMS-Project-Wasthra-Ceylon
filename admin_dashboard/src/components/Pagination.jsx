import React from "react";

const Pagination = ({ currentPage, itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            onClick={() =>
              paginate(currentPage > 1 ? currentPage - 1 : currentPage)
            }
          >
            Prev
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              onClick={() => paginate(number)}
              className={`page-link ${number === currentPage ? "active" : ""}`}
            >
              {number}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button
            className="page-link"
            onClick={() =>
              paginate(
                currentPage < pageNumbers.length ? currentPage + 1 : currentPage
              )
            }
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
