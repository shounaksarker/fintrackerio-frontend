import * as jose from 'jose';
import { getJwtToken } from '@/helpers/backend/getJwtToken';

export const GET = async () => {
  try {
    const token = await getJwtToken();
    if (!token) {
      return Response.json({ error: 'Empty Token' });
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jose.jwtVerify(token, secret);

    if (payload) {
      return Response.json(payload);
    }
    return Response.json({ error: 'Payload error occured.' });
  } catch (error) {
    return Response.json({ error: error.message });
  }
};
