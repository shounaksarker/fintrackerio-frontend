'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { GET_UNREAD_COUNT_URL } from '@/helpers/frontend/apiEndpoints';
import NotificationPanel from './NotificationPanel';
import Bell from '@/assets/svg/Icon/Bell';
import { POLL_INTERVAL } from '@/assets/constants';

const NotificationBell = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [panelOpen, setPanelOpen] = useState(false);
  const containerRef = useRef(null);

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

  // Poll every 180 seconds + on mount + on page focus
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

  // Close panel on any click outside the bell + panel container
  useEffect(() => {
    if (!panelOpen) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setPanelOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true);
  }, [panelOpen]);

  const togglePanel = () => {
    setPanelOpen(!panelOpen);
  };

  return (
    <div className="relative ml-2" ref={containerRef}>
      <button
        onClick={togglePanel}
        className="relative rounded-lg p-2 text-gray-400 transition-all duration-200 hover:bg-gray-300 hover:text-black"
        title="Notifications"
      >
        {/* Bell Icon SVG */}
        <Bell />

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
