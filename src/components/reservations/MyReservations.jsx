import rooms from 'data/rooms.json';
import { useState } from 'react';
import ConfirmModal from 'components/ui/ConfirmModal';

function formatDuration(start, end) {
  const startMs = new Date(start).getTime();
  const endMs = new Date(end).getTime();

  const totalMinutes = Math.floor((endMs - startMs) / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

export default function MyReservations({ reservations, onCancel }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingCancelId, setPendingCancelId] = useState(null);

  const roomById = Object.fromEntries(rooms.map((room) => [room.id, room]));

  if (!reservations || reservations.length === 0) {
    return (
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-800">Reservations</h2>
        <p className="text-sm text-slate-600">No reservations yet.</p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <h2 className="text-xl font-semibold text-slate-800">Reservations</h2>
        <p className="text-sm text-slate-600">
          Total: <span className="font-medium">{reservations.length}</span>
        </p>
      </div>

      <div className="w-full space-y-3">
        {reservations.map((r) => {
          const room = roomById[r.roomId];
          const roomName = room?.name || r.roomId;
          const equipment = room?.equipment || [];

          return (
            <div key={r.id} className="rounded-md border border-black/10 bg-prim p-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="font-semibold text-slate-800 flex items-center gap-3 flex-wrap">
                    {roomName}

                    {equipment.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {equipment.map((item) => (
                          <span
                            key={item}
                            className="rounded-full bg-sec/60 px-3 py-1 text-xs font-medium text-slate-700"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setPendingCancelId(r.id);
                      setConfirmOpen(true);
                    }}
                    className="shrink-0 rounded-md border border-sec px-3 py-2 text-xs font-semibold hover:bg-sec/40 transition"
                  >
                    Cancel
                  </button>
                </div>

                <div className="text-sm text-slate-700">
                  {new Date(r.start).toLocaleString()} → {new Date(r.end).toLocaleString()}
                </div>

                <div className="text-xs text-slate-600">
                  Duration:{' '}
                  <span className="font-medium text-slate-700">
                    {formatDuration(r.start, r.end)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ConfirmModal
        open={confirmOpen}
        title="Cancel reservation"
        message="Are you sure you want to cancel this reservation? This action cannot be undone."
        confirmText="Yes, cancel"
        cancelText="No"
        onCancel={() => {
          setConfirmOpen(false);
          setPendingCancelId(null);
        }}
        onConfirm={() => {
          if (pendingCancelId) {
            onCancel?.(pendingCancelId);
          }
          setConfirmOpen(false);
          setPendingCancelId(null);
        }}
      />
    </section>
  );
}
