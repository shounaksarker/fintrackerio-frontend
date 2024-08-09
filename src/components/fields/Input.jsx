'use client';

import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({
  type,
  name,
  id,
  label,
  iconLeft,
  iconRight,
  onChange,
  value,
  placeholder,
  className,
  labelClass,
  iconClass,
  inputClass,
  iconFunction,
  step,
  max,
  min,
  required = false,
  autoComplete = false,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className={`mb-2 block text-sm font-bold text-gray-700 ${labelClass}`}>
          {label} {required && <sup className="text-[10px] text-slate-500">*</sup>}
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
        <input
          name={name}
          id={id}
          autoComplete={autoComplete.toString()}
          type={type}
          step={step}
          placeholder={placeholder}
          value={value || ''}
          required={required}
          onChange={onChange}
          max={max}
          min={min}
          className={`custom-border w-full px-3 py-2 focus:border-[#b7bbc1] ${iconLeft ? 'pl-10' : ''} ${iconRight ? 'pr-10' : ''} ${inputClass}`}
        />
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

InputField.propTypes = {
  type: PropTypes.oneOf([
    'text',
    'password',
    'email',
    'checkbox',
    'date',
    'datetime-local',
    'tel',
    'week',
    'month',
    'number',
  ]),
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
};

export default InputField;
