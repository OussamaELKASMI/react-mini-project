import { configureStore } from '@reduxjs/toolkit';
import reservationsReducer from './slices/reservations/reservationsSlice';

export const store = configureStore({
  reducer: {
    reservations: reservationsReducer,
  },
});
