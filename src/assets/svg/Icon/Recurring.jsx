import React from 'react';

const Recurring = ({ color, width, height }) => {
  return (
    <svg
      width={width || '25'}
      height={height || '25'}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke={color || 'white'}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 32a20 20 0 0 1 34-14" />
      <polyline points="46 10 46 20 36 20" />

      <path d="M52 32a20 20 0 0 1-34 14" />
      <polyline points="18 54 18 44 28 44" />

      <line x1="32" y1="16" x2="32" y2="44" />
      <path d="M38 24c0-3-3-4-6-4s-6 1-6 4 3 4 6 4 6 1 6 4-3 4-6 4-6-1-6-4" />
    </svg>
  );
};

export default Recurring;
