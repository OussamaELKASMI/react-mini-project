import { useMemo } from 'react';

function generateId() {
  // Simple unique-ish id
  return 'u_' + Math.random().toString(16).slice(2) + '_' + Date.now().toString(16);
}

export default function useGuestUser() {
  return useMemo(() => {
    const KEY = 'roomify_user';
    const raw = localStorage.getItem(KEY);

    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed?.userId) return parsed;
      } catch {
        // ignore and recreate
      }
    }

    const user = { userId: generateId(), name: 'Guest' };
    localStorage.setItem(KEY, JSON.stringify(user));
    return user;
  }, []);
}
