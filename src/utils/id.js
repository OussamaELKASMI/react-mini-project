export function generateReservationId() {
  return 'res_' + Math.random().toString(16).slice(2) + '_' + Date.now().toString(16);
}
