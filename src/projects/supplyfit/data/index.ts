import { Plan, Store, Product, User } from '../types';

export const plans: Plan[] = [
  {
    id: 1,
    name: 'Básico',
    price: '$29.99',
    color: '#4CAF50',
    features: ['Acesso a 10 produtos', '1 retirada por mês'],
    description: 'Plano básico para iniciantes.'
  },
  {
    id: 2,
    name: 'Pro',
    price: '$49.99',
    color: '#2196F3',
    features: ['Acesso a 50 produtos', '2 retiradas por mês', 'Recomendações personalizadas'],
    recommended: true,
    description: 'Plano ideal para quem quer mais opções.'
  },
  {
    id: 3,
    name: 'Elite',
    price: '$79.99',
    color: '#FF9800',
    features: ['Acesso ilimitado', 'Retiradas ilimitadas', 'Recomendações personalizadas', 'Cashback'],
    description: 'Plano para quem quer o máximo de benefícios.'
  }
];

export const stores: Store[] = [
  {
    id: 1,
    name: 'Suplementos Fit',
    distance: '2.5km',
    rating: 4.5,
    address: 'Rua das Flores, 123',
    openHours: '08:00 - 22:00',
    products: 150,
    image: 'store1.jpg',
    pickupTime: '15-30 min'
  },
  {
    id: 2,
    name: 'Nutri Shop',
    distance: '3.2km',
    rating: 4.2,
    address: 'Avenida Central, 456',
    openHours: '09:00 - 21:00',
    products: 200,
    image: 'store2.jpg',
    pickupTime: '20-40 min'
  }
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Whey Protein',
    brand: 'Optimum Nutrition',
    category: 'Proteína',
    size: '900g',
    image: 'whey.jpg',
    description: 'Whey Protein de alta qualidade para ganho de massa muscular.',
    flavors: ['Chocolate', 'Baunilha', 'Morango'],
    rating: 4.8,
    reviews: 500,
    popular: true
  },
  {
    id: 2,
    name: 'Creatina Monohidratada',
    brand: 'Dymatize',
    category: 'Creatina',
    size: '300g',
    image: 'creatine.jpg',
    description: 'Creatina para melhorar a performance nos treinos.',
    flavors: ['Sem sabor'],
    rating: 4.6,
    reviews: 300,
    popular: false
  }
];

export const user: User = {
  id: 1,
  name: 'João Silva',
  email: 'joao.silva@example.com',
  consumption: 5,
  cashback: 10
};
