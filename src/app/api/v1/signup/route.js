import apiRequest from '@/helpers/backend/apiRequest';
import { SIGNUP_URL } from '@/helpers/backend/endpoints';
import { validateEmail, validatePassword } from '@/helpers/validation';

export const POST = async (request) => {
  const body = await request.json();
  const { username, email, password } = body; 

  if (!username) {
    return Response.json({
      error: 'User name is required.',
      status: 400,
      success: false,
    });
  }
  if (!validateEmail(email) && !validatePassword(password)) {
    return Response.json({
      error: 'Invalid email and password',
      status: 400,
      success: false,
    });
  }
  if (!validateEmail(email)) {
    return Response.json({
      error: 'Invalid email',
      status: 400,
      success: false,
    });
  }
  if (!validatePassword(password)) {
    return Response.json({
      error: 'Invalid password',
      status: 400,
      success: false,
    });
  }

  try {
    const response = await apiRequest('post', SIGNUP_URL, {}, body);
    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};
