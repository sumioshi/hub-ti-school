import React from 'react';
import { FaStore } from 'react-icons/fa';

const StoresPage: React.FC = () => {
  return (
    <div className="stores-page">
      <h2>Nossas Lojas</h2>
      <ul>
<li><FaStore /> Loja A - Endereço A <span className="placeholder">Imagem aqui</span></li>
<li><FaStore /> Loja B - Endereço B <span className="placeholder">Imagem aqui</span></li>
<li><FaStore /> Loja C - Endereço C <span className="placeholder">Imagem aqui</span></li>
<li><FaStore /> Loja D - Endereço D <span className="placeholder">Imagem aqui</span></li>
<li><FaStore /> Loja E - Endereço E <span className="placeholder">Imagem aqui</span></li>
<li><FaStore /> Loja F - Endereço F <span className="placeholder">Imagem aqui</span></li>
      </ul>
    </div>
  );
};

export default StoresPage;
