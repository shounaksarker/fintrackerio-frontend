import { CREATE_EXPENSE_RECORD_URL } from '@/helpers/backend/endpoints';
import apiRequest from '@/helpers/backend/apiRequest';
import { getJwtToken } from '@/helpers/backend/getJwtToken';

export const POST = async (req) => {
  let expenseDetails = await req.json();
  expenseDetails = { ...expenseDetails, date: new Date(expenseDetails.date) };
  try {
    const token = await getJwtToken();
    const response = await apiRequest('post', CREATE_EXPENSE_RECORD_URL, { token }, expenseDetails);

    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};
