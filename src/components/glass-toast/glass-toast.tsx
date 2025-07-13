import React, { useState, useEffect, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn, getGlassClass } from '@/lib/glass-utils';

export interface Toast {
  id: string;
  title?: string;
  description: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
  position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center';
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'top-right',
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {typeof window !== 'undefined' && createPortal(
        <div
          className={cn(
            'fixed z-50 flex flex-col space-y-2',
            positionClasses[position]
          )}
        >
          {toasts.map(toast => (
            <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleRemove = () => {
    setIsVisible(false);
    setTimeout(() => onRemove(toast.id), 200);
  };

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const iconColors = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
  };

  const Icon = icons[toast.type || 'info'];

  return (
    <div
      className={cn(
        getGlassClass('elevated'),
        'p-4 rounded-xl border border-white/20 dark:border-white/10',
        'min-w-[300px] max-w-[400px]',
        'transition-all duration-200 ease-out',
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      )}
    >
      <div className="flex items-start space-x-3">
        <Icon
          className={cn(
            'h-5 w-5 mt-0.5 flex-shrink-0',
            iconColors[toast.type || 'info']
          )}
        />

        <div className="flex-1 min-w-0">
          {toast.title && (
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
              {toast.title}
            </h4>
          )}
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {toast.description}
          </p>

          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              {toast.action.label}
            </button>
          )}
        </div>

        <button
          onClick={handleRemove}
          className="flex-shrink-0 p-1 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
        >
          <X className="h-4 w-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

// Simple GlassToast component for direct use
interface GlassToastProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
}

export const GlassToast: React.FC<GlassToastProps> = ({
  type = 'info',
  message,
  onClose,
}) => {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const iconColors = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
  };

  const Icon = icons[type];

  return (
    <div
      className={cn(
        getGlassClass('elevated'),
        'p-4 rounded-xl border border-white/20 dark:border-white/10',
        'min-w-[300px] max-w-[400px]',
        'transition-all duration-200 ease-out'
      )}
    >
      <div className="flex items-start space-x-3">
        <Icon
          className={cn('h-5 w-5 mt-0.5 flex-shrink-0', iconColors[type])}
        />

        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-600 dark:text-gray-300">{message}</p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
};
