import apiRequest from '@/helpers/backend/apiRequest';
import { EDIT_INCOME_RECORD_URL } from '@/helpers/backend/endpoints';
import { getJwtToken } from '@/helpers/backend/getJwtToken';

export const PUT = async (req) => {
  const { income_record_id, income_category_id, amount, newAmount, date, description } = await req.json();
  const payload = {
    income_record_id,
    income_category_id,
    amount,
    newAmount,
    date: new Date(date),
    description,
  };
  try {
    const token = await getJwtToken();
    const response = await apiRequest('put', EDIT_INCOME_RECORD_URL, { token }, payload);

    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};
