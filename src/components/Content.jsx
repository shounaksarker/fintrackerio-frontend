'use client';

import React, { useContext, useEffect } from 'react';
import { usePathname } from 'next/navigation';
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
      className={`${!isAuthPage ? 'flex w-full flex-col gap-y-6 p-2 lg:w-3/4 xl:w-[80%] 2xl:w-[83%]' : 'w-full'}`}
    >
      <Header />
      {children}
    </div>
  );
};

export default Content;
