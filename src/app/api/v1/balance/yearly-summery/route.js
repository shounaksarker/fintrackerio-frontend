import { GET_YEARLY_SUMMERY_URL } from '@/helpers/backend/endpoints';
import apiRequest from '@/helpers/backend/apiRequest';
import { getJwtToken } from '@/helpers/backend/getJwtToken';

export const POST = async (req) => {
  const year = await req.json();
  try {
    const token = await getJwtToken();
    const response = await apiRequest('post', GET_YEARLY_SUMMERY_URL, { token }, year);

    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};
