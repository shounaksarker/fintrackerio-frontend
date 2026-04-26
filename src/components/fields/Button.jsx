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
  loadingText = 'Loading...',
}) => {
  let btnClasses =
    'inline-flex items-center justify-center rounded-lg border px-4 py-2 font-semibold shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pest/20 active:scale-[0.98]';
  if (size === 'small') {
    btnClasses += ' text-sm';
  } else if (size === 'large') {
    btnClasses += ' text-lg';
  } else {
    btnClasses += ' text-base';
  }

  if (color === 'primary') {
    btnClasses +=
      ' border-transparent bg-gradient-to-r from-pest to-finance-teal text-white shadow-glow hover:-translate-y-0.5 hover:from-pest-200 hover:to-pest';
  } else if (color === 'secondary') {
    btnClasses +=
      ' border-finance-border bg-white text-finance-ink hover:-translate-y-0.5 hover:border-pest/40 hover:bg-finance-panel';
  } else if (color === 'danger') {
    btnClasses +=
      ' border-transparent bg-gradient-to-r from-pRed to-finance-orange text-white hover:-translate-y-0.5 hover:from-pRed-200 hover:to-pRed';
  } else {
    btnClasses +=
      ' border-transparent bg-transparent text-finance-muted hover:bg-white/80 hover:text-finance-ink';
  }

  return (
    <button
      type={type}
      className={`disabled:cursor-not-allowed disabled:opacity-70 ${btnClasses} ${className || ''}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <div className="flex items-center gap-x-3">
          <ButtonLoader /> <h1>{loadingText}</h1>
        </div>
      ) : (
        <div className="flex items-center justify-center">
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
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
};

export default Button;
