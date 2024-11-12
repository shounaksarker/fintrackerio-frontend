import apiRequest from '@/helpers/backend/apiRequest';
import { TRANSFER_TO_NEXT_URL, SET_AUTO_TRANSFER_URL } from '@/helpers/backend/endpoints';
import { getJwtToken } from '@/helpers/backend/getJwtToken';

export const POST = async (req) => {
  try {
    const token = await getJwtToken();
    const transferDetails = await req.json();

    const payload = {
      from: transferDetails.from,
      to: transferDetails.to,
      expenseDate: transferDetails.expenseDate,
      incomeDate: transferDetails.incomeDate,
    };

    const option_on = { ...transferDetails.options, is_this_month_done: 1 };
    const option_off = { ...transferDetails.options, is_this_month_done: 0 };

    const updateResponse = await apiRequest(
      'patch',
      SET_AUTO_TRANSFER_URL,
      { token },
      { options: option_on }
    );

    if (updateResponse.error) {
      return Response.json(updateResponse.error);
    }

    const response = await apiRequest('post', TRANSFER_TO_NEXT_URL, { token }, payload);
    if (response.error) {
      await apiRequest('patch', SET_AUTO_TRANSFER_URL, { token }, { options: option_off });
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};
