'use server';

import axios from 'axios';
import { permanentRedirect } from 'next/navigation';
import { SIGNUP_URL } from '@/helpers/frontend/apiEndpoints';
import { TOKEN } from '@/assets/constants';
import { setToken } from '@/helpers/frontend/setToken';
import { notification } from '@/components/notification';

const signupAction = async (currentState, formData) => {
  const username = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const phone = formData.get('mobile');
  let res;
  try {
    res = await axios.post(`${process.env.CLIENT_URL}${SIGNUP_URL}`, {
      username,
      email,
      password,
      phone,
    });
  } catch (err) {
    notification('Signup Failed', { type: 'error' });
  }
  if (res.data.success) {
    setToken(TOKEN, res.data.token);
    permanentRedirect(`${process.env.CLIENT_URL}/`);
  } else {
    return (
      (typeof res.data.error === 'object' ? res.data.error.msg : res.data.error) ||
      'Error Occured while Signing up'
    );
  }
};

export default signupAction;
