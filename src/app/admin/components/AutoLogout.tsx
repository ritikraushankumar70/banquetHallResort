'use client';

import { useEffect, useState } from 'react';

export default function AutoLogout() {
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Securely drop the cookie on the server
        navigator.sendBeacon('/api/logout');
        // Lock the UI immediately without triggering full page reloads
        setLocked(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  if (locked) {
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#ffffff', zIndex: 999999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <i className="bi bi-shield-lock-fill text-warning mb-3" style={{ fontSize: '4rem' }}></i>
        <h2 className="fw-bold text-navy mb-2">Session Locked</h2>
        <p className="text-muted mb-4">You switched tabs. For security reasons, your session has been locked.</p>
        <button 
          onClick={() => { window.location.href = '/admin/login'; }} 
          className="btn btn-primary px-4 py-2 shadow-sm"
        >
          Login Again
        </button>
      </div>
    );
  }

  return null;
}
