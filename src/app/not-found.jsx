import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import pageNotFound from '@/assets/images/404.jpg';

const NotFound = () => (
  <div className="fixed inset-0 z-[999] flex min-h-dvh w-full flex-col overflow-y-auto overflow-x-hidden bg-white">
    <Link href="/" className="flex w-full items-center justify-center p-4">
      <h1 className="text-2xl text-pest underline underline-offset-8 lg:mb-8 lg:text-5xl">
        <span className="font-bold uppercase">Fin-</span>Tracker.
        <span className="font-bold uppercase">io</span>
      </h1>
    </Link>
    <Link href="/" className="relative flex flex-1 items-center justify-center p-4">
      <Image src={pageNotFound} alt="404" className="max-h-[72dvh] w-auto object-contain" />
    </Link>
  </div>
);

export default NotFound;
