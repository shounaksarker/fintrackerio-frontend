import React from 'react';

const UpArrow = ({ color, weight, height }) => {
  return (
    <svg
      width={weight || '16'}
      height={height || '16'}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <path
        d="M8 12.6663V3.33301"
        stroke={color || '#656575'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      /> */}
      <path
        d="M3.3335 7.99967L8.00016 3.33301L12.6668 7.99967"
        stroke={color || '#656575'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UpArrow;
