import React from 'react';

const ArrowRight = ({ color, width, height }) => {
  return (
    <svg
      width={width || '16'}
      height={height || '16'}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.3335 8H12.6668"
        stroke={color || 'white'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 3.33301L12.6667 7.99967L8 12.6663"
        stroke={color || 'white'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowRight;
