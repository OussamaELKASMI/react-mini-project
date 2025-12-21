import { useEffect, useMemo, useState } from 'react';
import { isRoomAvailable } from 'utils/availability';

export default function ReserveModal({ open, onClose, room, reservations = [], user, onConfirm }) {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  // reset fields when opening / changing room
  useEffect(() => {
    if (open) {
      setStart('');
      setEnd('');
    }
  }, [open, room?.id]);

  const availability = useMemo(() => {
    if (!room) return null;
    return isRoomAvailable(room.id, start, end, reservations);
  }, [room, start, end, reservations]);

  if (!open || !room) return null;

  const canConfirm = availability === true;

  return (
    <div className="fixed inset-0 z-50">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />

      {/* modal */}
      <div className="absolute inset-0 flex items-end sm:items-center justify-center p-3">
        <div className="w-full sm:max-w-lg rounded-md bg-prim shadow-lg border border-black/10">
          <div className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Reserve {room.name}</h3>
                <p className="text-sm text-slate-600">
                  Capacity {room.capacity} • {room.sizeM2} m²
                </p>
              </div>

              <button
                onClick={onClose}
                className="rounded-md px-2 py-1 hover:bg-black/5 transition text-slate-700"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700">Start</label>
                <input
                  type="datetime-local"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="mt-1 w-full rounded-md bg-transparent border border-sec px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ter/60"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">End</label>
                <input
                  type="datetime-local"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  className="mt-1 w-full rounded-md bg-transparent border border-sec px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ter/60"
                />
              </div>

              {/* Availability message */}
              <div className="">
                {availability === null && (
                  <p className="text-sm text-slate-600">
                    Choose start and end dates to check availability.
                  </p>
                )}

                {availability === true && (
                  <p className="text-sm font-semibold text-green-700">
                    Available for this time range.
                  </p>
                )}

                {availability === false && (
                  <p className="text-sm font-semibold text-red-700">
                    Not available, please select another time.
                  </p>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={onClose}
                  className="flex-1 rounded-md border border-black/10 px-4 py-2 text-sm font-medium hover:bg-black/5 transition"
                >
                  Cancel
                </button>

                <button
                  disabled={!canConfirm}
                  onClick={() => {
                    onConfirm?.({
                      roomId: room.id,
                      start,
                      end,
                      userId: user.userId,
                      userName: user.name,
                    });
                  }}
                  className={[
                    'flex-1 rounded-md px-4 py-2 text-sm font-medium transition',
                    canConfirm
                      ? 'bg-sec text-slate-800 hover:opacity-85'
                      : 'bg-slate-200 text-slate-500 cursor-not-allowed',
                  ].join(' ')}
                >
                  Confirm
                </button>
              </div>

              <p className="text-xs text-slate-500">
                User: <span className="font-medium">{user?.userId}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
