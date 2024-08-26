import apiRequest from '@/helpers/backend/apiRequest';
import { DELETE_EXPENSE_RECORD_URL } from '@/helpers/backend/endpoints';
import { getJwtToken } from '@/helpers/backend/getJwtToken';

export const DELETE = async (req) => {
  const { searchParams } = req.nextUrl;
  const id = searchParams.get('record_id');
  try {
    const token = await getJwtToken();
    const response = await apiRequest('delete', `${DELETE_EXPENSE_RECORD_URL}?record_id=${id}`, { token });

    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};
