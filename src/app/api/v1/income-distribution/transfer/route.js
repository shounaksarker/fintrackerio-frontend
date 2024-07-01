import { INCOME_BALANCE_TRANSFER_URL } from '@/helpers/backend/endpoints';
import apiRequest from '@/helpers/backend/apiRequest';
import { getJwtToken } from '@/helpers/backend/getJwtToken';

export const POST = async (req) => {
  const body = await req.json();

  try {
    const token = await getJwtToken();
    const response = await apiRequest('post', INCOME_BALANCE_TRANSFER_URL, { token }, body);

    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};
