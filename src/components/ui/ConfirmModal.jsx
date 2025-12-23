export default function ConfirmModal({
  open,
  title = 'Confirm action',
  message = 'Are you sure?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute -inset-5 bg-black/40" onClick={onCancel} aria-hidden="true" />

      {/* Modal */}
      <div className="relative w-full max-w-sm rounded-md bg-prim border border-black/10 p-5 shadow-lg">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        <p className="mt-2 text-sm text-slate-700">{message}</p>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-md border border-black/10 px-4 py-2 text-sm font-medium hover:bg-black/5 transition"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="rounded-md bg-sec/80 border border-prim px-4 py-2 text-sm font-semibold hover:bg-transparent transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
