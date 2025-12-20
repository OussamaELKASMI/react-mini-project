import { createSlice } from '@reduxjs/toolkit';
import { loadReservations, saveReservations } from 'utils/storage';

function generateResId() {
  return 'res_' + Math.random().toString(16).slice(2) + '_' + Date.now().toString(16);
}

// Overlap rule that works across dates
function overlaps(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && aEnd > bStart;
}

const initialState = {
  items: loadReservations(), // hydrate from localStorage
};

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    addReservation: (state, action) => {
      const { roomId, start, end, userId, userName, title } = action.payload;

      const startMs = new Date(start).getTime();
      const endMs = new Date(end).getTime();

      // Basic validation (guard)
      if (!roomId || !userId || !start || !end) return;
      if (!Number.isFinite(startMs) || !Number.isFinite(endMs)) return;
      if (endMs <= startMs) return;

      // Check conflicts for same room
      const conflict = state.items.some((r) => {
        if (r.roomId !== roomId) return false;
        const rStart = new Date(r.start).getTime();
        const rEnd = new Date(r.end).getTime();
        return overlaps(startMs, endMs, rStart, rEnd);
      });

      if (conflict) return; // block

      state.items.push({
        id: generateResId(),
        roomId,
        start,
        end,
        userId,
        userName: userName || 'Guest',
        title: title || 'Reservation',
        createdAt: new Date().toISOString(),
      });

      saveReservations(state.items);
    },

    removeReservation: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((r) => r.id !== id);
      saveReservations(state.items);
    },

    // optional: clear all (useful for testing)
    clearReservations: (state) => {
      state.items = [];
      saveReservations(state.items);
    },
  },
});

export const { addReservation, removeReservation, clearReservations } = reservationsSlice.actions;
export default reservationsSlice.reducer;
