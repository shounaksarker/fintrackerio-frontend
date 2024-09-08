'use client';

import React from 'react';
import PropTypes from 'prop-types';
import '@/styles/loader.css';

const Shimmer = ({ className, shimmerClass }) => {
  return (
    <div className={`shimmer min-h-1 ${shimmerClass}`}>
      <div className="wrapper">
        <div className={`stroke shimmer-animate min-h-1 ${className}`}> </div>
      </div>
    </div>
  );
};

Shimmer.propTypes = {
  className: PropTypes.string,
  shimmerClass: PropTypes.string,
};

export default Shimmer;
