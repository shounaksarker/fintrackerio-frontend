'use client';

import React, { useEffect } from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import Sidebar from './SideBar';
import Content from './Content';
import { SIDEBAR_MENU } from '../assets/constants';
import DataContextProvider from '../context/DataContext';
import SentryErrorBoundary from './sentry/SentryErrorBoundary';
import initSentryInterceptor from '@/helpers/frontend/sentryInterceptor';

const MainLayout = ({ children }) => {
  useEffect(() => {
    initSentryInterceptor();
  }, []);

  return (
    <SentryErrorBoundary>
      <DataContextProvider>
        <div className="flex min-h-screen bg-transparent">
          <Sidebar menu={SIDEBAR_MENU} />
          <Content>{children}</Content>
          <ProgressBar height="4px" color="#299D91" options={{ showSpinner: false }} shallowRouting />
        </div>
      </DataContextProvider>
    </SentryErrorBoundary>
  );
};

export default MainLayout;
