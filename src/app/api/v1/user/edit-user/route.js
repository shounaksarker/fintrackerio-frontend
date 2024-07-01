import apiRequest from '@/helpers/backend/apiRequest';
import { EDIT_USER_URL } from '@/helpers/backend/endpoints';
import { getJwtToken } from '@/helpers/backend/getJwtToken';
import { validateEmail } from '@/helpers/validation';

export const PUT = async (request) => {
  const body = await request.json();
  const { email } = body;

  if (email && !validateEmail(email)) {
    return Response.json({
      msg: 'Invalid email',
      status: 400,
      success: false,
    });
  }
  try {
    const token = await getJwtToken();
    const response = await apiRequest('put', EDIT_USER_URL, { token }, body);
    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};
