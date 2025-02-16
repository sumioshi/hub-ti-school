import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../ui/breadcrumbs';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800/50 bg-black/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center px-4 sm:px-8">
        <Link to="/" className="mr-6 flex items-center space-x-3 group">
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all">
            <Menu className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Project Showcase
          </span>
        </Link>
        <Breadcrumbs />
      </div>
    </header>
  );
}
