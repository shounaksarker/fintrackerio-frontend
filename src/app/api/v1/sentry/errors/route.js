import { SENTRY_ERRORS_URL } from '@/helpers/backend/endpoints';
import apiRequest from '@/helpers/backend/apiRequest';
import { getJwtToken } from '@/helpers/backend/getJwtToken';

export const GET = async (req) => {
  try {
    const token = await getJwtToken();
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page') || 1;
    const limit = searchParams.get('limit') || 25;
    const source = searchParams.get('source') || '';
    const level = searchParams.get('level') || '';
    const status = searchParams.get('status') || '';
    const search = searchParams.get('search') || '';
    const qs = `?page=${page}&limit=${limit}&source=${source}&level=${level}&status=${status}&search=${search}`;
    const response = await apiRequest('get', `${SENTRY_ERRORS_URL}${qs}`, { token });
    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};
