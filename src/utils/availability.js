export function isRoomAvailable(roomId, start, end, reservations) {
  if (!start || !end) return null; // null = "not checked yet"

  const startMs = new Date(start).getTime();
  const endMs = new Date(end).getTime();

  if (!Number.isFinite(startMs) || !Number.isFinite(endMs)) return null;
  if (endMs <= startMs) return false;

  const conflict = reservations.some((r) => {
    if (r.roomId !== roomId) return false;

    const rStart = new Date(r.start).getTime();
    const rEnd = new Date(r.end).getTime();

    return startMs < rEnd && endMs > rStart;
  });

  return !conflict;
}
