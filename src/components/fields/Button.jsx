'use client';

import React from 'react';
import PropTypes from 'prop-types';
import ButtonLoader from './ButtonLoader';

const Button = ({
  type,
  className,
  size = 'md',
  color = 'primary',
  onClick,
  children,
  iconLeft,
  iconRight,
  iconClass,
  disabled = false,
  loading = false,
}) => {
  let btnClasses = 'flex py-2 px-4 rounded focus:outline-none custom-border transition duration-400';
  if (size === 'small') {
    btnClasses += ' text-sm';
  } else if (size === 'large') {
    btnClasses += ' text-lg';
  } else {
    btnClasses += ' text-base';
  }

  if (color === 'primary') {
    btnClasses += ' bg-pest hover:bg-pest-200 text-white';
  } else if (color === 'secondary') {
    btnClasses += ' bg-white hover:bg-black text-black hover:text-white';
  } else if (color === 'danger') {
    btnClasses += ' bg-pRed hover:bg-pRed-200 text-white hover:text-white';
  } else {
    btnClasses += ' bg-transparent hover:bg-gray-100 text-black';
  }

  return (
    <button
      type={type}
      className={`${btnClasses} ${className || ''}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <div className="flex gap-x-3">
          <ButtonLoader /> <h1>Loading...</h1>
        </div>
      ) : (
        <div className="flex items-center">
          {iconLeft && <span className={`pr-2 ${iconClass || ''}`}>{iconLeft}</span>}
          {children}
          {iconRight && <span className={`pl-2 ${iconClass || ''}`}>{iconRight}</span>}
        </div>
      )}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOf(['small', 'md', 'large']),
  color: PropTypes.oneOf(['primary', 'secondary', 'danger', 'default']),
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  iconClass: PropTypes.string,
  iconLeft: PropTypes.any,
  iconRight: PropTypes.any,
};

export default Button;
