'use client';

import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({
  name,
  id,
  label,
  iconLeft,
  iconRight,
  onChange,
  value,
  placeholder,
  rows = '',
  cols = '',
  className,
  labelClass,
  iconClass,
  textareaClass,
  iconFunction,
  required = false,
  autoComplete = false,
  error = null,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className={`mb-2 block text-sm font-bold text-gray-700 ${labelClass}`}>
          {label} {required && <sup className="text-[10px] text-red-500">*</sup>}
        </label>
      )}
      <div className="relative">
        {iconLeft && (
          <span
            onClick={iconFunction}
            className={`absolute inset-y-0 left-0 flex items-center pl-2 ${iconClass}`}
          >
            <i>{iconLeft}</i>
          </span>
        )}
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows.toString()}
          cols={cols.toString()}
          autoComplete={autoComplete.toString()}
          className={`custom-border w-full px-3 py-2 ${iconLeft ? 'pl-10' : ''} ${iconRight ? 'pr-10' : ''} ${error ? '!border-red-600' : 'focus:border-[#b7bbc1]'} ${textareaClass}`}
        />
        {error && <small className="text-[10px] font-semibold text-red-700 md:text-xs">{error}</small>}
        {iconRight && (
          <div
            onClick={iconFunction}
            className={`absolute inset-y-0 right-0 flex items-center pr-2 ${iconClass}`}
          >
            {iconRight}
          </div>
        )}
      </div>
    </div>
  );
};

Textarea.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  iconLeft: PropTypes.element,
  iconRight: PropTypes.any,
  step: PropTypes.any,
  onChange: PropTypes.func,
  iconFunction: PropTypes.func,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  error: PropTypes.string,
};

export default Textarea;
