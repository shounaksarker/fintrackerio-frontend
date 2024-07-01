import { INCOME_DISTRIBUTION_URL } from '@/helpers/backend/endpoints';
import apiRequest from '@/helpers/backend/apiRequest';
import { getJwtToken } from '@/helpers/backend/getJwtToken';

export const POST = async (req) => {
  try {
    const token = await getJwtToken();
    const dateRange = await req.json();
    const response = await apiRequest('post', INCOME_DISTRIBUTION_URL, { token }, dateRange);

    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};
