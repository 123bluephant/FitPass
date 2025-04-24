export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  homeLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
  gymCategory?: string;
  isVerified: boolean;
}

export interface Gym {
  id: string;
  name: string;
  description: string;
  image: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  price: number;
  rating: number;
  amenities: string[];
  categories: string[];
  slots: Slot[];
}

export interface Slot {
  id: string;
  gymId: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  booked: number;
}

export interface Booking {
  id: string;
  userId: string;
  gymId: string;
  slotId: string;
  date: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  qrCode?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  gymId?: string;
  inStock: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface Cart {
  items: CartItem[];
  deliveryOption: 'pickup' | 'delivery';
  subtotal: number;
}