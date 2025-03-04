import React from 'react';

interface PlanModalProps {
  onClose: () => void;
}

const PlanModal: React.FC<PlanModalProps> = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Planos de Assinatura</h2>
        <p>Escolha o plano que melhor se adapta às suas necessidades.</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default PlanModal;
