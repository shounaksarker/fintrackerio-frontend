import apiRequest from '@/helpers/backend/apiRequest';
import { GET_AUTO_TRANSFER_URL, SET_AUTO_TRANSFER_URL } from '@/helpers/backend/endpoints';
import { getJwtToken } from '@/helpers/backend/getJwtToken';

export const GET = async () => {
  try {
    const token = await getJwtToken();
    const response = await apiRequest('get', GET_AUTO_TRANSFER_URL, { token });
    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};

export const PATCH = async (req) => {
  try {
    const editedDetails = await req.json();
    const token = await getJwtToken();
    const response = await apiRequest('patch', SET_AUTO_TRANSFER_URL, { token }, editedDetails);
    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};
