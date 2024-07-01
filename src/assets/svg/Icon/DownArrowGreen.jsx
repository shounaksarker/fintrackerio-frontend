import React from 'react';

const DownArrowGreen = ({ width, height, color }) => {
  return (
    <svg
      width={width || '16'}
      height={height || '16'}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 2.33301V11.6663"
        stroke={color || '#71EF9C'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.6663 7L7.99967 11.6667L3.33301 7"
        stroke={color || '#71EF9C'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DownArrowGreen;
