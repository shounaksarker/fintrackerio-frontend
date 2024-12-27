'use client';

import '@/styles/onOffToggle.css';

const OnOffToggle = ({ checked, onChange = () => {} }) => {
  const handleClick = () => {
    onChange();
  };
  return (
    <div>
      <input className="togglesw" type="checkbox" onChange={handleClick} checked={checked} />
    </div>
  );
};

export default OnOffToggle;
