import apiRequest from '@/helpers/backend/apiRequest';
import { LOGIN_URL } from '@/helpers/backend/endpoints';
import { validatePassword } from '@/helpers/validation';

export const POST = async (request) => {
  const body = await request.json();
  const { emailOrPhone, password } = body; // phone also included

  // Validate data
  if (!emailOrPhone) {
    return Response.json({
      msg: 'Email or phone number required',
      status: 400,
      success: false,
    });
  }
  if (!validatePassword(password)) {
    return Response.json({
      msg: 'Invalid password',
      status: 400,
      success: false,
    });
  }

  try {
    const response = await apiRequest('post', LOGIN_URL, {}, body);
    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};
