import React from 'react';

const ChevronRight = ({ height, width, color, className }) => {
  return (
    <svg
      width={width || '16'}
      height={height || '16'}
      viewBox={`0 0 ${width || '16'} ${height || '16'}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M6 12L10 8L6 4" stroke={color || '#696969'} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default ChevronRight;
