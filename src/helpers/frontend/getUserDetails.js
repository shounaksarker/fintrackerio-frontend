import axios from 'axios';
import { GET_USER } from '@/helpers/frontend/apiEndpoints';

export const getUserDetails = async () => {
  const userFromServer = await axios.get(GET_USER);
  if (userFromServer && !userFromServer.data.error) {
    return userFromServer.data;
  }
};
