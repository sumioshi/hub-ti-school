export interface Plan {
  id: number;
  name: string;
  price: string;
  color: string;
  features: string[];
  recommended?: boolean;
  description: string;
}

export interface Store {
  id: number;
  name: string;
  distance: string;
  rating: number;
  address: string;
  openHours: string;
  products: number;
  image: string;
  pickupTime: string;
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  size: string;
  image: string;
  description: string;
  flavors: string[];
  rating: number;
  reviews: number;
  popular: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  consumption: number;
  cashback: number;
}
