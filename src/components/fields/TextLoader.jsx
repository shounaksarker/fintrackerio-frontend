import React from 'react';
import '@/styles/textLoader.css';

const TextLoader = () => {
  return (
    <div className="loader">
      <div className="load-inner load-one"></div>
      <div className="load-inner load-two"></div>
      <div className="load-inner load-three"></div>
      <span className="text">Loading...</span>
    </div>
  );
};

export default TextLoader;
