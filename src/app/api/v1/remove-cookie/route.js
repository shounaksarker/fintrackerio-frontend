import { cookies } from 'next/headers';
import { TOKEN } from '@/assets/constants';

export const GET = async () => {
  try {
    cookies().delete(TOKEN);
    return Response.json({ success: true, msg: 'cookie removed.' });
  } catch (error) {
    return Response.json({ error: error.message });
  }
};
