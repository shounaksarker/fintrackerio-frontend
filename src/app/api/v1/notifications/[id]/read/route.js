import { MARK_NOTIFICATION_READ_URL } from '@/helpers/backend/endpoints';
import apiRequest from '@/helpers/backend/apiRequest';
import { getJwtToken } from '@/helpers/backend/getJwtToken';

export const PUT = async (req, { params }) => {
  const { id } = params;
  try {
    const token = await getJwtToken();
    const endpoint = MARK_NOTIFICATION_READ_URL.replace(':id', id);
    const response = await apiRequest('put', endpoint, { token });
    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json({ success: false, msg: error.message });
  }
};
