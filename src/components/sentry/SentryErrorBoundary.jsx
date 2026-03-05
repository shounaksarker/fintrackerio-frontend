'use client';

import React from 'react';
import axios from 'axios';
import { SENTRY_LOG_URL } from '@/helpers/frontend/apiEndpoints';

class SentryErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidCatch(error, errorInfo) {
    // Log the render crash to sentry silently
    try {
      axios
        .post(SENTRY_LOG_URL, {
          source: 'frontend',
          level: 'critical',
          method: 'RENDER',
          url: typeof window !== 'undefined' ? window.location.pathname : '',
          statusCode: 0,
          message: error?.message || 'React component crashed',
          stack: error?.stack || errorInfo?.componentStack || '',
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        })
        .catch(() => {});
    } catch {
      // fail silently
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
          <span className="text-4xl">💥</span>
          <h2 className="text-lg font-semibold text-gray-800">Something went wrong</h2>
          <p className="max-w-md text-sm text-gray-500">
            An unexpected error occurred. Please refresh the page or try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 rounded-lg bg-pest px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-pest/80"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SentryErrorBoundary;
