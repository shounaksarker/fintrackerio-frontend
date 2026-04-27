'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import InputField from '@/components/fields/Input';
import Eyeoff from '@/assets/svg/Icon/Eyeoff';
import Eyec from '@/assets/svg/Icon/Eye';
import signupAction from './sigunupAction';
import AuthButton from '@/components/fields/AuthButton';
import CriteriaIndicator from '@/components/CriteriaIndicator';
import { PASSWORD_CRITERIA_VALUE } from '@/assets/constants';

const Page = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
  });
  const [pswdType, setPswdType] = useState(true);
  const [pswdCriteria, setPswdCriteria] = useState(PASSWORD_CRITERIA_VALUE);

  const handleUserData = (e) => {
    const { name, value } = e.target;
    const userData = { ...user };
    if (name === 'password') {
      setPswdCriteria({
        length: { ...PASSWORD_CRITERIA_VALUE.length, perfect: value.length >= 8 },
        uppercase: { ...PASSWORD_CRITERIA_VALUE.uppercase, perfect: /[A-Z]/.test(value) },
        lowercase: { ...PASSWORD_CRITERIA_VALUE.lowercase, perfect: /[a-z]/.test(value) },
        number: { ...PASSWORD_CRITERIA_VALUE.number, perfect: /[0-9]/.test(value) },
        specialChar: {
          ...PASSWORD_CRITERIA_VALUE.specialChar,
          perfect: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        },
      });
    }
    userData[name] = value;
    setUser(userData);
  };

  const [error, formAction] = useFormState(signupAction, undefined);

  return (
    <div className="auth-shell">
      <div className="auth-wrap">
        <div className="auth-brand-panel">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_16%,rgba(41,157,145,0.38),transparent_21rem),radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.34),transparent_18rem)]" />
          <div className="relative">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pest via-finance-accent to-finance-pink text-2xl font-black shadow-glow">
              F
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight">Start With Clarity</h1>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/60">
              Build your categories, record your flow, and understand where money moves every month.
            </p>
          </div>
          <div className="relative rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-white/70">
            Create your account, then add income sources and expense categories to unlock the dashboard.
          </div>
        </div>

        <div className="auth-form-panel">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="auth-logo lg:hidden">
              <span className="uppercase">Fin-</span>Tracker.io
            </h1>
            <h2 className="auth-card-title mt-5 lg:mt-0">Create Account</h2>
            <p className="auth-card-subtitle">Set up your personal finance workspace.</p>
          </div>
          <form action={formAction} className="mx-auto w-full max-w-md">
            <InputField
              name="name"
              className="w-full"
              type="text"
              label="Name"
              onChange={(e) => handleUserData(e)}
              value={user.name}
              placeholder="Enter Your Name"
              labelClass="font-normal"
              required
              inputClass="placeholder:text-xs border-2"
            />
            <InputField
              name="email"
              className="w-full"
              type="email"
              label="Email Address"
              onChange={(e) => handleUserData(e)}
              value={user.email}
              placeholder="Enter Your Email"
              labelClass="font-normal"
              required
              inputClass="placeholder:text-xs border-2"
            />
            <InputField
              name="password"
              className="w-full"
              type={`${pswdType ? 'password' : 'text'}`}
              label="Password"
              onChange={(e) => handleUserData(e)}
              value={user.password}
              placeholder="Enter Your Passsword"
              labelClass="font-normal"
              required
              inputClass="placeholder:text-xs border-2"
              iconRight={pswdType ? <Eyeoff /> : <Eyec />}
              iconFunction={() => setPswdType(!pswdType)}
            />
            {user.password && <CriteriaIndicator data={pswdCriteria} className="mb-4" />}
            <InputField
              name="mobile"
              type="number"
              className="w-full"
              label="Mobile No."
              onChange={(e) => handleUserData(e)}
              value={user.mobile}
              placeholder="Enter Your Mobile Number (optional)"
              labelClass="font-normal"
              inputClass="placeholder:text-xs border-2"
            />
            {error && <p className="mb-4 rounded-xl bg-pRed p-2 text-center text-white">{error}</p>}
            <AuthButton text="Sign up" loadingText="Signing Up" />
          </form>
          <div className="mx-auto mt-8 flex w-full max-w-md items-center">
            <hr className="flex-1 bg-black/10" />
            <div className="mx-4 uppercase text-phGray">or</div>
            <hr className="flex-1 bg-black/10" />
          </div>
          <div className="mt-5 text-center">
            <span className="text-phGray">Already have an account? </span>
            <Link href="/login" className="text-pest hover:text-pest-200">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
