import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500">
      <Link 
        to="/" 
        className="p-1.5 rounded-lg hover:bg-gray-800/50 hover:text-white transition-all"
      >
        <Home className="w-4 h-4" />
      </Link>
      {paths.map((path, index) => (
        <React.Fragment key={path}>
          <ChevronRight className="w-4 h-4 text-gray-600" />
          <Link
            to={`/${paths.slice(0, index + 1).join('/')}`}
            className="px-2 py-1 rounded-lg capitalize hover:bg-gray-800/50 hover:text-white transition-all"
          >
            {path.replace(/-/g, ' ')}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
}
