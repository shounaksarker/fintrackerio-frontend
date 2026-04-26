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
      className={`${!isAuthPage ? 'flex min-h-screen w-full flex-col gap-y-6 lg:w-3/4 xl:w-4/5 2xl:w-[83%]' : 'min-h-screen w-full'}`}
    >
      <Header />
      <main className="min-h-[calc(100vh-9.7rem)] px-2 pb-4 pt-1 md:px-4 lg:px-6">{children}</main>
      <footer className="mx-2 mb-2 mt-auto flex w-auto flex-col items-center justify-between gap-2 rounded-2xl border border-white/10 bg-gray-950/90 p-3 text-xs text-white shadow-card backdrop-blur md:flex-row md:text-sm lg:mx-6">
        <Link
          target="_blank"
          href={'https://ssraj.vercel.app'}
          className="italic text-white/70 hover:text-pest"
        >
          &copy; Shounak
        </Link>
        <a
          href="https://www.supportkori.com/shounak"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-x-2 rounded-lg bg-[#FFDD00] px-3 py-1 text-xs font-semibold text-black transition-colors hover:bg-[#e6c800] md:text-sm"
        >
          Support
        </a>
        <a
          className="text-xs text-white/70 hover:text-pest md:text-sm"
          href="mailto:fin.tracker.io@gmail.com"
        >
          Mail: fin.tracker.io@gmail.com
        </a>
      </footer>
    </div>
  );
};

export default Content;
