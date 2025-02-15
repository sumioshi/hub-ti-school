import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-400">
      <Link to="/" className="hover:text-white transition-colors">
        <Home className="w-4 h-4" />
      </Link>
      {paths.map((path, index) => (
        <React.Fragment key={path}>
          <ChevronRight className="w-4 h-4" />
          <Link
            to={`/${paths.slice(0, index + 1).join('/')}`}
            className="capitalize hover:text-white transition-colors"
          >
            {path.replace(/-/g, ' ')}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
}