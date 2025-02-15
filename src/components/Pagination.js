import React from "react";
import "./Pagination.css";
import RightArrow from "../SVG/RightArrow";
import LeftArrow from "../SVG/LeftArrow";

const Pagination = ({ pageForward, pageBackward, pageNumber }) => {
  return (
    <div className="pagination">
      <div className="pagination-item" onClick={pageBackward}>
        <LeftArrow />
      </div>
      <div className="pagiantion-count">{pageNumber}</div>
      <div className="pagination-item" onClick={pageForward}>
        <RightArrow />
      </div>
    </div>
  );
};

export default Pagination;
