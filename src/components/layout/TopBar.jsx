import { useState } from 'react';

export default function TopBar({ page, onRooms, onReservations }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-prim border-b border-black/5">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <button type="button" className="flex items-center gap-2 font-semibold tracking-wide">
            <div className="w-[7.5rem]">
              <img src="/assets/Logo.png" alt="" />
            </div>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <button
              className={`px-3 py-2 rounded-md ${
                page === 'rooms' && 'bg-sec'
              } hover:bg-ter/40 transition`}
              onClick={onRooms}
            >
              Rooms
            </button>

            <button
              className={`px-3 py-2 rounded-md ${
                page === 'reservations' && 'bg-sec'
              } hover:bg-ter/40 transition`}
              onClick={onReservations}
            >
              Reservations
            </button>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-md hover:bg-ter/40 transition"
              aria-label="Open menu"
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
            {/* SECONDARY (30%) */}
            <div className="rounded-md p-2 space-y-1">
              <button
                className={`w-full text-left px-3 py-2 rounded-md ${
                  page === 'rooms' && 'bg-sec'
                } transition`}
                onClick={onRooms}
              >
                Rooms
              </button>

              <button
                className={`w-full text-left px-3 py-2 rounded-md ${
                  page === 'reservations' && 'bg-sec'
                } transition`}
                onClick={onReservations}
              >
                Reservations
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
