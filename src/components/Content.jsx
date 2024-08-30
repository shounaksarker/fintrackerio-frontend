'use client';

import React, { useContext, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { DataContext } from '@/context/DataContext';
import { AUTH_PATH } from '@/assets/constants/conditionalPath';

const Content = ({ children }) => {
  const { getUser } = useContext(DataContext);
  const pathName = usePathname();
  const isAuthPage = AUTH_PATH.includes(pathName);

  useEffect(() => {
    const getUserData = async () => {
      await getUser();
    };
    if (!isAuthPage) {
      getUserData();
    }
  }, []);
  return (
    <div
      className={`${!isAuthPage ? 'flex w-full flex-col gap-y-6 lg:w-3/4 xl:w-[80%] 2xl:w-[83%]' : 'w-full'}`}
    >
      <Header />
      <div className="min-h-[85vh] px-2">{children}</div>
      <footer className="bottom-0 mt-2 flex w-full justify-between bg-gray-900 p-2 text-xs text-white">
        <Link target="_blank" href={'https://ssraj.vercel.app'} className="italic hover:text-pest">
          &copy; Shounak
        </Link>
        <a className="hover:text-pest" href="mailto:fin.tracker.io@gmail.com">
          Mail: fin.tracker.io@gmail.com
        </a>
      </footer>
    </div>
  );
};

export default Content;
