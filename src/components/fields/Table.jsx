import React, { useState } from 'react';
import Image from 'next/image';
import DetailsModal from '../modals/DetailsModal';
import Loader from './Loader';
import EmptyState from './EmptyState';
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
  emptyTitle,
  emptyDescription,
  emptyAction,
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

  const tableTemplateColumns = headers
    .map((header) => (header.action ? 'minmax(58px, 0.45fr)' : 'minmax(0, 1fr)'))
    .join(' ');

  return (
    <div className={className || ''}>
      {enableSearch && (
        <div className="custom-border mb-4 flex min-h-11 w-full max-w-sm items-center gap-2 rounded-xl px-3">
          <span className="relative size-4 rounded-full border-2 border-finance-muted/70 before:absolute before:-bottom-1 before:-right-1 before:h-2 before:w-0.5 before:-rotate-45 before:rounded-full before:bg-finance-muted/70" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
            className={`w-full bg-transparent py-2.5 text-sm font-medium text-finance-ink placeholder:text-finance-muted/70 ${inputClass || ''}`}
          />
        </div>
      )}

      <div
        className={`scrollbar-hidden flex gap-x-6 overflow-x-auto rounded-2xl border border-white/70 bg-white/85 p-4 shadow-card backdrop-blur-xl md:flex-col md:gap-x-0 ${!paginatedData.length && !loading ? 'block' : ''} ${tableClass || ''}`}
      >
        <div
          className={`hidden w-full items-center gap-x-3 text-finance-muted md:mb-3 md:grid md:px-2 ${!paginatedData.length && !loading ? 'md:hidden' : ''} ${headerClass || ''}`}
          style={{ gridTemplateColumns: tableTemplateColumns }}
        >
          {headers.map((header, index) => (
            <span
              key={index}
              className={`min-w-0 text-[11px] font-bold capitalize tracking-wide md:!w-full md:text-sm ${header.thIcon ? 'flex gap-x-2' : ''} ${header.style} ${header.thStyle ? header.thStyle : ''}`}
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
              <EmptyState
                compact={enableSearch}
                title={emptyTitle || (searchTerm ? 'No matching records' : errorMessage || 'No data found')}
                description={
                  emptyDescription ||
                  (searchTerm
                    ? 'Try another keyword or clear the search field.'
                    : 'Once records are added for this section, they will appear here.')
                }
                action={emptyAction}
              />
            ) : (
              paginatedData.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`flex w-full cursor-pointer flex-col items-start gap-y-3 rounded-2xl border border-finance-border bg-white/80 p-3 text-xs text-finance-ink shadow-soft transition-all hover:bg-finance-panel md:grid md:items-center md:gap-x-3 md:gap-y-0 md:rounded-xl md:border-x-0 md:border-b-0 md:border-t md:bg-transparent md:p-3 md:text-sm md:shadow-none ${rowClass || ''}`}
                  style={{ gridTemplateColumns: tableTemplateColumns }}
                  onClick={(e) => handleRowClick(e, row)}
                >
                  {headers.map((header, colIndex) => {
                    const conditionalStyle =
                      header.conditionalStyles &&
                      header.conditionalStyles.find((style) => style.condition(row[header.target]));
                    const cellValue = header.function
                      ? header.function(row[header.target])
                      : row[header.target] || row[header.label.toLowerCase().replace(' ', '_')];
                    return (
                      <span
                        key={colIndex}
                        className={`flex w-full min-w-0 cursor-pointer items-center justify-between gap-3 capitalize max-md:!w-full max-md:!min-w-0 md:!w-full md:justify-start ${header.tdIcon || header.dynamicIcon ? 'md:flex md:items-center md:gap-x-2' : ''} ${header.style} ${header.tdStyle ? header.tdStyle : ''} ${conditionalStyle ? conditionalStyle.style : ''}`}
                      >
                        <span className="text-[11px] font-black uppercase tracking-wide text-finance-muted md:hidden">
                          {header.label}
                        </span>
                        <span
                          className={`flex min-w-0 max-w-[58vw] items-center justify-end gap-2 text-right md:max-w-full md:justify-start md:text-left ${header.action ? 'shrink-0' : 'truncate'}`}
                          title={
                            typeof cellValue === 'string' || typeof cellValue === 'number'
                              ? String(cellValue)
                              : ''
                          }
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
                          {!header.action && <span className="min-w-0 truncate">{cellValue}</span>}
                          {header.action && (
                            <span className="flex items-center gap-2">
                              {header.action.map((action, actionIndex) => (
                                <button
                                  key={actionIndex}
                                  data-action-button="true"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    action.onClick(row);
                                  }}
                                  className={`flex size-7 items-center justify-center rounded-full bg-transparent text-pest ${action.style}`}
                                >
                                  {typeof action.label === 'function' ? action.label(row) : action.label}
                                </button>
                              ))}
                            </span>
                          )}
                        </span>
                      </span>
                    );
                  })}
                </div>
              ))
            )}
          </>
        )}
      </div>

      {enablePagination && totalItems > 0 && (
        <div className="mt-4 flex flex-row items-center justify-end gap-2 rounded-2xl border border-white/70 bg-white/70 p-2 shadow-soft">
          <select
            value={selectedPageSize}
            onChange={(e) => {
              setSelectedPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="custom-border min-h-9 shrink-0 rounded-xl px-2 py-1 text-sm font-bold text-finance-ink"
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
