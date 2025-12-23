import { useState } from 'react';

export default function TopBar({ page, onRooms, onReservations, user, onLogin, onLogout }) {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-prim border-b border-black/5">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <button
            type="button"
            className="flex items-center gap-2 font-semibold tracking-wide"
            onClick={() => {
              onRooms?.();
              closeMenu();
            }}
          >
            Roomify
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <button
              className={`px-3 py-2 rounded-md ${
                page === 'rooms' ? 'bg-sec' : ''
              } hover:bg-sec/40 transition`}
              onClick={onRooms}
            >
              Rooms
            </button>

            <button
              className={`px-3 py-2 rounded-md ${
                page === 'reservations' ? 'bg-sec' : ''
              } hover:bg-sec/40 transition`}
              onClick={onReservations}
              disabled={!user} // optional: block reservations if not logged in
              title={!user ? 'Login to view your reservations' : undefined}
            >
              Reservations
            </button>

            {!user ? (
              <button
                className="ml-2 px-3 py-2 rounded-md hover:bg-sec transition"
                onClick={onLogin}
              >
                Login
              </button>
            ) : (
              <div className="ml-2 flex items-center gap-2">
                <span className="text-sm text-slate-700">
                  Hi, <span className="font-medium">{user.name}</span>
                </span>

                <button
                  className="px-3 py-2 rounded-md hover:bg-sec/40 transition"
                  onClick={onLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-md hover:bg-sec/40 transition"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="md:hidden pb-3">
            <div className="rounded-md p-2 space-y-1">
              <button
                className={`w-full text-left px-3 py-2 rounded-md ${
                  page === 'rooms' ? 'bg-sec/80' : ''
                } transition`}
                onClick={() => {
                  onRooms?.();
                  closeMenu();
                }}
              >
                Rooms
              </button>

              <button
                className={`w-full text-left px-3 py-2 rounded-md ${
                  page === 'reservations' ? 'bg-sec/80' : ''
                } transition ${!user ? 'opacity-60 cursor-not-allowed' : ''}`}
                onClick={() => {
                  if (!user) return;
                  onReservations?.();
                  closeMenu();
                }}
              >
                Reservations
              </button>

              <div className="pt-2 border-t border-black/10">
                {!user ? (
                  <button
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-sec transition"
                    onClick={() => {
                      onLogin?.();
                      closeMenu();
                    }}
                  >
                    Login
                  </button>
                ) : (
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-sm text-slate-700">{user.name}</span>
                    <button
                      className="px-3 py-2 rounded-md hover:bg-sec/40 transition"
                      onClick={() => {
                        onLogout?.();
                        closeMenu();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
