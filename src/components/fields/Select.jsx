import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const SelectOption = ({
  name,
  options = [],
  label,
  onChange,
  value,
  placeholder,
  className,
  labelClass,
  selectClass,
  optionLabel,
  optionValue,
  required,
}) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((option) => String(option[optionValue]) === String(value));

  const updateDropdownPosition = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    const spaceBelow = window.innerHeight - rect.bottom;
    const dropdownHeight = Math.min(240, Math.max(96, options.length * 44 + 10));
    const shouldOpenUp = spaceBelow < dropdownHeight + 12 && rect.top > spaceBelow;
    const top = shouldOpenUp ? Math.max(12, rect.top - dropdownHeight - 8) : rect.bottom + 8;

    setDropdownStyle({
      left: `${rect.left}px`,
      top: `${top}px`,
      width: `${rect.width}px`,
      maxHeight: `${Math.min(dropdownHeight, shouldOpenUp ? rect.top - 20 : spaceBelow - 20)}px`,
    });
  };

  const emitChange = (option) => {
    setOpen(false);
    onChange?.({
      target: {
        name,
        value: option[optionValue],
      },
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    updateDropdownPosition();

    const closeOnOutside = (event) => {
      if (!wrapperRef.current?.contains(event.target) && !dropdownRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    window.addEventListener('resize', updateDropdownPosition);
    window.addEventListener('scroll', updateDropdownPosition, true);
    document.addEventListener('mousedown', closeOnOutside);

    return () => {
      window.removeEventListener('resize', updateDropdownPosition);
      window.removeEventListener('scroll', updateDropdownPosition, true);
      document.removeEventListener('mousedown', closeOnOutside);
    };
  }, [open, options.length]);

  return (
    <div className={`mb-4 ${className || ''}`} ref={wrapperRef}>
      {label && (
        <label
          className={`${labelClass || ''} mb-2 block text-[13px] font-bold capitalize tracking-wide text-finance-muted`}
        >
          {label} {required && <sup className="text-red-500">*</sup>}
        </label>
      )}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`custom-border flex min-h-11 w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium capitalize text-finance-ink focus:border-pest focus:ring-2 focus:ring-pest/15 ${selectClass || ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="flex min-w-0 flex-1 items-center gap-2">
          {selectedOption?.icon ? (
            <Image
              src={selectedOption.icon}
              alt=""
              width={24}
              height={24}
              className="size-6 shrink-0 rounded-md object-contain"
            />
          ) : null}
          <span className={`truncate ${selectedOption ? '' : 'text-finance-muted/70'}`}>
            {selectedOption ? selectedOption[optionLabel] : placeholder || 'Select'}
          </span>
        </span>
        <svg
          className={`size-4 shrink-0 text-finance-muted transition ${open ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M5 7l5 5 5-5z" />
        </svg>
      </button>
      {mounted &&
        open &&
        createPortal(
          <div
            ref={dropdownRef}
            style={dropdownStyle}
            className="scrollbar-hidden fixed z-[2147483647] overflow-y-auto rounded-2xl border border-finance-border bg-white p-1 shadow-card backdrop-blur-xl"
            role="listbox"
          >
            {options.map((option, index) => {
              const selected = String(option[optionValue]) === String(value);
              return (
                <button
                  key={`${option[optionValue]}-${index}`}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => emitChange(option)}
                  className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm capitalize transition ${
                    selected
                      ? 'bg-pest/15 font-semibold text-pest'
                      : 'text-finance-ink hover:bg-finance-panel'
                  }`}
                >
                  {option.icon ? (
                    <Image
                      src={option.icon}
                      alt=""
                      width={24}
                      height={24}
                      className="size-6 shrink-0 rounded-md object-contain"
                    />
                  ) : null}
                  <span className="min-w-0 flex-1 truncate">{option[optionLabel]}</span>
                </button>
              );
            })}
          </div>,
          document.body
        )}
    </div>
  );
};

SelectOption.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  labelClass: PropTypes.string,
  selectClass: PropTypes.string,
  optionLabel: PropTypes.any,
  optionValue: PropTypes.any,
};

export default SelectOption;
