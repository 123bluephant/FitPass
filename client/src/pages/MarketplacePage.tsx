import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Filter, Grid, List } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/marketplace/ProductCard';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { mockProducts } from '../data/mockData';
import { Product } from '../types';

const MarketplacePage: React.FC = () => {
  const { addToCart, cart } = useCart();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    inStock: false
  });

  const categories = ['all', ...new Set(mockProducts.map(p => p.category))];

  useEffect(() => {
    let filteredProducts = [...mockProducts];
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        product => 
          product.name.toLowerCase().includes(searchLower) || 
          product.description.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.category !== 'all') {
      filteredProducts = filteredProducts.filter(
        product => product.category === filters.category
      );
    }
    
    if (filters.inStock) {
      filteredProducts = filteredProducts.filter(product => product.inStock);
    }
    
    setProducts(filteredProducts);
  }, [filters]);

  const handleAddToCart = (productId: string, quantity: number) => {
    addToCart(productId, quantity);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fitness Shop</h1>
            <p className="mt-2 text-gray-600">
              Browse and buy high-quality fitness products
            </p>
          </div>
          
          <Link to="/cart" className="relative">
            <Button 
              variant="outline" 
              leftIcon={<ShoppingCart className="h-5 w-5" />}
            >
              Cart
              {cart.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search products..."
                value={filters.search}
                onChange={e => setFilters({ ...filters, search: e.target.value })}
                fullWidth
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                leftIcon={<Filter className="h-5 w-5" />}
                onClick={() => setShowFilter(!showFilter)}
              >
                Filter
              </Button>
              
              <div className="hidden sm:flex border rounded overflow-hidden">
                <button
                  className={`p-2 ${view === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
                  onClick={() => setView('grid')}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  className={`p-2 ${view === 'list' ? 'bg-gray-100' : 'bg-white'}`}
                  onClick={() => setView('list')}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          {showFilter && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-col md:flex-row gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        className={`px-3 py-1 rounded-full text-sm ${
                          filters.category === category
                            ? 'bg-blue-100 text-blue-800 font-medium'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => setFilters({ ...filters, category })}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Availability</h3>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={e => setFilters({ ...filters, inStock: e.target.checked })}
                      className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                    <span className="ml-2 text-sm text-gray-600">In Stock Only</span>
                  </label>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setFilters({ search: '', category: 'all', inStock: false });
                    setShowFilter(false);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters to see more results.
            </p>
            <Button
              variant="outline"
              onClick={() => setFilters({ search: '', category: 'all', inStock: false })}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className={`
            ${view === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
              : 'space-y-4'
            }
          `}>
            {products.map(product => (
              <div key={product.id}>
                {view === 'grid' ? (
                  <ProductCard 
                    product={product} 
                    onAddToCart={handleAddToCart} 
                  />
                ) : (
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden flex border border-gray-200 hover:shadow-md transition-all">
                    <div className="w-32 h-32 sm:w-48 sm:h-48 flex-shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge variant="info" size="sm" className="mb-1">
                            {product.category}
                          </Badge>
                          <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                        </div>
                        <div className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</div>
                      </div>
                      
                      <p className="mt-2 text-gray-600 text-sm flex-1">{product.description}</p>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <Badge variant={product.inStock ? 'success' : 'error'}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                        
                        <Button
                          onClick={() => handleAddToCart(product.id, 1)}
                          disabled={!product.inStock}
                          leftIcon={<ShoppingCart size={16} />}
                          size="sm"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplacePage;