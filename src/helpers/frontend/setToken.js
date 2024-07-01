'use server';

import { cookies } from 'next/headers';
import { TOKEN_EXPIRED_DAY } from '@/assets/constants';

export const setToken = (name, value, options = {}) => {
  cookies().set(name, value, {
    secure: options.secure || true,
    httpOnly: options.httpOnly || true,
    expires: options.expires || Date.now() + 24 * 60 * 60 * 1000 * TOKEN_EXPIRED_DAY,
    path: options.path || '/',
    sameSite: options.sameSite || 'strict',
    ...options,
  });
};
