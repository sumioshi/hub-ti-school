import React from 'react';

interface ProductModalProps {
  onClose: () => void;
  product: {
    name: string;
    description: string;
  };
}

const ProductModal: React.FC<ProductModalProps> = ({ onClose, product }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default ProductModal;
