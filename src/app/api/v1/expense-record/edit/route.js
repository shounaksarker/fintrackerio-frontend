import apiRequest from '@/helpers/backend/apiRequest';
import { EDIT_EXPENSE_RECORD_URL } from '@/helpers/backend/endpoints';
import { getJwtToken } from '@/helpers/backend/getJwtToken';

export const PUT = async (req) => {
  const { record_id, expense_category_id, spend_on, terminal_id, amount, date, description } =
    await req.json();
  const expenseDetails = {
    record_id,
    expense_category_id,
    spend_on,
    terminal_id,
    amount,
    date: new Date(date),
    description,
  };
  try {
    const token = await getJwtToken();
    const response = await apiRequest('put', EDIT_EXPENSE_RECORD_URL, { token }, expenseDetails);

    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};
