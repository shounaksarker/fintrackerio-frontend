'use server';

import { cookies } from 'next/headers';
import { TOKEN } from '@/assets/constants';

export const getJwtToken = () => {
  const cookie = cookies().get(TOKEN);
  return cookie ? cookie.value : null;
};
