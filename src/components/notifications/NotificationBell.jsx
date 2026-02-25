'use client';

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { GET_UNREAD_COUNT_URL } from '@/helpers/frontend/apiEndpoints';
import NotificationPanel from './NotificationPanel';

const POLL_INTERVAL = 120000; // 120 seconds

const NotificationBell = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [panelOpen, setPanelOpen] = useState(false);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const res = await axios.get(GET_UNREAD_COUNT_URL);
      if (res.data?.success && res.data?.data) {
        setUnreadCount(res.data.data.count || 0);
      }
    } catch (err) {
      // Silent fail — don't disrupt UI for notification fetch errors
    }
  }, []);

  // Poll every 120 seconds + on mount + on page focus
  useEffect(() => {
    fetchUnreadCount();

    const interval = setInterval(fetchUnreadCount, POLL_INTERVAL);

    const handleFocus = () => fetchUnreadCount();
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchUnreadCount]);

  const togglePanel = () => {
    setPanelOpen(!panelOpen);
  };

  return (
    <div className="relative ml-2">
      <button
        onClick={togglePanel}
        className="relative rounded-lg p-2 text-gray-400 transition-all duration-200 hover:bg-gray-800 hover:text-white"
        title="Notifications"
      >
        {/* Bell Icon SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      <NotificationPanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        onCountUpdate={fetchUnreadCount}
      />
    </div>
  );
};

export default NotificationBell;
