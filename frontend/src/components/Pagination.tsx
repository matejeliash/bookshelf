import React from "react";
import "./Pagination.css"

type Result = {
  numFound: number;
};

type PaginationProps = {
  result: Result | null;
  page: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  result,
  page,
  onPageChange,
}) => {
  if (!result) return null;

  const totalPages = Math.ceil(result.numFound / 10);

  return (
    <div className="pagination">
      {/* First page */}
      {totalPages > 1 && page > 1 && (
        <button className="pageBtn" onClick={() => onPageChange(1)}>1</button>
      )}

      {/* Previous pages */}
      {[ -3, -2, -1].map((i) => {
        const p = page + i;
        return (
          p > 1 && (
            <button className="pageBtn" key={`page${p}`} onClick={() => onPageChange(p)}>
              {p}
            </button>
          )
        );
      })}

      {/* Current page */}
      {totalPages > 1 && (
        <button className ="curPageBtn" disabled>{`${page}`}</button>
      )}

      {/* Next pages */}
      {[1, 2, 3].map((i) => {
        const p = page + i;
        return (
          p < totalPages && (
            <button  className="pageBtn"  key={`page_${p}`} onClick={() => onPageChange(p)}>
              {p}
            </button>
          )
        );
      })}

      {/* Last page */}
      {totalPages > 1 && page < totalPages && (
        <button className="pageBtn"   onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </button>
      )}
    </div>
  );
};

export default Pagination;