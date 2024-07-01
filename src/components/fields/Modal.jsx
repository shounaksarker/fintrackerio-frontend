import Image from 'next/image';
import React, { useEffect } from 'react';
import cross from '@/assets/svg/x-1.svg';

const Modal = ({ isOpen, setIsOpen, showCloseButton, children, className }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return isOpen ? (
    <div
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 transition-all`}
    >
      <div className={`relative w-full max-w-md rounded-lg bg-white p-2 ${className || ''}`}>
        {showCloseButton && (
          <button className="absolute right-2 top-2 text-gray-600 hover:text-gray-800" onClick={handleClose}>
            <Image src={cross} alt="cross-btn" />
          </button>
        )}
        <div>{children}</div>
      </div>
    </div>
  ) : null;
};

export default Modal;
