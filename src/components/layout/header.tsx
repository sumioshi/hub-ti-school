import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../ui/breadcrumbs';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1A1A1A] bg-black">
      <div className="container flex h-14 items-center px-4 sm:px-8">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <Menu className="h-5 w-5 text-white" />
          <span className="font-bold text-white">Project Showcase</span>
        </Link>
        <Breadcrumbs />
      </div>
    </header>
  );
}