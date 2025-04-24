import React from 'react';
import { ShoppingBag, Trash2, X } from 'lucide-react';
import { Cart, CartItem } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface CartSummaryProps {
  cart: Cart;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onSetDeliveryOption: (option: 'pickup' | 'delivery') => void;
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onSetDeliveryOption,
  onCheckout
}) => {
  const deliveryFee = cart.deliveryOption === 'delivery' ? 5.99 : 0;
  const total = cart.subtotal + deliveryFee;

  if (cart.items.length === 0) {
    return (
      <Card className="text-center p-6">
        <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 mb-3" />
        <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
        <p className="text-gray-600 mt-2 mb-4">
          Add some products to your cart to continue shopping.
        </p>
        <Button variant="outline" onClick={() => window.history.back()}>
          Continue Shopping
        </Button>
      </Card>
    );
  }

  return (
    <Card>
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Your Cart ({cart.items.length} items)</h3>
      </div>

      <div className="divide-y divide-gray-200">
        {cart.items.map((item) => (
          <div key={item.productId} className="p-4 flex items-center">
            <div className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="h-full w-full object-cover"
              />
            </div>
            
            <div className="ml-4 flex-1">
              <div className="flex justify-between">
                <h4 className="text-sm font-medium text-gray-900">{item.product.name}</h4>
                <span className="text-sm font-medium text-gray-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
              
              <p className="mt-1 text-xs text-gray-500">{item.product.category}</p>
              
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center border rounded-md text-sm">
                  <button
                    className="px-2 py-0.5 text-gray-600 hover:text-gray-800"
                    onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="px-2 py-0.5 border-x">{item.quantity}</span>
                  <button
                    className="px-2 py-0.5 text-gray-600 hover:text-gray-800"
                    onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                
                <button
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => onRemoveItem(item.productId)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Delivery Options</h4>
        
        <div className="flex space-x-4 mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="deliveryOption"
              checked={cart.deliveryOption === 'pickup'}
              onChange={() => onSetDeliveryOption('pickup')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-600">Store Pickup (Free)</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="radio"
              name="deliveryOption"
              checked={cart.deliveryOption === 'delivery'}
              onChange={() => onSetDeliveryOption('delivery')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-600">Home Delivery ($5.99)</span>
          </label>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">${cart.subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="text-gray-900">${deliveryFee.toFixed(2)}</span>
          </div>
          
          <div className="border-t border-gray-200 pt-2 flex justify-between font-medium">
            <span className="text-gray-900">Total</span>
            <span className="text-blue-600">${total.toFixed(2)}</span>
          </div>
        </div>
        
        <Button 
          className="mt-4 w-full" 
          size="lg"
          onClick={onCheckout}
        >
          Proceed to Checkout
        </Button>
      </div>
    </Card>
  );
};

export default CartSummary;