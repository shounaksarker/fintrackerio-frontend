'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import InputField from '@/components/fields/Input';
import Eyeoff from '@/assets/svg/Icon/Eyeoff';
import Eyec from '@/assets/svg/Icon/Eye';
import loginAction from './loginAction';
import AuthButton from '@/components/fields/AuthButton';
import DemoLoginButton from '@/components/fields/DemoLoginButton';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pswdType, setPswdType] = useState(true);

  const [error, formAction] = useFormState(loginAction, undefined);

  return (
    <div className="auth-shell">
      <div className="auth-wrap">
        <div className="auth-brand-panel">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(124,58,237,0.45),transparent_20rem),radial-gradient(circle_at_82%_28%,rgba(20,184,166,0.34),transparent_18rem)]" />
          <div className="relative">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pest via-finance-accent to-finance-pink text-2xl font-black shadow-glow">
              F
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight">FinTracker.io</h1>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/60">
              Track income, expenses, budgets, wallets, and financial health from one focused workspace.
            </p>
          </div>
          <div className="relative grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-white/50">Monthly clarity</p>
              <p className="mt-2 text-xl font-black">Fast</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-white/50">Budget control</p>
              <p className="mt-2 text-xl font-black">Simple</p>
            </div>
          </div>
        </div>

        <div className="auth-form-panel">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="auth-logo lg:hidden">
              <span className="uppercase">Fin-</span>Tracker.io
            </h1>
            <h2 className="auth-card-title mt-5 lg:mt-0">Welcome Back</h2>
            <p className="auth-card-subtitle">Sign in to continue managing your finances.</p>
          </div>
          <form action={formAction} className="mx-auto w-full max-w-md">
            <InputField
              name="emailOrPhone"
              className="w-full"
              type="text"
              label="Email or Phone"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter Your Email/Phone No."
              labelClass="font-normal"
              inputClass="placeholder:text-xs border-2"
              required
            />
            <InputField
              name="password"
              className="w-full"
              type={`${pswdType ? 'password' : 'text'}`}
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter Your Passsword"
              labelClass="font-normal"
              inputClass="placeholder:text-xs border-2"
              iconRight={pswdType ? <Eyeoff /> : <Eyec />}
              iconFunction={() => setPswdType(!pswdType)}
              required
            />
            <Link href="/reset-password" className="mb-4 flex justify-end text-xs text-pest hover:text-pRed">
              Forget Password
            </Link>
            {error && <p className="mb-4 rounded-xl bg-pRed p-2 text-center text-white">{error}</p>}
            <AuthButton text="Log in" loadingText="Loging in..." />
          </form>
          <div className="mx-auto mt-5 w-full max-w-md">
            <DemoLoginButton />
          </div>
          <div className="mx-auto mt-8 flex w-full max-w-md items-center">
            <hr className="flex-1 bg-black/10" />
            <div className="mx-4 uppercase text-phGray">or</div>
            <hr className="flex-1 bg-black/10" />
          </div>
          <div className="mt-5 text-center">
            <span className="text-phGray">Do not have an account? </span>
            <Link href="/signup" className="text-pest hover:text-pest-200">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
