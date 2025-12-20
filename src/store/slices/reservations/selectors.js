export const selectAllReservations = (state) => state.reservations.items;

export const makeSelectMyReservations = (userId) => (state) =>
  state.reservations.items.filter((r) => r.userId === userId);
