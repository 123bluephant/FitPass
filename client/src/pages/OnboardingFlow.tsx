import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

interface OnboardingData {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  location: string;
  fitnessGoals: string[];
}

const OnboardingFlow: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<OnboardingData>({
    name: '',
    age: 0,
    gender: 'male',
    location: '',
    fitnessGoals: [],
  });

  const fitnessGoalOptions = [
    'Lose Weight',
    'Build Muscle',
    'Stay Fit & Active',
    'Try New Gyms',
    'Improve Stamina',
    'Learn Group Workouts',
    'De-Stress from Work',
  ];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.post('http://localhost:5000/api/onboarding', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      completeOnboarding();
      navigate('/');
    } catch (error) {
      console.error('Error submitting onboarding data:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleFitnessGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      fitnessGoals: prev.fitnessGoals.includes(goal)
        ? prev.fitnessGoals.filter(g => g !== goal)
        : [...prev.fitnessGoals, goal]
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div
            key="welcome"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Welcome to MainGym!</h2>
            <p className="text-gray-600 mb-8">Let's personalize your fitness journey</p>
            <button
              onClick={handleNext}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
            >
              Get Started <FiArrowRight />
            </button>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            key="personal-info"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold mb-6">Tell us about yourself</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Your age"
                min="13"
                max="120"
              />
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="gender"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold mb-6">Select your gender</h2>
            <div className="space-y-4">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="location"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold mb-6">Where are you located?</h2>
            <div>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your city"
              />
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="fitness-goals"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold mb-6">What are your fitness goals?</h2>
            <div className="grid grid-cols-2 gap-4">
              {fitnessGoalOptions.map((goal) => (
                <button
                  key={goal}
                  onClick={() => toggleFitnessGoal(goal)}
                  className={`p-4 rounded-lg border ${formData.fitnessGoals.includes(goal)
                    ? 'bg-blue-100 border-blue-500 text-blue-700'
                    : 'border-gray-200 hover:border-blue-500'} transition-colors`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {step > 0 && (
              <button
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FiArrowLeft className="mr-2" /> Back
              </button>
            )}
            <div className="flex-1 ml-4">
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence mode='wait' initial={false}>
          {renderStep()}
        </AnimatePresence>

        {step > 0 && (
          <div className="mt-8 flex justify-end">
            {step === 4 ? (
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
              >
                Complete <FiArrowRight />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
              >
                Next <FiArrowRight />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingFlow;