import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onSelectPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onSelectPage,
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePreviousClick = () => {
    if (!isFirstPage) {
      onSelectPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (!isLastPage) {
      onSelectPage(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onSelectPage(page);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbers = 5; // Mostrar máximo 5 botones de página

    // Mostrar siempre las primeras y últimas dos páginas
    const firstPages = [1, 2];
    const lastPages = [totalPages - 1, totalPages];

    if (totalPages <= maxPageNumbers) {
      // Si totalPages es menor o igual a maxPageNumbers, mostrar todas las páginas
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Si totalPages es mayor que maxPageNumbers, calcular el rango de páginas a mostrar
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push("...");
        }
      }
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push("...");
        }
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <button onClick={handlePreviousClick} disabled={isFirstPage}>
        Anterior
      </button>
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(page as number)}
          className={currentPage === page ? "active" : ""}
          disabled={typeof page !== "number"}
        >
          {page}
        </button>
      ))}
      <button onClick={handleNextClick} disabled={isLastPage}>
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
