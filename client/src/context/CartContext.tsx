import React, { createContext, useState, useContext, useEffect } from 'react';
import { Cart, CartItem, Product } from '../types';
import { mockProducts } from '../data/mockData';

interface CartContextType {
  cart: Cart;
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setDeliveryOption: (option: 'pickup' | 'delivery') => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    deliveryOption: 'pickup',
    subtotal: 0
  });

  // Load cart from localStorage on initialization
  useEffect(() => {
    const storedCart = localStorage.getItem('fitpass_cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('fitpass_cart', JSON.stringify(cart));
  }, [cart]);

  // Calculate subtotal whenever items change
  useEffect(() => {
    const newSubtotal = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setCart(prev => ({ ...prev, subtotal: newSubtotal }));
  }, [cart.items]);

  const findProductById = (productId: string): Product | undefined => {
    return mockProducts.find(product => product.id === productId);
  };

  const addToCart = (productId: string, quantity: number) => {
    const product = findProductById(productId);
    if (!product) return;

    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(
        item => item.productId === productId
      );

      let newItems;
      if (existingItemIndex >= 0) {
        // Update existing item
        newItems = [...prevCart.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
      } else {
        // Add new item
        newItems = [
          ...prevCart.items,
          { productId, quantity, product }
        ];
      }

      return {
        ...prevCart,
        items: newItems
      };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => ({
      ...prevCart,
      items: prevCart.items.filter(item => item.productId !== productId)
    }));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => ({
      ...prevCart,
      items: prevCart.items.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    }));
  };

  const setDeliveryOption = (option: 'pickup' | 'delivery') => {
    setCart(prevCart => ({
      ...prevCart,
      deliveryOption: option
    }));
  };

  const clearCart = () => {
    setCart({
      items: [],
      deliveryOption: 'pickup',
      subtotal: 0
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        setDeliveryOption,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};