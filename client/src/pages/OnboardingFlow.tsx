import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { FiArrowRight, FiArrowLeft, FiCheck } from 'react-icons/fi';
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
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="w-16 h-16 border-4 border-white border-t-blue-400 rounded-full animate-spin"></div>
      </div>
    );
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
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
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
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="text-center py-8"
          >
            <div className="mb-10">
              <div className="h-40 w-40 mx-auto bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <div className="h-32 w-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <div className="h-24 w-24 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full backdrop-blur-sm"></div>
                </div>
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-white">Welcome to <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">MainGym</span></h2>
            <p className="text-blue-100 mb-10 text-lg">Let's personalize your fitness journey</p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-xl text-lg font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Get Started <FiArrowRight className="inline ml-2" />
            </motion.button>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            key="personal-info"
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="py-6"
          >
            <h2 className="text-2xl font-bold mb-8 text-white">Personal Information</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-blue-100 mb-3">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-blue-200 transition-all"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-100 mb-3">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age || ''}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-blue-200 transition-all"
                  placeholder="Enter your age"
                  min="13"
                  max="120"
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="gender"
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="py-6"
          >
            <h2 className="text-2xl font-bold mb-8 text-white">Gender</h2>
            <div className="relative">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white appearance-none pr-12 transition-all"
              >
                <option value="male" className="bg-blue-900 text-white">Male</option>
                <option value="female" className="bg-blue-900 text-white">Female</option>
                <option value="other" className="bg-blue-900 text-white">Other</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="location"
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="py-6"
          >
            <h2 className="text-2xl font-bold mb-8 text-white">Your Location</h2>
            <div>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-5 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-blue-200 transition-all"
                placeholder="Enter your city"
              />
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="fitness-goals"
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="py-6"
          >
            <h2 className="text-2xl font-bold mb-8 text-white">Fitness Goals</h2>
            <div className="grid grid-cols-1 gap-3">
              {fitnessGoalOptions.map((goal) => (
                <motion.button
                  key={goal}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleFitnessGoal(goal)}
                  className={`px-5 py-4 rounded-xl border-2 text-left transition-all ${formData.fitnessGoals.includes(goal)
                    ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-blue-400 text-white shadow-md'
                    : 'bg-white/5 border-white/10 hover:border-blue-300 text-blue-100'}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{goal}</span>
                    {formData.fitnessGoals.includes(goal) && (
                      <div className="h-6 w-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                        <FiCheck className="text-white text-sm" />
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gradient-to-br from-blue-800/30 via-purple-800/30 to-indigo-800/30 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/10">
        <div className="px-8 pt-8">
          <div className="flex items-center mb-6">
            {step > 0 && (
              <motion.button
                whileHover={{ x: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBack}
                className="flex items-center justify-center h-10 w-10 bg-white/10 backdrop-blur-sm rounded-lg text-blue-200 hover:text-white transition-colors mr-3"
              >
                <FiArrowLeft />
              </motion.button>
            )}
            <div className="flex-1 bg-white/10 backdrop-blur-sm h-2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ width: `${(step / 4) * 100}%` }}
                animate={{ width: `${(step / 4) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        <div className="px-8 pb-8">
          <AnimatePresence mode='wait' custom={1}>
            {renderStep()}
          </AnimatePresence>

          {step > 0 && (
            <div className="mt-8 flex justify-end">
              {step === 4 ? (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={formData.fitnessGoals.length === 0}
                  className={`px-8 py-3 rounded-xl text-lg font-medium shadow-lg hover:shadow-xl transition-all ${formData.fitnessGoals.length === 0
                    ? 'bg-white/10 text-white/50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'}`}
                >
                  Complete <FiArrowRight className="inline ml-2" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl text-lg font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  Continue <FiArrowRight className="inline ml-2" />
                </motion.button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;