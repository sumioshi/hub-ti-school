import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
<h2><FaHome /> Bem-vindo ao SuppliFit <span className="placeholder">Imagem aqui</span></h2>
      <p>Seu Gympass para suplementos!</p>
      <Link to="/plans">Veja nossos planos</Link>
    </div>
  );
};

export default HomePage;
