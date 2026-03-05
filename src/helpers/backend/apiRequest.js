import { SENTRY_LOG_URL } from './endpoints';

const axios = require('axios');

const logBffError = (method, url, error) => {
  try {
    axios
      .post(SENTRY_LOG_URL, {
        source: 'bff',
        method: method?.toUpperCase(),
        url,
        statusCode: error?.response?.status || 500,
        message: error?.message || 'BFF request failed',
        stack: error?.stack || '',
        payload: error?.response?.data || null,
      })
      .catch(() => {}); // fire & forget
  } catch {
    // fail silently — error logging should never crash the app
  }
};

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
    logBffError(method, url, error);
    return { sucess: false, error: error.response.data };
  }
};
export default apiRequest;
