import React, { useState } from 'react';
import Image from 'next/image';
import DetailsModal from '../modals/DetailsModal';
import Loader from './Loader';
import targetArrowIcon from '@/assets/svg/targetArrow.svg';
import { DATA_QUANTITY } from '@/assets/constants';
import noDataImg from '@/assets/images/no-data.jpg';

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
          className={`custom-border mb-4 w-full max-w-sm px-3 py-2.5 text-sm text-finance-ink placeholder:text-finance-muted/70 focus:border-pest focus:ring-2 focus:ring-pest/15 ${inputClass || ''}`}
        />
      )}

      <div
        className={`scrollbar-hidden flex gap-x-6 overflow-x-auto rounded-2xl border border-white/70 bg-white/85 p-4 shadow-card backdrop-blur-xl md:flex-col md:gap-x-0 ${tableClass || ''}`}
      >
        <div
          className={`flex w-full flex-col items-start justify-between gap-y-4 text-finance-muted md:mb-3 md:flex-row md:items-center md:gap-y-0 ${headerClass || ''}`}
        >
          {headers.map((header, index) => (
            <span
              key={index}
              className={`text-[11px] font-bold capitalize tracking-wide md:text-sm ${header.thIcon ? 'flex gap-x-2' : ''} ${header.style} ${header.thStyle ? header.thStyle : ''}`}
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
              <div className="flex flex-col items-center justify-center text-center font-semibold text-pGray md:pb-3 md:pt-6">
                <Image
                  src={noDataImg}
                  alt="No transactions"
                  className="w-[200px] object-contain mix-blend-multiply md:w-[150px]"
                />
                {`${errorMessage || 'No Data Found...'}`}
              </div>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`flex w-full cursor-pointer flex-col items-start justify-between gap-y-4 rounded-xl px-2 text-xs text-finance-ink transition-all hover:bg-finance-panel md:flex-row md:items-center md:gap-y-0 md:border-t md:border-finance-border md:p-3 md:text-sm ${rowClass || ''}`}
                  onClick={(e) => handleRowClick(e, row)}
                >
                  {headers.map((header, colIndex) => {
                    const conditionalStyle =
                      header.conditionalStyles &&
                      header.conditionalStyles.find((style) => style.condition(row[header.target]));
                    return (
                      <span
                        key={colIndex}
                        className={`cursor-pointer capitalize ${header.tdIcon || header.dynamicIcon ? 'flex items-center gap-x-2' : ''} ${header.style} ${header.tdStyle ? header.tdStyle : ''} ${conditionalStyle ? conditionalStyle.style : ''}`}
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
                                {typeof action.label === 'function' ? action.label(row) : action.label}
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
        <div className="mt-4 flex flex-row items-center justify-end gap-2">
          <select
            value={selectedPageSize}
            onChange={(e) => {
              setSelectedPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="custom-border shrink-0 px-2 py-1 text-sm text-finance-ink"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <div
            className={`scrollbar-hidden flex min-w-0 items-center gap-1 overflow-x-auto whitespace-nowrap ${paginationClass || ''}`}
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`${totalPages > 2 ? 'mx-2 rounded p-1 text-xs' : 'hidden'} ${paginationBtnClass} 
              ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:text-pest'}`}
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
                    className={`mx-1 rounded-full px-3 py-1 text-sm ${paginationBtnClass}
                    ${
                      currentPage === pageNum
                        ? paginationBtnColor || 'bg-pest text-white'
                        : `${paginationBtnColor ? `${paginationBtnColor}/50` : 'bg-white text-finance-muted hover:bg-finance-panel'}`
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
              ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:text-pest'}`}
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
