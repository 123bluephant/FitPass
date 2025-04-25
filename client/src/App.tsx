
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import GymsListPage from './pages/GymsListPage';
import GymDetailPage from './pages/GymDetailPage';
import MarketplacePage from './pages/MarketplacePage';
import CartPage from './pages/CartPage';
import OnboardingPage from './pages/OnboardingPage';
import ProfilePage from './pages/ProfilePage';
import AuthFormPage from './pages/AuthPage';
import Membership from './pages/membership';  

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gyms" element={<GymsListPage />} />
            <Route path="/gyms/:id" element={<GymDetailPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<AuthFormPage />} />
            <Route path="/signup" element={<AuthFormPage />} />
            <Route path="/Onboarding" element={<OnboardingPage />} />
            <Route path="/Profile" element={<ProfilePage />} />
            <Route path="/Membership" element={<Membership />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;