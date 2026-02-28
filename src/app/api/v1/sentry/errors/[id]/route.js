import { SENTRY_ERRORS_URL } from '@/helpers/backend/endpoints';
import apiRequest from '@/helpers/backend/apiRequest';
import { getJwtToken } from '@/helpers/backend/getJwtToken';

export const GET = async (_, { params }) => {
  try {
    const token = await getJwtToken();
    const { id } = await params;
    const response = await apiRequest('get', `${SENTRY_ERRORS_URL}/${id}`, { token });
    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};

export const PATCH = async (_, { params }) => {
  try {
    const token = await getJwtToken();
    const { id } = await params;
    const response = await apiRequest('patch', `${SENTRY_ERRORS_URL}/${id}`, { token });
    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};
