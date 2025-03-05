import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface AIErrorNotificationProps {
  message: string;
  onDismiss: () => void;
}

export function AIErrorNotification({ message, onDismiss }: AIErrorNotificationProps) {
  return (
    <div className="fixed bottom-4 right-4 max-w-md bg-red-900/90 text-white rounded-lg shadow-lg overflow-hidden animate-slide-up">
      <div className="flex items-start p-4">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-red-300" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-red-50">Erro na API de IA</p>
          <p className="mt-1 text-sm text-red-200">{message}</p>
        </div>
        <button
          onClick={onDismiss}
          className="ml-4 flex-shrink-0 text-red-200 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
} 