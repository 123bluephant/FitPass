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
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="h-12 w-12 rounded-full border-4 border-white border-t-transparent"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md"
      >
        {/* Logo and Heading */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-10"
        >
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <Dumbbell className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">
            {isLoginPage ? 'Welcome Back' : 'Get Started'}
          </h2>
          <p className="mt-2 text-blue-100">
            {isLoginPage 
              ? 'Continue your fitness journey' 
              : 'Create your account in seconds'}
          </p>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/10"
        >
          <div className="px-8 py-10">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 bg-red-500/20 border border-red-400/30 rounded-lg p-4 text-red-100 text-sm"
              >
                {error}
              </motion.div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {!isLoginPage && (
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-white mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-blue-200" />
                    </div>
                    <input
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-blue-200/50"
                      placeholder="John Doe"
                    />
                  </div>
                </motion.div>
              )}

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-white mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-blue-200" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-blue-200/50"
                    placeholder="john@example.com"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-blue-200" />
                  </div>
                  <input
                    name="password"
                    type="password"
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-blue-200/50"
                    placeholder="••••••••"
                  />
                </div>
                {isLoginPage && (
                  <div className="mt-2 flex justify-end">
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-blue-200 hover:text-white transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg transition-all transform hover:scale-[1.02] shadow-lg"
                >
                  <span>{isLoginPage ? 'Sign In' : 'Create Account'}</span>
                  <FiArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-blue-100">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={signInWithGoogle}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all"
                >
                  <img 
                    src="/google.svg" 
                    alt="Google logo" 
                    className="h-5 w-5"
                  />
                  <span>Google</span>
                </button>
              </div>
            </div>
          </div>

          <div className="px-8 py-4 bg-white/5 border-t border-white/10 text-center">
            <p className="text-sm text-blue-100">
              {isLoginPage ? "Don't have an account? " : "Already have an account? "}
              <Link
                to={isLoginPage ? "/signup" : "/login"}
                className="font-medium text-white hover:text-blue-200 transition-colors"
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