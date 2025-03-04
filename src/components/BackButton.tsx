import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function BackButton() {
  return (
    <Link
      to="/"
      className="fixed top-4 left-4 z-50 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-200 bg-gray-800/90 hover:bg-gray-700/90 rounded-lg transition-colors shadow-lg backdrop-blur-sm border border-gray-700/50"
    >
      <ArrowLeft className="h-4 w-4" />
      Voltar para Projetos
    </Link>
  );
} 