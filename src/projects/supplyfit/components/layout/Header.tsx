import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>SuppliFit</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/plans">Planos</Link></li>
          <li><Link to="/stores">Lojas</Link></li>
          <li><Link to="/products">Produtos</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/ai">AI</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
