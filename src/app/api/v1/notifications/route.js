import { GET_NOTIFICATIONS_URL } from '@/helpers/backend/endpoints';
import apiRequest from '@/helpers/backend/apiRequest';
import { getJwtToken } from '@/helpers/backend/getJwtToken';

export const GET = async (req) => {
  try {
    const token = await getJwtToken();
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 20;
    const response = await apiRequest('get', `${GET_NOTIFICATIONS_URL}?page=${page}&limit=${limit}`, {
      token,
    });
    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};
