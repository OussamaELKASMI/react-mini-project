const KEY = 'roomify_auth_user';

export function loadAuthUser() {
  try {
    const user = localStorage.getItem(KEY);
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

export function saveAuthUser(user) {
  localStorage.setItem(KEY, JSON.stringify(user)); // store without password
}

export function clearAuthUser() {
  localStorage.removeItem(KEY);
}
