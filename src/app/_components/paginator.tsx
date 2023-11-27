import React, { useState } from 'react';

export const Paginator = ({ itemsPerPage, totalItems, onPageChange }: { itemsPerPage: number, totalItems: number, onPageChange: (page: number) => void }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="paginator w-full  flex items-center justify-center space-x-2 m-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 rounded"
      >
        Previous
      </button>
      {generatePageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 rounded"
      >
        Next
      </button>
    </div>
  );
};
