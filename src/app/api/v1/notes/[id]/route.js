import { SINGLE_NOTE_URL } from '@/helpers/backend/endpoints';
import apiRequest from '@/helpers/backend/apiRequest';
import { getJwtToken } from '@/helpers/backend/getJwtToken';

export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    const token = await getJwtToken();
    const response = await apiRequest('get', SINGLE_NOTE_URL.replace(':id', id), { token });

    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};

export const PUT = async (req, { params }) => {
  const { id } = params;
  const editedDetails = await req.json();
  try {
    const token = await getJwtToken();
    const response = await apiRequest('put', SINGLE_NOTE_URL.replace(':id', id), { token }, editedDetails);

    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};

export const DELETE = async (req, { params }) => {
  const { id } = params;
  try {
    const token = await getJwtToken();
    const response = await apiRequest('delete', SINGLE_NOTE_URL.replace(':id', id), { token });

    if (response.error) {
      return Response.json(response.error);
    }
    return Response.json(response.data);
  } catch (error) {
    return Response.json(error.message);
  }
};
