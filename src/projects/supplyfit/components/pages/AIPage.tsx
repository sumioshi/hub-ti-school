import React from 'react';
import { FaRobot } from 'react-icons/fa';

const AIPage: React.FC = () => {
  return (
    <div className="ai-page">
<h2><FaRobot /> Recomendações Personalizadas <span className="placeholder">Imagem aqui</span></h2>
      <p>Aqui você encontra sugestões de suplementos baseadas em seu perfil.</p>
    </div>
  );
};

export default AIPage;
