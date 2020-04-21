import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const getPageNumber = (page, currentPage) => {
  if (page === currentPage) {
    return <strong>{page}</strong>;
  }
  return <React.Fragment>{page}</React.Fragment>;
};

const Pagination = ({ itemCount, pageSize, currentPage, onPageChange }) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) {
    return null;
  }
  console.log(pageCount);
  const pages = _.range(1, pageCount + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => {
          return (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <a
                onClick={() => {
                  onPageChange(page);
                }}
                className="page-link"
              >
                {getPageNumber(page, currentPage)}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
