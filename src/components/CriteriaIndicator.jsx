import React from 'react';

const Criteria = ({ isValid, text }) => (
  <div className={`flex items-center gap-1 ${isValid ? 'text-green-500' : 'text-red-500'}`}>
    <div className={`size-2 rounded-full ${isValid ? 'bg-green-500' : 'bg-red-500'}`}></div>
    <span className="w-full text-xs">{text}</span>
  </div>
);

const CriteriaIndicator = ({ data = {}, className = '' }) => {
  return (
    <div className={`mt-2 flex  flex-wrap gap-x-4 ${className}`}>
      {Object.keys(data).map((d, i) => (
        <Criteria key={i} isValid={data[d].perfect} text={data[d].text} />
      ))}
    </div>
  );
};

export default CriteriaIndicator;
