// /api/records/create-income
import { CREATE_INCOME_RECORD_URL } from '@/helpers/backend/endpoints';
import apiRequest from '@/helpers/backend/apiRequest';
import { getJwtToken } from '@/helpers/backend/getJwtToken';

export const POST = async (req) => {
  const body = await req.json();
  try {
    const token = await getJwtToken();
    const response = await apiRequest('post', CREATE_INCOME_RECORD_URL, { token }, body);
    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};
