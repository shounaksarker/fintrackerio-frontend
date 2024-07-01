const axios = require('axios');

const apiRequest = async (method, url, headers = {}, data = {}) => {
  try {
    const response = await axios({
      method,
      url,
      headers,
      data,
    });
    return response;
  } catch (error) {
    return { sucess: false, error: error.response.data };
  }
};
export default apiRequest;
