import React from 'react';

interface StoreDetailsModalProps {
  onClose: () => void;
  store: {
    name: string;
    address: string;
  };
}

const StoreDetailsModal: React.FC<StoreDetailsModalProps> = ({ onClose, store }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{store.name}</h2>
        <p>Endereço: {store.address}</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default StoreDetailsModal;
