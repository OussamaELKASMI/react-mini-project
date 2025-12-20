import { useEffect, useState } from 'react';
import TopBar from 'components/layout/TopBar';
import RoomList from 'components/rooms/RoomList';
import ReserveModal from 'components/reservations/ReserveModal';
import useGuestUser from 'hooks/useGuestUser';
import toast, { Toaster } from 'react-hot-toast';

import { loadReservations, saveReservations } from 'utils/storage';
import { generateReservationId } from 'utils/id';
import MyReservations from 'components/reservations/MyReservations';

export default function App() {
  const user = useGuestUser();

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [reservations, setReservations] = useState([]);

  const [page, setPage] = useState('rooms');

  // load once when app starts
  useEffect(() => {
    setReservations(loadReservations());
  }, []);

  return (
    <div className="min-h-screen">
      <TopBar
        {...{ page }}
        onRooms={() => setPage('rooms')}
        onReservations={() => setPage('reservations')}
      />

      <main className="mx-auto max-w-6xl px-4 py-6">
        {page === 'rooms' && (
          <RoomList
            onReserve={(room) => {
              setSelectedRoom(room);
              setModalOpen(true);
            }}
          />
        )}

        {page === 'reservations' && <MyReservations reservations={reservations} />}
      </main>

      <ReserveModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        room={selectedRoom}
        reservations={reservations}
        user={user}
        onConfirm={({ roomId, start, end, userId, userName }) => {
          // build reservation object
          const reservation = {
            id: generateReservationId(),
            roomId,
            start,
            end,
            userId,
            userName,
            createdAt: new Date().toISOString(),
          };

          // update state + localStorage
          const updated = [...reservations, reservation];
          setReservations(updated);
          saveReservations(updated);

          setModalOpen(false);
          toast.success('Reservation confirmed successfully!');
        }}
      />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#EFE9E3',
            color: '#000',
          },
        }}
      />
    </div>
  );
}
