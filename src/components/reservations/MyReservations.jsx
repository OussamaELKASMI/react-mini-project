export default function MyReservations({ reservations }) {
  if (!reservations || reservations.length === 0) {
    return (
      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-800">Reservations</h2>
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

      {/* ✅ Grid instead of vertical stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reservations.map((r) => (
          <div key={r.id} className="rounded-md border border-black/10 bg-prim p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold text-slate-800">Room: {r.roomId}</div>
                <div className="text-sm text-slate-700">
                  {new Date(r.start).toLocaleString()} → {new Date(r.end).toLocaleString()}
                </div>
              </div>

              <span className="text-xs text-slate-600">{r.userName || 'Guest'}</span>
            </div>

            <div className="mt-2 text-xs text-slate-600">
              UserId: <span className="font-medium">{r.userId}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
