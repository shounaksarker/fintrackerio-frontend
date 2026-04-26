import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import cross from '@/assets/svg/x-1.svg';

const afterCloseFunction = () => {};

const Modal = ({
  isOpen,
  setIsOpen,
  showCloseButton,
  children,
  className,
  afterClose = afterCloseFunction,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    afterClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[1000] flex min-h-dvh items-center justify-center overflow-y-auto bg-gray-950/70 p-3 backdrop-blur-sm transition-all"
    >
      <div
        className={`app-surface relative w-full max-w-md rounded-2xl p-2 text-finance-ink ${className || ''}`}
      >
        {showCloseButton && (
          <button
            className="absolute right-2 top-2 rounded-full bg-white/80 p-1 text-gray-600 shadow-sm transition hover:bg-finance-panel hover:text-gray-800"
            onClick={handleClose}
          >
            <Image src={cross} alt="cross-btn" />
          </button>
        )}
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
