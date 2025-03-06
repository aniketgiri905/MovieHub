import React from "react";
import "./Pagination.css";
import RightArrow from "../SVG/RightArrow";
import LeftArrow from "../SVG/LeftArrow";

const Pagination = ({ pageForward, pageBackward, pageNumber, totalPages, setPageNo }) => {
  // Define how many page numbers to show before and after the current page
  const visiblePageCount = 3;

  // Helper function to create the pagination array
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Always show the first page
    if (pageNumber > visiblePageCount + 1) {
      pageNumbers.push(1);
    }

    // Add the page numbers before the current page
    for (let i = Math.max(1, pageNumber - visiblePageCount); i < pageNumber; i++) {
      pageNumbers.push(i);
    }

    // Add current page
    pageNumbers.push(pageNumber);

    // Add the page numbers after the current page
    for (let i = pageNumber + 1; i <= Math.min(pageNumber + visiblePageCount, totalPages); i++) {
      pageNumbers.push(i);
    }

    // Always show the last page if there is a gap after current page
    if (pageNumber < totalPages - visiblePageCount) {
      pageNumbers.push(totalPages);
    }

    // Remove duplicate pages in case the last page was already added
    const finalPages = [];
    for (let i = 0; i < pageNumbers.length; i++) {
      if (finalPages[finalPages.length - 1] !== pageNumbers[i]) {
        finalPages.push(pageNumbers[i]);
      }
    }

    return finalPages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="Pagination">
      {/* Left Arrow */}
      <div
        className={`Pagination-item ${pageNumber === 1 ? "disabled" : ""}`}
        onClick={pageBackward}
      >
        <LeftArrow />
      </div>

      {/* Page Numbers */}
      {pageNumbers.map((number, index) => {
        // If the item is an ellipsis, just display it
        if (number === "...") {
          return (
            <div key={index} className="Pagination-item ellipsis">
              {number}
            </div>
          );
        }
        return (
          <div
            key={number}
            className={`Pagination-item ${pageNumber === number ? "active" : ""}`}
            onClick={() => setPageNo(number)}
          >
            {number}
          </div>
        );
      })}

      {/* Right Arrow */}
      <div
        className={`Pagination-item ${pageNumber === totalPages ? "disabled" : ""}`}
        onClick={pageForward}
      >
        <RightArrow />
      </div>
    </div>
  );
};

export default Pagination;
