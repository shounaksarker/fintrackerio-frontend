import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

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
  const [mounted, setMounted] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const wrapperRef = useRef(null);

  const src = selected && (typeof selected === 'string' ? selected : selected[optionLabel]);

  const updateDropdownPosition = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    const spaceBelow = window.innerHeight - rect.bottom;
    const dropdownHeight = Math.min(260, Math.max(120, options.length * 42 + 10));
    const shouldOpenUp = spaceBelow < dropdownHeight + 12 && rect.top > spaceBelow;
    const top = shouldOpenUp ? Math.max(12, rect.top - dropdownHeight - 8) : rect.bottom + 8;

    setDropdownStyle({
      left: `${rect.left}px`,
      top: `${top}px`,
      width: `${rect.width}px`,
      maxHeight: `${Math.min(dropdownHeight, shouldOpenUp ? rect.top - 20 : spaceBelow - 20)}px`,
    });
  };

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onChange?.(option[optionLabel].src);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    updateDropdownPosition();

    const handleClickOutside = (event) => {
      if (!wrapperRef.current?.contains(event.target) && !dropdownRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', updateDropdownPosition);
    window.addEventListener('scroll', updateDropdownPosition, true);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', updateDropdownPosition);
      window.removeEventListener('scroll', updateDropdownPosition, true);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, options.length]);

  return (
    <div className={`mb-4 ${className || ''}`} ref={wrapperRef}>
      {label && (
        <label
          className={`${labelClass || ''} mb-2 block text-[13px] font-bold tracking-wide text-finance-muted`}
        >
          {label}
        </label>
      )}
      <button
        ref={buttonRef}
        type="button"
        className={`custom-border flex min-h-11 w-full items-center justify-between gap-2 rounded-xl px-3 text-left text-sm font-medium capitalize text-finance-ink focus:border-pest focus:ring-2 focus:ring-pest/15 ${selected ? 'py-1.5' : 'py-2.5'} ${selectClass || ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selected ? (
          <span className="flex min-w-0 items-center gap-2">
            <Image src={src} alt="icon" width={30} height={30} className="size-7 shrink-0 object-contain" />
            {selected?.name ? <span className="truncate text-sm">{selected.name}</span> : null}
          </span>
        ) : (
          <span className="truncate text-finance-muted/70">{placeholder}</span>
        )}
        <svg
          className={`size-4 shrink-0 text-finance-muted transition ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M5 7l5 5 5-5z" />
        </svg>
      </button>
      {mounted &&
        isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            style={dropdownStyle}
            className="scrollbar-hidden fixed z-[2147483647] overflow-y-auto rounded-2xl border border-finance-border bg-white p-1 shadow-card backdrop-blur-xl"
            role="listbox"
          >
            {options.map((option, index) => (
              <button
                key={`${option.name || 'icon'}-${index}`}
                type="button"
                className="flex w-full cursor-pointer items-center rounded-xl px-3 py-2 text-left text-sm capitalize text-finance-ink transition hover:bg-finance-panel"
                role="option"
                aria-selected={selected === option}
                onClick={() => handleSelect(option)}
              >
                <Image
                  src={optionLabel ? option[optionLabel] : option}
                  alt={`${option.name || ''} icon`}
                  width={26}
                  height={26}
                  className="size-6 shrink-0 object-contain"
                />
                {option.name ? <span className="ml-2 min-w-0 flex-1 truncate">{option.name}</span> : ''}
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
};

export default IconSelect;
