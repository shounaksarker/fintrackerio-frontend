import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';

const IconSelect = ({
  options = [],
  label,
  optionLabel,
  onChange,
  value,
  placeholder,
  className,
  labelClass,
  selectClass,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option[optionLabel].src);
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen);
  const src = selected && (typeof selected === 'string' ? selected : selected[optionLabel]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`mb-4 ${className}`} ref={dropdownRef}>
      {label && (
        <label className={`mb-2 block text-sm font-semibold text-finance-ink ${labelClass}`}>{label}</label>
      )}
      <div className="relative">
        <button
          type="button"
          className={`custom-border w-full px-3 text-start capitalize text-finance-ink focus:border-pest focus:ring-2 focus:ring-pest/15 ${selected ? 'py-1.5' : 'py-2.5'} ${selectClass}`}
          onClick={toggleDropdown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {selected ? (
            <div className="flex items-center">
              <Image src={src} alt="icon" width={30} height={30} />
            </div>
          ) : (
            <span className="text-finance-muted/70">{placeholder}</span>
          )}
        </button>
        {isOpen && (
          <ul
            className="scrollbar-thin absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-finance-border bg-white shadow-card"
            role="listbox"
          >
            {options.map((option, index) => (
              <li
                key={index}
                className="flex cursor-pointer items-center px-3 py-2 text-finance-ink hover:bg-finance-panel"
                role="option"
                aria-selected={selected === option}
                onClick={() => handleSelect(option)}
              >
                <Image
                  src={optionLabel ? option[optionLabel] : option}
                  alt={`${option.name || ''} icon`}
                  width={25}
                  height={25}
                />
                {option.name ? <span className="ml-2 text-xs">{option.name}</span> : ''}
              </li>
            ))}
          </ul>
        )}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-finance-muted">
          <svg className="size-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M5 7l5 5 5-5z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default IconSelect;
