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
    <div className="flex h-screen w-full items-center justify-center px-2">
      <div className="flex flex-col items-center gap-y-12">
        <h1 className="text-4xl text-pest md:text-5xl">
          <span className="font-bold uppercase">Fin-</span>Tracker.
          <span className="font-bold uppercase">io</span>
        </h1>

        <form action={formAction}>
          <InputField
            name="name"
            className="h-full w-[350px] md:w-[500px]"
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
            className="h-full w-[350px] md:w-[500px]"
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
            className="h-full w-[350px] md:w-[500px]"
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
            className="h-full w-[350px] md:w-[500px]"
            label="Mobile No."
            onChange={(e) => handleUserData(e)}
            value={user.mobile}
            placeholder="Enter Your Mobile Number (optional)"
            labelClass="font-normal"
            inputClass="placeholder:text-xs border-2"
          />
          {error && (
            <p className="mb-4 w-[350px] rounded-md bg-pRed p-2 text-center text-white md:mx-auto md:w-[320px]">
              {error}
            </p>
          )}
          <AuthButton text="Sign up" loadingText="Signing Up" />
        </form>
        <div className="flex items-center">
          <hr className="w-[130px] bg-black/10 md:w-[210px]" />
          <div className="mx-4 uppercase text-phGray">or</div>
          <hr className="w-[130px] bg-black/10 md:w-[210px]" />
        </div>
        <div>
          <span className="text-phGray">Already have an account? </span>
          <Link href="/login" className="text-pest hover:text-pest-200">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
