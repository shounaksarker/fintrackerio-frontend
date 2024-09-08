'use client';

import React from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import Sidebar from './SideBar';
import Content from './Content';
import { SIDEBAR_MENU } from '../assets/constants';
import DataContextProvider from '../context/DataContext';

const MainLayout = ({ children }) => {
  return (
    <DataContextProvider>
      <div className="flex">
        <Sidebar menu={SIDEBAR_MENU} />
        <Content>{children}</Content>
        <ProgressBar height="6px" color="#299D91" options={{ showSpinner: false }} shallowRouting />
      </div>
    </DataContextProvider>
  );
};

export default MainLayout;
