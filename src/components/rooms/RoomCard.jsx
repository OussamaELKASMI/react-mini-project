export default function RoomCard({ room, onReserve }) {
  return (
    <div className="rounded-md border border-black/5 bg-prim p-4 shadow-sm transition-all duration-200 cursor-default">
      <h3 className="text-lg font-semibold text-slate-800">{room.name}</h3>

      <div className="mt-2 text-sm text-slate-600 space-y-1">
        <p>
          Capacity: <span className="font-medium">{room.capacity}</span>
        </p>
        <p>
          Size: <span className="font-medium">{room.sizeM2}</span> m²
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {room.equipment?.map((item) => (
          <span
            key={item}
            className="rounded-full bg-sec/30 px-3 py-1 text-xs font-medium text-slate-700"
          >
            {item}
          </span>
        ))}
      </div>

      <button
        onClick={() => onReserve?.(room)}
        className="mt-4 flex ml-auto rounded-md bg-sec/80 px-4 py-2 text-sm font-medium text-slate-800 border border-sec shadow-sm hover:bg-transparent transition-all duration-200"
      >
        Reserve
      </button>
    </div>
  );
}
