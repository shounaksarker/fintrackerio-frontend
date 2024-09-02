import React from 'react';
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
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className={`mb-2 block text-sm font-bold text-gray-700 ${labelClass}`}>
          {label} {required && <sup className="text-red-500">*</sup>}
        </label>
      )}
      <div className="relative">
        <select
          style={{ appearance: 'none' }}
          value={value}
          name={name}
          onChange={onChange}
          className={`custom-border w-full px-3 py-2 capitalize ${selectClass}`}
          required={required}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option, index) => (
            <option key={index} value={option[optionValue]}>
              {option[optionLabel]}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="size-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M5 7l5 5 5-5z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

SelectOption.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  labelClass: PropTypes.string,
  selectClass: PropTypes.string,
  optionLabel: PropTypes.any,
  optionValue: PropTypes.any,
};

export default SelectOption;
