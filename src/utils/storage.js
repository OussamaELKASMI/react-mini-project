const KEY = 'roomify_reservations';

export function loadReservations() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveReservations(reservations) {
  localStorage.setItem(KEY, JSON.stringify(reservations));
}
