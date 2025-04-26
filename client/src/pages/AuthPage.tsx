import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

const AuthFormPage: React.FC = () => {

  const { isAuthenticated, isLoading, needsOnboarding, login, signup, signInWithGoogle } = useAuth();


  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    name: '',
  });
  const [error, setError] = React.useState('');

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLoginPage) {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.email, formData.password, formData.name);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent"
        />
      </div>
    );
  }

  if (isAuthenticated) {
    if (needsOnboarding) {
      return <Navigate to="/Onboarding" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col py-12 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <Dumbbell className="h-16 w-16 text-blue-600 mb-4 transform transition-transform hover:rotate-12" />
          <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {isLoginPage ? 'Welcome Back' : 'Get Started'}
          </h2>
          <p className="mt-2 text-center text-gray-600 text-sm">
            {isLoginPage 
              ? 'Continue your fitness journey' 
              : 'Create your account in seconds'}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="mt-8 bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
        >
          <div className="px-8 py-10">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center"
              >
                <svg className="h-5 w-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-red-600 text-sm">{error}</span>
              </motion.div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {!isLoginPage && (
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </motion.div>
              )}

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    name="password"
                    type="password"
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="••••••••"
                  />
                </div>
                {isLoginPage && (
                  <div className="mt-2 flex justify-end">
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all transform hover:scale-[1.02]"
                >
                  <span>{isLoginPage ? 'Sign In' : 'Create Account'}</span>
                  <FiArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </form>


            <div className="mt-6 flex justify-center">
              <div>
                <button
                  type="button"
                  onClick={signInWithGoogle}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <img 
                    src="/google.svg" 
                    alt="Google logo" 
                    className="w-10 h-10"
                  />
                  <span className="ml-2">Continue with Google</span>
                </button>
              </div>
            </div>
          </div>

          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-center text-sm text-gray-600">
              {isLoginPage ? "Don't have an account? " : "Already have an account? "}
              <Link
                to={isLoginPage ? "/signup" : "/login"}
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                {isLoginPage ? "Sign up" : "Sign in"}
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthFormPage;