import apiRequest from '@/helpers/backend/apiRequest';
import { SEED_DEMO_DATA_URL } from '@/helpers/backend/endpoints';
import { getJwtToken } from '@/helpers/backend/getJwtToken';

export const POST = async () => {
  try {
    const token = await getJwtToken();
    const response = await apiRequest('post', SEED_DEMO_DATA_URL, { token });
    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};

export const DELETE = async () => {
  try {
    const token = await getJwtToken();
    const response = await apiRequest('delete', SEED_DEMO_DATA_URL, { token });
    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};
