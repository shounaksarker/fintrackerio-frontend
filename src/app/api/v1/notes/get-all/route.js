import { GET_ALL_NOTES_URL } from '@/helpers/backend/endpoints';
import apiRequest from '@/helpers/backend/apiRequest';
import { getJwtToken } from '@/helpers/backend/getJwtToken';

export const GET = async (req) => {
  const { searchParams } = req.nextUrl;
  const page = searchParams.get('page');
  try {
    const token = await getJwtToken();
    const response = await apiRequest('get', GET_ALL_NOTES_URL, { token }, {}, { page });

    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};
