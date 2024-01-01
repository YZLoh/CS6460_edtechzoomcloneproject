import React from 'react';
import './pagination.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  const maxVisiblePages = 5; // Number of page numbers to show before displaying ellipsis

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    const visiblePages = pageNumbers.slice(
      Math.max(currentPage - Math.floor(maxVisiblePages / 2), 0),
      Math.min(currentPage + Math.floor(maxVisiblePages / 2), totalPages)
    );
  
    const pageElements = visiblePages.map((number) => (
      <button
        key={number}
        className={`pagination__button ${currentPage === number ? 'active' : ''}`}
        onClick={() => onPageChange(number)}
      >
        {number}
      </button>
    ));
  
    if (totalPages > maxVisiblePages) {
      if (visiblePages[0] !== 1) {
        pageElements.unshift(<span key="start-ellipsis">...</span>);
      }
      if (visiblePages[visiblePages.length - 1] !== totalPages) {
        pageElements.push(<span key="end-ellipsis">...</span>);
      }
    }
  
    return pageElements;
  };
  

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='pagination__next'
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='pagination__prev'
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
}

export default Pagination;
