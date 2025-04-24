import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(product.id, quantity);
    
    // Reset after animation
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 1000);
  };

  return (
    <Card hoverable className="h-full flex flex-col">
      <div className="relative pb-[100%]">
        <img 
          src={product.image} 
          alt={product.name} 
          className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={product.inStock ? 'success' : 'error'}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </Badge>
        </div>
      </div>
      
      <div className="flex-1 p-4">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="info" size="sm" className="mb-1">
              {product.category}
            </Badge>
            <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
          </div>
          <div className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</div>
        </div>
        
        <p className="mt-2 text-gray-600 text-sm line-clamp-2">{product.description}</p>
        
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center border rounded-md">
              <button
                className="px-2 py-1 text-gray-600 hover:text-gray-800"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="px-3 py-1 border-x">{quantity}</span>
              <button
                className="px-2 py-1 text-gray-600 hover:text-gray-800"
                onClick={() => handleQuantityChange(1)}
              >
                <Plus size={16} />
              </button>
            </div>
            
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock || isAdding}
              isLoading={isAdding}
              leftIcon={<ShoppingCart size={16} />}
              size="sm"
            >
              {isAdding ? 'Added!' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;