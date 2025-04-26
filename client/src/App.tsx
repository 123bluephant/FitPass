
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import GymsListPage from './pages/GymsListPage';
import GymDetailPage from './pages/GymDetailPage';
import MarketplacePage from './pages/MarketplacePage';
import CartPage from './pages/CartPage';
<<<<<<< HEAD
import OnboardingPage from './pages/OnboardingPage';
import AuthFormPage from './pages/AuthPage';
import Membership from './pages/membership';
import AboutPage from './pages/AboutPage';
import Footer from './components/footer';
import Profile from './pages/ProfilePage';
=======
// import OnboardingPage from './pages/OnboardingPage';
import ProfilePage from './pages/ProfilePage';
import AuthFormPage from './pages/AuthPage';
import Membership from './pages/membership';
import OnboardingFlow from './pages/OnboardingFlow';
>>>>>>> 9aeb743d5d6375eb97cffb1ce803134c289ae6d4

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
<<<<<<< HEAD
            <Route path="/Onboarding" element={<OnboardingPage />} />
=======
            <Route path="/Onboarding" element={<OnboardingFlow />} />
            <Route path="/Profile" element={<ProfilePage />} />
>>>>>>> 9aeb743d5d6375eb97cffb1ce803134c289ae6d4
            <Route path="/Membership" element={<Membership />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;