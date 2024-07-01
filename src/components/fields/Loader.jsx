import React from 'react';
import '@/styles/loader.css';

const Loader = (className) => {
  return (
    <div className={`relative ${className}`}>
      <div className="loader-circle-9">
        Loading
        <span></span>
      </div>
    </div>
  );
};

export default Loader;
