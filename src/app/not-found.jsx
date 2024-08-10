import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import pageNotFound from '@/assets/images/404.jpg';

const NotFound = () => (
  <div className="absolute top-0 z-[999] w-screen bg-white md:min-h-[90vh] lg:w-auto xl:w-[79%]">
    <Link href="/" className="flex w-full items-center justify-center p-4">
      <h1 className="text-2xl text-pest underline underline-offset-8 lg:mb-8 lg:text-5xl">
        <span className="font-bold uppercase">Fin-</span>Tracker.
        <span className="font-bold uppercase">io</span>
      </h1>
    </Link>
    <Link
      href="/"
      className="relative flex h-[600px] w-[300] items-center justify-center md:size-[750px] lg:size-auto"
    >
      <Image src={pageNotFound} alt="404" />
    </Link>
  </div>
);

export default NotFound;
