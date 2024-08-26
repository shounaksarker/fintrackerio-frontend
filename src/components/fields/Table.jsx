import React, { useState } from 'react';
import Image from 'next/image';
import DetailsModal from '../modals/DetailsModal';
import Loader from './Loader';
import targetArrowIcon from '@/assets/svg/targetArrow.svg';

const CustomTable = ({
  headers,
  data = [],
  enableSearch = false,
  dataPerPage,
  enablePagination = false,
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
  const itemsPerPage = enablePagination ? dataPerPage : data.length;

  const seeDescription = (info) => {
    if (info) {
      setDetails(info);
      setDetailsModal(true);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredData = data.filter((item) => {
    return Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = filteredData.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
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
                  className={`flex w-full flex-col items-start justify-between gap-y-4 md:flex-row md:items-center md:gap-y-0 md:border-t md:border-bGray md:py-2 ${rowClass || ''}`}
                >
                  {headers.map((header, colIndex) => {
                    const conditionalStyle =
                      header.conditionalStyles &&
                      header.conditionalStyles.find((style) => style.condition(row[header.target]));
                    return (
                      <span
                        key={colIndex}
                        className={`cursor-pointer capitalize ${header.tdIcon || header.dynamicIcon ? 'flex gap-x-2' : ''} ${header.style} ${header.tdStyle ? header.tdStyle : ''} ${conditionalStyle ? conditionalStyle.style : ''}`}
                        onClick={() =>
                          (header.onClick && header.onClick(row[header.target])) ||
                          (header.showInModal &&
                            row[header.target] &&
                            seeDescription({ info: row[header.target], label: header.label }))
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
                        {header.function
                          ? header.function(row[header.target])
                          : row[header.target] || row[header.label.toLowerCase().replace(' ', '_')]}
                        {header.action && (
                          <span>
                            {header.action.map((action, actionIndex) => (
                              <button
                                key={actionIndex}
                                onClick={() => action.onClick(row)}
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
        <div className={`mt-4 flex justify-end ${paginationClass}`}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`mx-2 rounded px-3 py-1 ${paginationBtnClass}
              ${currentPage === index + 1 ? paginationBtnColor || 'bg-gray-300' : `${paginationBtnColor ? `${paginationBtnColor}/50` : 'bg-gray-300/50'}`}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
      {enablePagination && !dataPerPage && (
        <p className="py-3 text-center text-pRed">please define ~data per page~</p>
      )}

      <DetailsModal
        loading={false}
        modalOpen={detailsModal}
        setModalOpen={setDetailsModal}
        title={details.label || 'Details'}
        data={details.info}
      />
    </div>
  );
};

export default CustomTable;
