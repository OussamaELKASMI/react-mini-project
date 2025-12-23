import { useEffect, useState } from 'react';
import TopBar from 'components/layout/TopBar';
import RoomList from 'components/rooms/RoomList';
import ReserveModal from 'components/reservations/ReserveModal';
import toast, { Toaster } from 'react-hot-toast';

import { loadReservations, saveReservations } from 'utils/storage';
import { generateReservationId } from 'utils/id';
import MyReservations from 'components/reservations/MyReservations';

import LoginPage from 'components/auth/Login';
import { clearAuthUser, loadAuthUser, saveAuthUser } from 'utils/authStorage';

export default function App() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [reservations, setReservations] = useState([]);
  const [page, setPage] = useState('rooms');

  const [user, setUser] = useState(null);

  useEffect(() => {
    setReservations(loadReservations());
    setUser(loadAuthUser());
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen">
        <TopBar
          {...{ page }}
          onRooms={() => setPage('rooms')}
          onReservations={() => setPage('reservations')}
        />
        <main className="mx-auto max-w-6xl px-4 py-6">
          <LoginPage
            onLogin={(u) => {
              saveAuthUser(u);
              setUser(u);
              toast.success(`Welcome, ${u.name}!`);
            }}
          />
        </main>

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: { background: '#E6EDF2', color: '#000' },
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-prim/40">
      <TopBar
        {...{ page }}
        onRooms={() => setPage('rooms')}
        onReservations={() => setPage('reservations')}
        user={user}
        onLogout={() => {
          clearAuthUser();
          setUser(null);
          setPage('rooms');
          toast.success('Logged out.');
        }}
      />

      <main className="mx-auto max-w-6xl px-4 py-3">
        {page === 'rooms' && (
          <RoomList
            onReserve={(room) => {
              setSelectedRoom(room);
              setModalOpen(true);
            }}
          />
        )}

        {page === 'reservations' && (
          <MyReservations
            reservations={reservations}
            onCancel={(id) => {
              const now = new Date();

              const reservation = reservations.find((r) => r.id === id);
              if (!reservation) return;

              const startDate = new Date(reservation.start);

              if (startDate <= now) {
                toast.error('You cannot cancel a reservation that has already started.');
                return;
              }

              const updated = reservations.filter((r) => r.id !== id);
              setReservations(updated);
              saveReservations(updated);
              toast.success('Reservation cancelled.');
            }}
          />
        )}
      </main>

      <ReserveModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        room={selectedRoom}
        reservations={reservations}
        user={{ userId: user.id, name: user.name }}
        onConfirm={({ roomId, start, end }) => {
          const reservation = {
            id: generateReservationId(),
            roomId,
            start,
            end,
            userId: user.id,
            userName: user.name,
            createdAt: new Date().toISOString(),
          };

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
          duration: 5000,
          style: {
            background: '#E6EDF2',
            color: '#000',
          },
        }}
      />
    </div>
  );
}
