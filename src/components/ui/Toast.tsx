import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { clsx } from 'clsx';
import styles from './Toast.module.css';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: { label: string; onClick: () => void };
}

interface ToastContextValue {
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id'>) => string;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);
    return id;
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

const ToastContainer = ({ toasts, onDismiss }: ToastContainerProps) => {
  if (toasts.length === 0) return null;

  return (
    <div className={styles.container} aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

const ToastItem = ({ toast, onDismiss }: ToastItemProps) => {
  const icons = {
    success: <SuccessIcon />,
    error: <ErrorIcon />,
    info: <InfoIcon />,
    warning: <WarningIcon />,
  };

  return (
    <div
      className={clsx(styles.toast, styles[toast.type])}
      role="alert"
      aria-live="assertive"
    >
      <div className={styles.iconWrapper}>{icons[toast.type]}</div>
      <div className={styles.content}>
        <div className={styles.title}>{toast.title}</div>
        {toast.message && <div className={styles.message}>{toast.message}</div>}
        {toast.action && (
          <button className={styles.action} onClick={toast.action.onClick}>
            {toast.action.label}
          </button>
        )}
      </div>
      <button
        className={styles.close}
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss"
      >
        <CloseIcon />
      </button>
      {toast.duration !== 0 && (
        <div
          className={styles.progress}
          style={{ animationDuration: `${toast.duration ?? 5000}ms` }}
        />
      )}
    </div>
  );
};

// SVG Icons
const SuccessIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.icon}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const ErrorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.icon}>
    <circle cx="12" cy="12" r="10" />
    <path d="M15 9l-6 6M9 9l6 6" />
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.icon}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

const WarningIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.icon}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <path d="M12 9v4M12 17h.01" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.closeIcon}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);