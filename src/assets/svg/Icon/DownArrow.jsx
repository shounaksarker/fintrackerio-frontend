import React from 'react';

const DownArrow = ({ color, weight, height }) => {
  return (
    <svg
      width={weight || '16'}
      height={height || '16'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke={color || '#656575'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DownArrow;
