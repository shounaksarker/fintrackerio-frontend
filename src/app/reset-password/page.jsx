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
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-y-12">
        <Link href={'/'} className="text-4xl text-pest md:text-5xl">
          <span className="font-bold uppercase">Fin-</span>Tracker.
          <span className="font-bold uppercase">io</span>
        </Link>

        {token ? (
          <form onSubmit={submitPasswordReset} className="max-w-[350px] md:max-w-[500px]">
            <InputField
              name="password"
              className="h-full w-[350px] md:w-[500px]"
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
              className="h-full w-[350px] md:w-[500px]"
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
          <form onSubmit={sendResetMail}>
            <InputField
              name="email"
              className="h-full w-[350px] md:w-[500px]"
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
          <p className="mt-4 max-w-[350px] rounded-md bg-pRed p-2 text-center text-white md:mx-auto md:max-w-[500px]">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
