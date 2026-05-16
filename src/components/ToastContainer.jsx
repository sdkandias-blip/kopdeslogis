import { useEffect, useState } from 'react';

/**
 * ToastContainer - renders stacked toast notifications
 */
const ToastContainer = ({ toasts }) => {
  const icons = {
    success: 'check_circle',
    error: 'error',
    warning: 'warning',
    info: 'info',
  };
  const colors = {
    success: 'bg-secondary text-on-secondary',
    error: 'bg-error text-on-error',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-primary-container text-on-primary-container',
  };

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg font-label-md text-label-md max-w-xs animate-[slideIn_0.3s_ease] pointer-events-auto ${colors[toast.type] || colors.info}`}
          style={{ animation: 'slideIn 0.3s ease' }}
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            {icons[toast.type] || 'info'}
          </span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
