'use client';

import React, { useState, useTransition } from 'react';
import demoLoginAction from '@/app/login/demoLoginAction';
import { ENVIRONMENT } from '@/assets/constants';

const DemoLoginButton = () => {
  const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === ENVIRONMENT.PRODUCTION;
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  if (isProduction) return null;

  const handleDemoLogin = () => {
    setError('');
    startTransition(async () => {
      const result = await demoLoginAction();
      if (result) {
        setError(result);
      }
    });
  };

  return (
    <div className="flex flex-col items-center gap-y-3">
      {error && (
        <p className="w-[350px] rounded-md bg-pRed p-2 text-center text-sm text-white md:mx-auto md:w-[320px]">
          {error}
        </p>
      )}
      <button
        type="button"
        onClick={handleDemoLogin}
        disabled={isPending}
        className="flex w-[350px] items-center justify-center gap-x-2 rounded bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition duration-300 hover:from-amber-600 hover:to-orange-600 disabled:opacity-70 md:w-full"
      >
        {isPending ? (
          <>
            <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Starting demo...
          </>
        ) : (
          <>🚀 Try Demo</>
        )}
      </button>
      <p className="text-xs text-phGray">Explore the app with a test account — no signup needed</p>
    </div>
  );
};

export default DemoLoginButton;
