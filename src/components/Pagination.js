import React from "react";
import "./Pagination.css";
import RightArrow from "../SVG/RightArrow";
import LeftArrow from "../SVG/LeftArrow";

const Pagination = ({ pageForward, pageBackward, pageNumber }) => {
  return (
    <div className="Pagination">
      <div className="Pagination-item" onClick={pageBackward}>
        <LeftArrow />
      </div>
      <div className="Pagiantion-count">{pageNumber}</div>
      <div className="Pagination-item" onClick={pageForward}>
        <RightArrow />
      </div>
    </div>
  );
};

export default Pagination;
