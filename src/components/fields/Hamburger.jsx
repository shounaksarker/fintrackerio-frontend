import React from 'react';
import '@/styles/hamburger.css';

const Hamburger = ({ checked, onClick }) => {
  return (
    <div className="hamburger" onClick={onClick}>
      <input checked={checked} className="checkbox" type="checkbox" readOnly />
      <svg fill="none" viewBox="0 0 50 50" height="25" width="25">
        <path className="lineTop line" strokeLinecap="round" strokeWidth="4" d="M6 11L44 11"></path>
        <path strokeLinecap="round" strokeWidth="4" d="M6 24H43" className="lineMid line"></path>
        <path strokeLinecap="round" strokeWidth="4" d="M6 37H43" className="lineBottom line"></path>
      </svg>
    </div>
  );
};

export default Hamburger;
