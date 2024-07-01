import apiRequest from '@/helpers/backend/apiRequest';
import { RESET_EMAIL_SEND_URL } from '@/helpers/backend/endpoints';
import { validateEmail } from '@/helpers/validation';

export const POST = async (request) => {
  const body = await request.json();
  const { email } = body;
  try {
    if (!email || (email && !validateEmail(email))) {
      return Response.json({
        msg: 'Invalid email',
        status: 400,
        success: false,
      });
    }
    const response = await apiRequest('post', RESET_EMAIL_SEND_URL, {}, { email });
    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};
