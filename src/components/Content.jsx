'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { AUTH_PATH } from '@/assets/constants/conditionalPath';

const Content = ({ children }) => {
  const pathName = usePathname();
  const isAuthPage = AUTH_PATH.includes(pathName);

  return (
    <div
      className={`${!isAuthPage ? 'flex w-full flex-col gap-y-6 lg:w-3/4 xl:w-4/5 2xl:w-[83%]' : 'w-full'}`}
    >
      <Header />
      <div className="min-h-[calc(100vh-9.7rem)] px-2">{children}</div>
      <footer className="bottom-0 mt-2 flex w-full items-center justify-between bg-gray-900 p-2 text-xs text-white md:text-sm">
        <Link target="_blank" href={'https://ssraj.vercel.app'} className="italic hover:text-pest">
          &copy; Shounak
        </Link>
        <a
          href="https://www.supportkori.com/shounak"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-x-2 rounded-lg bg-[#FFDD00] p-1 text-xs font-semibold text-black transition-colors hover:bg-[#e6c800] md:text-sm"
        >
          ☕ Support
        </a>
        <a className="text-xs hover:text-pest md:text-sm" href="mailto:fin.tracker.io@gmail.com">
          Mail: fin.tracker.io@gmail.com
        </a>
      </footer>
    </div>
  );
};

export default Content;
