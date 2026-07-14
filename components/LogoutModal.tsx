"use client";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md rounded-2xl bg-[#FBFAF7] dark:bg-zinc-900 p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 transform transition-all scale-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex items-center gap-3 text-red-600 dark:text-red-400 mb-3">
          <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>
            </svg>
          </div>
          <h3 id="modal-title" className="text-lg font-bold text-zinc-900 dark:text-white">
            Confirm Logout
          </h3>
        </div>
        
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          Are you sure you want to log out of your account? You will need to sign back in to access your dashboard.
        </p>

        <div className="flex items-center justify-end gap-3 font-semibold text-xs sm:text-sm">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm"
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
}