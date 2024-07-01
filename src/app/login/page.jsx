'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import InputField from '@/components/fields/Input';
import Eyeoff from '@/assets/svg/Icon/Eyeoff';
import Eyec from '@/assets/svg/Icon/Eye';
import loginAction from './loginAction';
import AuthButton from '@/components/fields/AuthButton';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pswdType, setPswdType] = useState(true);

  const [error, formAction] = useFormState(loginAction, undefined);

  return (
    <div className="flex h-screen w-full items-center justify-center px-2">
      <div className="flex flex-col items-center gap-y-12">
        <h1 className="text-4xl text-pest md:text-5xl">
          <span className="font-bold uppercase">Fin-</span>Tracker.
          <span className="font-bold uppercase">io</span>
        </h1>

        <form action={formAction}>
          <InputField
            name="emailOrPhone"
            className="h-full w-[350px] md:w-[500px]"
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
            className="h-full w-[350px] md:w-[500px]"
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
          {error && (
            <p className="mb-4 w-[350px] rounded-md bg-pRed p-2 text-center text-white md:mx-auto md:w-[320px]">
              Error: {error}
            </p>
          )}
          <AuthButton text="Log in" loadingText="Loging in..." />
        </form>
        <div className="flex items-center">
          <hr className="w-[130px] bg-black/10 md:w-[210px]" />
          <div className="mx-4 uppercase text-phGray">or</div>
          <hr className="w-[130px] bg-black/10 md:w-[210px]" />
        </div>
        <div>
          <span className="text-phGray">Do not have an account? </span>
          <Link href="/signup" className="text-pest hover:text-pest-200">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
