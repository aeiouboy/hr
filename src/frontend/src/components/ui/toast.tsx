'use client';

import { useState, useCallback, createContext, useContext } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  toast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const ICONS: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="h-5 w-5 text-green-500" />,
  error: <AlertCircle className="h-5 w-5 text-red-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
};

const BG: Record<ToastType, string> = {
  success: 'bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-800',
  error: 'bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-800',
  warning: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/30 dark:border-yellow-800',
  info: 'bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800',
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-[100] flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg animate-in slide-in-from-right w-full',
              BG[t.type]
            )}
          >
            {ICONS[t.type]}
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{t.message}</span>
            <button onClick={() => removeToast(t.id)} className="ml-2 p-0.5 hover:bg-black/5 rounded dark:hover:bg-white/10">
              <X className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
