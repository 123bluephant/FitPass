import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartSummary from '../components/marketplace/CartSummary';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, setDeliveryOption, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="text-center py-12">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Order Placed Successfully!</h1>
              <p className="text-gray-600 mt-2">
                Your order has been confirmed and will be processed shortly.
              </p>
            </div>
            
            <div className="max-w-md mx-auto p-6 bg-gray-50 rounded-lg mb-6">
              <div className="text-sm text-gray-600">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span>Order Number:</span>
                  <span className="font-medium">ORD-{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span>Date:</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span>Delivery Method:</span>
                  <span className="font-medium capitalize">{cart.deliveryOption}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Payment Method:</span>
                  <span className="font-medium">Credit Card</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/marketplace">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
              <Link to="/profile">
                <Button>View Order History</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link to="/marketplace" className="flex items-center text-blue-600 hover:text-blue-800">
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>Back to Shop</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CartSummary 
              cart={cart}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              onSetDeliveryOption={setDeliveryOption}
              onCheckout={handleCheckout}
            />
          </div>
          
          <div>
            {cart.items.length > 0 && (
              <Card>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({cart.items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span className="text-gray-900">${cart.subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="text-gray-900">
                      {cart.deliveryOption === 'delivery' ? '$5.99' : 'Free'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900">${(cart.subtotal * 0.08).toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between font-medium">
                      <span className="text-gray-900">Total</span>
                      <span className="text-blue-600 text-lg">
                        ${(cart.subtotal + (cart.deliveryOption === 'delivery' ? 5.99 : 0) + (cart.subtotal * 0.08)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="mt-6 w-full" 
                  size="lg"
                  isLoading={isCheckingOut}
                  onClick={handleCheckout}
                >
                  {isCheckingOut ? 'Processing...' : 'Checkout Now'}
                </Button>
                
                <div className="mt-4 p-3 bg-gray-50 rounded-md text-xs text-gray-500">
                  <p className="font-medium mb-1">Secure Checkout:</p>
                  <p>All transactions are secure and encrypted. Your personal data is protected.</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;