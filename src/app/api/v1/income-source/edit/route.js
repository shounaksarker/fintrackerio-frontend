import { INCOME_SOURCE_EDIT_URL } from '@/helpers/backend/endpoints';
import apiRequest from '@/helpers/backend/apiRequest';
import { getJwtToken } from '@/helpers/backend/getJwtToken';

export const PUT = async (req) => {
  try {
    const editedDetails = await req.json();
    const token = await getJwtToken();
    const response = await apiRequest('put', INCOME_SOURCE_EDIT_URL, { token }, editedDetails);

    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};
