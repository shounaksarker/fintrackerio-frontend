'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import InputField from '@/components/fields/Input';
import Button from '@/components/fields/Button';
import { RESET_EMAIL_SEND_URL, RESET_PASSWORD_URL } from '@/helpers/frontend/apiEndpoints';
import Eyeoff from '@/assets/svg/Icon/Eyeoff';
import Eyec from '@/assets/svg/Icon/Eye';
import { PASSWORD_TYPE_VALUE, PASSWORD_VALUE } from '@/assets/constants/stateValue';
import CriteriaIndicator from '@/components/CriteriaIndicator';
import { PASSWORD_CRITERIA_VALUE } from '@/assets/constants';

const Page = () => {
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState('');

  const [password, setPassword] = useState(PASSWORD_VALUE);
  const [pswdType, setPswdType] = useState(PASSWORD_TYPE_VALUE);
  const [pswdCriteria, setPswdCriteria] = useState(PASSWORD_CRITERIA_VALUE);
  const query = useSearchParams();
  const router = useRouter();

  const handlePassword = (e) => {
    const { value } = e.target;
    setPassword({ ...password, first: value });
    setPswdCriteria({
      length: { ...PASSWORD_CRITERIA_VALUE.length, perfect: value.length >= 8 },
      uppercase: { ...PASSWORD_CRITERIA_VALUE.uppercase, perfect: /[A-Z]/.test(value) },
      lowercase: { ...PASSWORD_CRITERIA_VALUE.lowercase, perfect: /[a-z]/.test(value) },
      number: { ...PASSWORD_CRITERIA_VALUE.number, perfect: /[0-9]/.test(value) },
      specialChar: { ...PASSWORD_CRITERIA_VALUE.specialChar, perfect: /[!@#$%^&*(),.?":{}|<>]/.test(value) },
    });
  };

  useEffect(() => {
    const tokenFromQuery = query.get('token');
    setToken(tokenFromQuery);
  }, [query]);

  const sendResetMail = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    const res = await axios.post(RESET_EMAIL_SEND_URL, { email });
    if (res.data.success) {
      setEmail('');
      setMessage(res.data.msg || 'Recovery email sent');
    } else {
      setMessage(res.data.msg || 'Failed to reset password');
    }
    setLoading(false);
  };

  const submitPasswordReset = async (e) => {
    e.preventDefault();
    setMessage('');
    if (password.first === password.second) {
      setLoading(true);
      const res = await axios.post(RESET_PASSWORD_URL, { token, password: password.first });
      if (res.data.success) {
        setPassword(PASSWORD_VALUE);
        setPswdType(PASSWORD_TYPE_VALUE);
        setPswdCriteria(PASSWORD_CRITERIA_VALUE);
        setMessage(res.data.msg || 'Password Updated');
        router.push('/login');
      } else {
        setMessage(res.data.msg || 'Failed to reset password');
      }
    } else {
      setMessage('Password & Repeated Password should be same.');
    }
    setLoading(false);
  };
  return (
    <div className="auth-shell">
      <div className="auth-wrap max-w-4xl lg:grid-cols-[0.85fr_1.15fr]">
        <div className="auth-brand-panel">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(249,115,22,0.32),transparent_20rem),radial-gradient(circle_at_82%_24%,rgba(20,184,166,0.32),transparent_18rem)]" />
          <div className="relative">
            <Link
              href={'/'}
              className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pest via-finance-accent to-finance-pink text-2xl font-black shadow-glow"
            >
              F
            </Link>
            <h1 className="mt-6 text-4xl font-black tracking-tight">Account Recovery</h1>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/60">
              Reset your password securely and get back to your financial workspace.
            </p>
          </div>
        </div>

        <div className="auth-form-panel">
          <div className="mb-8 text-center lg:text-left">
            <Link href={'/'} className="auth-logo lg:hidden">
              <span className="uppercase">Fin-</span>Tracker.io
            </Link>
            <h2 className="auth-card-title mt-5 lg:mt-0">{token ? 'Reset Password' : 'Recover Access'}</h2>
            <p className="auth-card-subtitle">
              {token ? 'Enter a new password for your account.' : 'Send a password reset link to your email.'}
            </p>
          </div>
          {token ? (
            <form onSubmit={submitPasswordReset} className="mx-auto w-full max-w-md">
              <InputField
                name="password"
                className="w-full"
                type={`${pswdType.first ? 'password' : 'text'}`}
                label="Password"
                onChange={handlePassword}
                value={password.first}
                placeholder="Enter Your Passsword"
                labelClass="font-normal"
                inputClass="placeholder:text-xs border-2"
                iconRight={pswdType.first ? <Eyeoff /> : <Eyec />}
                iconFunction={() => setPswdType({ ...pswdType, first: !pswdType.first })}
                required
              />
              {password.first && <CriteriaIndicator data={pswdCriteria} className="mb-4" />}
              <InputField
                name="repeatedPassword"
                className="w-full"
                type={`${pswdType.second ? 'password' : 'text'}`}
                label="Repeated Password"
                onChange={(e) => setPassword({ ...password, second: e.target.value })}
                value={password.second}
                placeholder="Repeat Your Passsword"
                labelClass="font-normal"
                inputClass={`placeholder:text-xs border-2 ${password.first !== password.second ? 'text-pRed' : ''}`}
                iconRight={pswdType.second ? <Eyeoff /> : <Eyec />}
                iconFunction={() => setPswdType({ ...pswdType, second: !pswdType.second })}
                required
              />
              <Button type="submit" className="flex w-full justify-center" loading={loading}>
                Submit
              </Button>
            </form>
          ) : (
            <form onSubmit={sendResetMail} className="mx-auto w-full max-w-md">
              <InputField
                name="email"
                className="w-full"
                type="email"
                label="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter Your Email"
                labelClass="font-normal"
                iconClass=""
                inputClass="placeholder:text-xs border-2"
                required
              />
              <Button type="submit" className="flex w-full justify-center" loading={loading}>
                Submit
              </Button>
            </form>
          )}
          {message && (
            <p className="mx-auto mt-4 w-full max-w-md rounded-xl bg-pRed p-2 text-center text-white">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
