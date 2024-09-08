const axios = require('axios');

const apiRequest = async (method, url, headers, data, params) => {
  try {
    const response = await axios({
      method,
      url,
      headers,
      data,
      params,
    });
    return response;
  } catch (error) {
    return { sucess: false, error: error.response.data };
  }
};
export default apiRequest;
