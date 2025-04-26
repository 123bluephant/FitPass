import React, { useState } from 'react';
import { Menu, X, Home, Dumbbell, ShoppingBag, User, UserCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FcAbout } from 'react-icons/fc';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleMenuClose = () => {
    setIsMenuOpen(false);
    // Ensure any potential extension conflicts are handled
    window.postMessage({ type: 'navigationEvent' }, '*');
  };

  const mainNavItems = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/about', label: 'About', icon: <FcAbout size={20} /> },
    { path: '/gyms', label: 'Gyms', icon: <Dumbbell size={20} /> },
    { path: '/marketplace', label: 'Shop', icon: <ShoppingBag size={20} /> },
  ];

  const authNavItems = [
<<<<<<< HEAD
    ...(isAuthenticated ? [
      { path: '/membership', label: 'Membership', icon: <User size={20} /> },
      { path: '/cart', label: 'Checkout', icon: <ShoppingBag size={20} /> },
    ] : []),
    { 
      path: isAuthenticated ? '/profile' : '/login', 
      label: isAuthenticated ? 'Profile' : 'Join Now',
      icon: <User size={20} />
    },
=======
    ...(isAuthenticated ? [{ path: '/Membership', label: 'Membership', icon: <User size={20} /> }] : []),
    ...(isAuthenticated ? [{ path: '/profile', label: 'Profile', icon: <UserCircle size={20} /> }] : []),
    { path: '/login', label: isAuthenticated ? 'Logout' : 'Join Now' },
>>>>>>> 9aeb743d5d6375eb97cffb1ce803134c289ae6d4
  ];

  const activeNavClass = 'text-blue-600 font-medium bg-blue-50 px-4 py-2 rounded-lg';
  const inactiveNavClass = 'text-gray-600 hover:text-blue-600 transition-colors duration-200';

  const handleProfileNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    handleMenuClose();
    navigate(path);
    // Add slight delay to prevent extension conflicts
    setTimeout(() => window.dispatchEvent(new Event('popstate')), 50);
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2" 
            onClick={handleMenuClose}
          >
            <Dumbbell className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">FitPass</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-1 justify-center">
            <div className="flex items-center space-x-2">
              {mainNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 ${
                    location.pathname === item.path ? activeNavClass : inactiveNavClass
                  }`}
                  onClick={handleMenuClose}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.path === '/marketplace' && cart.items.length > 0 && (
                    <span className="ml-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {authNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={(e) => handleProfileNavigation(e, item.path)}
                className={`flex items-center space-x-2 px-4 py-2 ${
                  location.pathname === item.path ? activeNavClass : inactiveNavClass
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.path === '/cart' && cart.items.length > 0 && (
                  <span className="ml-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-blue-600 focus:outline-none p-2 rounded-lg hover:bg-gray-100"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {[...mainNavItems, ...authNavItems].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={(e) => handleProfileNavigation(e, item.path)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  location.pathname === item.path
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {(item.path === '/marketplace' || item.path === '/cart') && cart.items.length > 0 && (
                  <span className="ml-auto bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;