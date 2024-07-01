import apiRequest from '@/helpers/backend/apiRequest';
import { RESET_PASSWORD_URL } from '@/helpers/backend/endpoints';
import { validatePassword } from '@/helpers/validation';

export const POST = async (request) => {
  const body = await request.json();
  const { token, password } = body;
  try {
    if (!token || !password) {
      return Response.json({
        msg: 'Token and Password is required',
        status: 400,
        success: false,
      });
    }
    if (!validatePassword(password)) {
      return Response.json({
        msg: 'Password should be Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
        status: 400,
        success: false,
      });
    }
    const response = await apiRequest('post', RESET_PASSWORD_URL, {}, { token, password });
    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};
