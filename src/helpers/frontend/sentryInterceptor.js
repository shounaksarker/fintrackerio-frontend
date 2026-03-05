'use client';

import axios from 'axios';
import { SENTRY_LOG_URL } from '@/helpers/frontend/apiEndpoints';

/**
 * Global Axios response interceptor.
 * Silently reports all API errors (4xx/5xx) to the sentry log endpoint.
 * Import this file once in your root layout or MainLayout to activate.
 */

let initialized = false;

const initSentryInterceptor = () => {
  if (initialized) return;
  initialized = true;

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      try {
        const req = error?.config;
        axios
          .post(SENTRY_LOG_URL, {
            source: 'frontend',
            method: req?.method?.toUpperCase() || 'UNKNOWN',
            url: req?.url || window?.location?.pathname || '',
            statusCode: error?.response?.status || 0,
            message: error?.message || 'Unknown frontend API error',
            stack: error?.stack || '',
            payload: error?.response?.data || null,
            userAgent: navigator?.userAgent || '',
          })
          .catch(() => {});
      } catch {
        // fail silently
      }
      return Promise.reject(error);
    }
  );
};

export default initSentryInterceptor;
