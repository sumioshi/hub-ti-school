import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/plans">Planos</Link></li>
        <li><Link to="/stores">Lojas</Link></li>
        <li><Link to="/products">Produtos</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/ai">AI</Link></li>
      </ul>
    </nav>
  );
};

export default Sidebar;
