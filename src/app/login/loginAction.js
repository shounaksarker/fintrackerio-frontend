'use server';

import axios from 'axios';
import { permanentRedirect } from 'next/navigation';
import { LOGIN_URL } from '@/helpers/frontend/apiEndpoints';
import { TOKEN } from '@/assets/constants';
import { setToken } from '@/helpers/frontend/setToken';
import { notification } from '@/components/notification';

const loginAction = async (currentState, formData) => {
  const emailOrPhone = formData.get('emailOrPhone');
  const password = formData.get('password');
  let res;
  try {
    res = await axios.post(`${process.env.CLIENT_URL}${LOGIN_URL}`, {
      emailOrPhone,
      password,
    });
  } catch (err) {
    notification('Login Failed', { type: 'error' });
  }
  if (res.data.success) {
    setToken(TOKEN, res.data.token);
    permanentRedirect(`${process.env.CLIENT_URL}/`);
  } else {
    return (typeof res.data === 'object' ? res.data.msg : res.data.error) || 'Error Occured while Logging in';
  }
};

export default loginAction;
