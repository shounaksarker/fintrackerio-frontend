'use client';

import axios from 'axios';
import { SENTRY_LOG_URL } from '@/helpers/frontend/apiEndpoints';

/**
 * Global frontend error catcher.
 * 1. Axios response interceptor — captures all API errors (4xx/5xx)
 * 2. window.onerror — captures uncaught JS errors (e.g. TypeError in event handlers)
 * 3. unhandledrejection — captures unhandled promise rejections
 *
 * Import this file once in MainLayout to activate.
 */

let initialized = false;

// Simple dedup: skip if same message was logged within 5 seconds
const recentErrors = new Map();
const isDuplicate = (msg) => {
  const now = Date.now();
  if (recentErrors.has(msg) && now - recentErrors.get(msg) < 5000) return true;
  recentErrors.set(msg, now);
  return false;
};

const logToSentry = (payload) => {
  try {
    axios.post(SENTRY_LOG_URL, payload).catch(() => {});
  } catch {
    // fail silently
  }
};

const initSentryInterceptor = () => {
  if (initialized) return;
  initialized = true;

  // 1. Axios response interceptor — API errors
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      try {
        const req = error?.config;
        const msg = error?.message || 'Unknown frontend API error';
        if (!isDuplicate(msg)) {
          logToSentry({
            source: 'frontend',
            method: req?.method?.toUpperCase() || 'UNKNOWN',
            url: req?.url || window?.location?.pathname || '',
            statusCode: error?.response?.status || 0,
            message: msg,
            stack: error?.stack || '',
            payload: error?.response?.data || null,
            userAgent: navigator?.userAgent || '',
          });
        }
      } catch {
        // fail silently
      }
      return Promise.reject(error);
    }
  );

  // 2. window.onerror — uncaught JS errors
  if (typeof window !== 'undefined') {
    window.onerror = (message, source, lineno, colno, error) => {
      const msg = String(message);
      if (isDuplicate(msg)) return;
      logToSentry({
        source: 'frontend',
        level: 'high',
        method: 'JS_ERROR',
        url: window.location.pathname,
        statusCode: 0,
        message: msg,
        stack: error?.stack || `${source}:${lineno}:${colno}`,
        userAgent: navigator?.userAgent || '',
      });
    };

    // 3. unhandledrejection — unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      const error = event.reason;
      const msg = error?.message || String(error) || 'Unhandled promise rejection';
      if (isDuplicate(msg)) return;
      logToSentry({
        source: 'frontend',
        level: 'high',
        method: 'UNHANDLED_PROMISE',
        url: window.location.pathname,
        statusCode: 0,
        message: msg,
        stack: error?.stack || '',
        userAgent: navigator?.userAgent || '',
      });
    });
  }
};

export default initSentryInterceptor;
