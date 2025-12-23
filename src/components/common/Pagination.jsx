export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const canPrev = page > 1;
  const canNext = page < totalPages;

  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, start + 4);

  const pages = [];
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <div className="flex items-center mx-auto w-fit gap-12">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={!canPrev}
        className={[
          'rounded-lg px-3 py-2 text-sm font-medium transition',
          canPrev
            ? 'bg-sec/80 hover:bg-transparent shadow-sm border border-sec transition-all duration-200 text-slate-800'
            : 'bg-slate-200 text-slate-500 cursor-not-allowed',
        ].join(' ')}
      >
        Prev
      </button>

      <div className="flex items-center gap-6">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={[
              'h-9 w-9 rounded-lg text-sm font-semibold transition',
              p === page
                ? 'bg-sec/80 text-slate-800'
                : 'bg-white border border-black/10 hover:bg-sec/30/40 text-slate-700',
            ].join(' ')}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={!canNext}
        className={[
          'rounded-lg px-3 py-2 text-sm font-medium transition',
          canNext
            ? 'bg-sec/80 hover:bg-transparent border border-sec shadow-sm transition-all duration-200 text-slate-800'
            : 'bg-slate-200 text-slate-500 cursor-not-allowed',
        ].join(' ')}
      >
        Next
      </button>
    </div>
  );
}
