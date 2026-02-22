'use server';

import axios from 'axios';
import { permanentRedirect } from 'next/navigation';
import { LOGIN_URL } from '@/helpers/frontend/apiEndpoints';
import { TOKEN, ENVIRONMENT } from '@/assets/constants';
import { setToken } from '@/helpers/frontend/setToken';

const DEMO_EMAIL = 'testuser@gmail.com';
const DEMO_PASSWORD = 'Testuser@2';

const demoLoginAction = async () => {
  if (process.env.NEXT_PUBLIC_NODE_ENV === ENVIRONMENT.PRODUCTION) {
    return 'Demo login is only available in development environment.';
  }

  let res;
  try {
    res = await axios.post(`${process.env.CLIENT_URL}${LOGIN_URL}`, {
      emailOrPhone: DEMO_EMAIL,
      password: DEMO_PASSWORD,
    });
  } catch (err) {
    return err.response?.data?.error?.message || 'Demo login failed. Please try again.';
  }

  if (res.data?.success) {
    setToken(TOKEN, res?.data?.token);
    permanentRedirect(`${process.env.CLIENT_URL}/`);
  } else {
    return (typeof res?.data === 'object' ? res?.data?.msg : res?.data?.error) || 'Demo login failed.';
  }
};

export default demoLoginAction;
