import React from 'react';
import { useToast } from '../context/ToastContext';

const ToastContainer: React.FC = () => {
    const { toasts, removeToast } = useToast();

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
            {toasts.map(toast => (
                <div
                    key={toast.id}
                    className={`
            flex items-center gap-3 px-4 py-3 rounded-xl shadow-float backdrop-blur-sm
            animate-in slide-in-from-right-5 fade-in duration-200
            ${toast.type === 'success' ? 'bg-green-600 text-white' : ''}
            ${toast.type === 'error' ? 'bg-red-600 text-white' : ''}
            ${toast.type === 'info' ? 'bg-white dark:bg-gray-800 text-text-primary dark:text-white border border-gray-200 dark:border-gray-700' : ''}
          `}
                >
                    <span className="material-symbols-outlined text-[20px]">
                        {toast.type === 'success' && 'check_circle'}
                        {toast.type === 'error' && 'error'}
                        {toast.type === 'info' && 'info'}
                    </span>
                    <span className="text-sm font-medium">{toast.message}</span>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="ml-2 opacity-70 hover:opacity-100 transition-opacity"
                    >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ToastContainer;
