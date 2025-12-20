import { useMemo, useState } from 'react';
import rooms from 'data/rooms.json';
import RoomCard from 'components/rooms/RoomCard';
import Pagination from 'components/common/Pagination';

export default function RoomList({ onReserve }) {
  const PAGE_SIZE = 6;
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(rooms.length / PAGE_SIZE));

  const pageRooms = useMemo(() => {
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return rooms.slice(startIndex, endIndex);
  }, [page]);

  const showingFrom = (page - 1) * PAGE_SIZE + 1;
  const showingTo = Math.min(page * PAGE_SIZE, rooms.length);

  return (
    <section id="rooms" className="space-y-4">
      {/* Title + hint */}
      <div>
        <h2 className="text-xl font-semibold text-slate-800">Rooms</h2>
        <p className="text-sm text-slate-600">
          Choose a room, then select a date range to check availability.
        </p>
      </div>

      {/* Meta line */}
      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>
          Showing <span className="font-medium">{showingFrom}</span>–
          <span className="font-medium">{showingTo}</span> of{' '}
          <span className="font-medium">{rooms.length}</span>
        </span>

        <span className="hidden sm:inline">
          Page <span className="font-medium">{page}</span> /{' '}
          <span className="font-medium">{totalPages}</span>
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pageRooms.map((room) => (
          <RoomCard key={room.id} room={room} onReserve={onReserve} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(p) => setPage(Math.max(1, Math.min(totalPages, p)))}
      />
    </section>
  );
}
