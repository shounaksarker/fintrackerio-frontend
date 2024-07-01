import apiRequest from '@/helpers/backend/apiRequest';
import { GET_USER_URL } from '@/helpers/backend/endpoints';
import { getJwtToken } from '@/helpers/backend/getJwtToken';

export const GET = async () => {
  try {
    const token = await getJwtToken();
    const response = await apiRequest('get', GET_USER_URL, { token });
    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};
