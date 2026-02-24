import { EDIT_RECURRING_URL } from '@/helpers/backend/endpoints';
import apiRequest from '@/helpers/backend/apiRequest';
import { getJwtToken } from '@/helpers/backend/getJwtToken';

export const PUT = async (req, { params }) => {
  const { id } = params;
  const body = await req.json();
  try {
    const token = await getJwtToken();
    const endpoint = EDIT_RECURRING_URL.replace(':id', id);
    const response = await apiRequest('put', endpoint, { token }, body);
    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json({ success: false, msg: error.message });
  }
};
