import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import GymsListPage from './pages/GymsListPage';
import GymDetailPage from './pages/GymDetailPage';
import MarketplacePage from './pages/MarketplacePage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import AuthFormPage from './pages/AuthPage';
import Membership from './pages/membership';
import OnboardingFlow from './pages/OnboardingFlow';
import AboutPage from './pages/AboutPage';
import Footer from './components/footer';
import ContactPage from './pages/ContactPage';
import WorkoutPage from './pages/WorkoutPage';
import WorkoutCategory from './components/workout/WorkoutCat';
import WorkoutDetail from './components/workout/WorkoutDetail';
import WorkoutHistoryDetail from './components/workout/WorkoutHistoryDetail';
import WorkoutHistory from './components/workout/WorkoutHistory';
import WorkoutTracking from './components/workout/WorkoutTracking';
import WorkoutLibrary from './components/workout/WorkoutLib';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 mb-4">
          <div className="mb-8"><Navigation /></div> {/* Add margin-bottom to Navigation */}
          
          {/* Alternatively, you could add margin-top to the main content container */}
          <div className="mt-8"> {/* This wrapper adds margin-top to all routes */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/gyms" element={<GymsListPage />} />
              <Route path="/gyms/:id" element={<GymDetailPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<AuthFormPage />} />
              <Route path="/signup" element={<AuthFormPage />} />
              <Route path="/Onboarding" element={<OnboardingFlow />} />
              <Route path="/Membership" element={<Membership />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/Workout" element={<WorkoutPage />} />
              <Route path="/workouts/*" element={<WorkoutPage />} />
              

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          
          <Footer/>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;