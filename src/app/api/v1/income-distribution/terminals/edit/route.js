import { EDIT_TERMINAL_URL } from '@/helpers/backend/endpoints';
import apiRequest from '@/helpers/backend/apiRequest';
import { getJwtToken } from '@/helpers/backend/getJwtToken';

export const PUT = async (req) => {
  try {
    const editedDetails = await req.json();
    const token = await getJwtToken();
    if (!editedDetails.terminal_name) {
      return Response.json({
        msg: 'Terminal name is required',
        success: false,
        status: 400,
      });
    }
    const response = await apiRequest('put', EDIT_TERMINAL_URL, { token }, editedDetails);

    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};
