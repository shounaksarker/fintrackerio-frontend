import React, { useState } from 'react';
import Image from 'next/image';
import DetailsModal from '../modals/DetailsModal';
import Loader from './Loader';
import targetArrowIcon from '@/assets/svg/targetArrow.svg';
import { DATA_QUANTITY } from '@/assets/constants';

const CustomTable = ({
  headers,
  data = [],
  enableSearch = false,
  enablePagination = false,
  enableDetailsView = true,
  detailsViewTitle = 'Details',
  className,
  tableClass,
  inputClass,
  headerClass,
  rowClass,
  errorMessage,
  paginationClass,
  paginationBtnClass,
  paginationBtnColor,
  loading,
}) => {
  const [detailsModal, setDetailsModal] = useState(false);
  const [details, setDetails] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSizeOptions = DATA_QUANTITY;
  const [selectedPageSize, setSelectedPageSize] = useState(pageSizeOptions[0]);
  const itemsPerPage = enablePagination ? selectedPageSize : data.length;

  const seeDescription = (rowData) => {
    if (enableDetailsView && rowData) {
      const formattedData = headers.map((header) => ({
        label: header.label,
        value: header.function
          ? header.function(rowData[header.target])
          : rowData[header.target] || rowData[header.label.toLowerCase().replace(' ', '_')] || '-',
      }));
      setDetails(formattedData);
      setDetailsModal(true);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((item) => {
    return Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowClick = (e, row) => {
    // Check if the click occurred within an action button
    const isActionButton = e.target.closest('[data-action-button]');
    // Only call seeDescription if not clicking on an action button
    if (!isActionButton) {
      seeDescription(row);
    }
  };

  return (
    <div className={className || ''}>
      {enableSearch && (
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
          className={`mb-4 rounded border border-gray-300 p-2 ${inputClass || ''}`}
        />
      )}

      <div className={`flex gap-x-6 overflow-x-auto md:flex-col md:gap-x-0 ${tableClass || ''}`}>
        <div
          className={`flex w-full flex-col items-start justify-between gap-y-4 md:mb-4 md:flex-row md:items-center md:gap-y-0 ${headerClass || ''}`}
        >
          {headers.map((header, index) => (
            <span
              key={index}
              className={`font-bold  ${header.thIcon ? 'flex gap-x-2' : ''} ${header.style} ${header.thStyle ? header.thStyle : ''}`}
            >
              {header.thIcon && header.thIcon}
              {header.label}
            </span>
          ))}
        </div>

        {loading ? (
          <div className="flex h-44 w-full items-center justify-center">
            <Loader />
          </div>
        ) : (
          <>
            {!paginatedData.length ? (
              <div className="pb-3 pt-6 text-center font-semibold text-pGray">{`${errorMessage || 'No Data Found...'}`}</div>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`flex w-full flex-col items-start justify-between gap-y-4 md:flex-row md:items-center md:gap-y-0 md:border-t md:border-bGray md:py-2 ${rowClass || ''} cursor-pointer hover:bg-gray-50`}
                  onClick={(e) => handleRowClick(e, row)}
                >
                  {headers.map((header, colIndex) => {
                    const conditionalStyle =
                      header.conditionalStyles &&
                      header.conditionalStyles.find((style) => style.condition(row[header.target]));
                    return (
                      <span
                        key={colIndex}
                        className={`cursor-pointer capitalize ${header.tdIcon || header.dynamicIcon ? 'flex gap-x-2' : ''} ${header.style} ${header.tdStyle ? header.tdStyle : ''} ${conditionalStyle ? conditionalStyle.style : ''}`}
                      >
                        {header.tdIcon && header.tdIcon}
                        {header.dynamicIcon && (
                          <Image
                            src={row[header.dynamicIcon] || targetArrowIcon}
                            alt="icon"
                            width={20}
                            height={20}
                            className={`size-5 ${header.dynamicIconClass}`}
                          />
                        )}
                        {header.index && rowIndex + 1}
                        {header.function
                          ? header.function(row[header.target])
                          : row[header.target] || row[header.label.toLowerCase().replace(' ', '_')]}
                        {header.action && (
                          <span>
                            {header.action.map((action, actionIndex) => (
                              <button
                                key={actionIndex}
                                data-action-button="true"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  action.onClick(row);
                                }}
                                className={`mr-2 ${action.style}`}
                              >
                                {action.label}
                              </button>
                            ))}
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>
              ))
            )}
          </>
        )}
      </div>

      {enablePagination && (
        <div className="mt-4 flex items-center justify-end gap-4">
          <select
            value={selectedPageSize}
            onChange={(e) => {
              setSelectedPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="rounded border border-gray-300 px-2 py-1"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <div className={`flex items-center ${paginationClass}`}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`${totalPages > 2 ? 'mx-2 rounded p-1 text-xs' : 'hidden'} ${paginationBtnClass} 
              ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              {'<- '}Prev
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const pageNum = index + 1;

              if (
                pageNum <= 2 ||
                pageNum === totalPages ||
                pageNum === totalPages - 1 ||
                Math.abs(currentPage - pageNum) <= 1
              ) {
                return (
                  <button
                    key={index}
                    className={`mx-1 rounded px-3 py-1 ${paginationBtnClass}
                    ${
                      currentPage === pageNum
                        ? paginationBtnColor || 'bg-gray-300'
                        : `${paginationBtnColor ? `${paginationBtnColor}/50` : 'bg-gray-300/50'}`
                    }`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              }
              if (
                (pageNum === 3 && currentPage > 4) ||
                (pageNum === totalPages - 2 && currentPage < totalPages - 3)
              ) {
                return (
                  <span key={index} className="mx-1">
                    ...
                  </span>
                );
              }
              return null;
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`${totalPages > 2 ? 'mx-2 rounded p-1 text-xs' : 'hidden'} mx-2 rounded p-1 text-xs ${paginationBtnClass}
              ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              Next{' ->'}
            </button>
          </div>
        </div>
      )}

      <DetailsModal
        loading={false}
        modalOpen={detailsModal}
        setModalOpen={setDetailsModal}
        title={detailsViewTitle}
        data={details}
      />
    </div>
  );
};

export default CustomTable;
