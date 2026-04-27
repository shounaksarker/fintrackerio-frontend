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
      className="scrollbar-hidden fixed inset-0 z-[1000] flex min-h-dvh items-center justify-center overflow-y-auto bg-gray-950/75 p-3 py-4 backdrop-blur-md transition-all"
    >
      <div
        className={`scrollbar-hidden relative max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-3xl border border-white/80 bg-gradient-to-br from-finance-panel via-white to-pest/10 p-5 text-finance-ink shadow-card ring-1 ring-pest/10 ${className || ''}`}
      >
        {showCloseButton && (
          <button
            className="absolute right-3 top-3 rounded-full border border-finance-border bg-white p-1 text-gray-600 shadow-sm transition hover:bg-pRed/10 hover:text-pRed"
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
