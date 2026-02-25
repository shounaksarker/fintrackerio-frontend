import { MARK_ALL_NOTIFICATIONS_READ_URL } from '@/helpers/backend/endpoints';
import apiRequest from '@/helpers/backend/apiRequest';
import { getJwtToken } from '@/helpers/backend/getJwtToken';

export const PUT = async () => {
  try {
    const token = await getJwtToken();
    const response = await apiRequest('put', MARK_ALL_NOTIFICATIONS_READ_URL, { token });
    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json({ success: false, msg: error.message });
  }
};
