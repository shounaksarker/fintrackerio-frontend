'use client';

import '@/styles/onOffToggle.css';

const OnOffToggle = ({ checked, onChange = () => {} }) => {
  const handleClick = () => {
    onChange();
  };
  return (
    <div className="px-4">
      <label className="switch">
        <input onChange={handleClick} checked={checked} type="checkbox" className="toggle" />
        <span className="slider"></span>
        <span className="card-side"></span>
      </label>
    </div>
  );
};

export default OnOffToggle;
