import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MembershipCard from '../components/cards/MembershipCard';
import TestimonialCard from '../components/cards/TestimonialCard';
import { CheckCircle, X } from 'lucide-react';

const Membership = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  // Redirect if not logged in
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const monthlyPlans = [
    {
      title: 'Basic',
      price: '$0',
      period: 'month',
      features: [
        'Free gym access',
        'Basic equipment usage',
        'Locker room access',
        'Open workout areas',
        'Free fitness assessment'
      ],
      isPopular: false,
      gradient: 'from-gray-600 to-gray-800',
      isFree: true
    },
    {
      title: 'Premium',
      price: '$79',
      period: 'month',
      features: [
        'All Basic features',
        '3 personal training sessions',
        'Unlimited group classes',
        'Nutrition consultation',
        'Pool & sauna access',
        'Premium fitness app'
      ],
      isPopular: true,
      gradient: 'from-blue-600 to-purple-600',
      isFree: false
    },
    {
      title: 'Elite',
      price: '$129',
      period: 'month',
      features: [
        'All Premium features',
        'Unlimited personal training',
        'Exclusive member hours',
        'Advanced recovery facilities',
        'Guest passes',
        'Priority booking'
      ],
      isPopular: false,
      gradient: 'from-emerald-600 to-cyan-600',
      isFree: false
    },
  ];

  const annualPlans = [
    {
      title: 'Basic',
      price: '$0',
      period: 'year',
      features: [
        'Free gym access',
        '2 free training sessions',
        'Annual fitness report',
        'Priority access',
        'Exclusive free classes'
      ],
      isPopular: false,
      gradient: 'from-gray-600 to-gray-800',
      isFree: true
    },
    {
      title: 'Premium',
      price: '$759',
      period: 'year',
      features: [
        'All Basic features',
        '36 training sessions',
        'Unlimited classes',
        'Advanced nutrition plans',
        'Spa facilities access',
        'Premium app access'
      ],
      isPopular: true,
      gradient: 'from-blue-600 to-purple-600',
      isFree: false
    },
    {
      title: 'Elite',
      price: '$1299',
      period: 'year',
      features: [
        'All Premium features',
        'Unlimited training',
        'VIP facilities access',
        'Quarterly assessments',
        'Personal locker',
        'Premium guest passes'
      ],
      isPopular: false,
      gradient: 'from-emerald-600 to-cyan-600',
      isFree: false
    },
  ];

  const plans = billingPeriod === 'monthly' ? monthlyPlans : annualPlans;

  const comparisonFeatures = [
    {
      name: 'Gym Access',
      basic: true,
      premium: true,
      elite: true,
    },
    {
      name: 'Locker Room',
      basic: true,
      premium: true,
      elite: true,
    },
    {
      name: 'Group Classes',
      basic: false,
      premium: true,
      elite: true,
    },
    {
      name: 'Personal Training',
      basic: '2 sessions',
      premium: '3 sessions/mo',
      elite: 'Unlimited',
    },
    {
      name: 'Pool Access',
      basic: false,
      premium: true,
      elite: true,
    },
    {
      name: 'Recovery Room',
      basic: false,
      premium: false,
      elite: true,
    },
    {
      name: 'Guest Passes',
      basic: false,
      premium: '2/month',
      elite: '4/month',
    },
    {
      name: 'Priority Booking',
      basic: false,
      premium: false,
      elite: true,
    },
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent"
        />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Free Plan Badge */}
      <div className="container mx-auto px-4 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full inline-flex items-center shadow-sm mb-8"
        >
          <span className="mr-2">🎉</span>
          <span>Basic plan is always free for members!</span>
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="pt-12 pb-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Transform Your Fitness Journey
            </h1>
            <p className="text-lg text-blue-100 md:text-xl">
              Choose the perfect plan that fits your goals and lifestyle
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mb-8"
          >
            <div className="bg-gray-100 p-1.5 rounded-full flex">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-8 py-3 rounded-full text-sm font-medium transition-colors ${
                  billingPeriod === 'monthly'
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingPeriod('annual')}
                className={`px-8 py-3 rounded-full text-sm font-medium transition-colors ${
                  billingPeriod === 'annual'
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Annual Billing
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                  Save 20%
                </span>
              </button>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <MembershipCard
                  title={plan.title}
                  price={plan.price}
                  period={plan.period}
                  features={plan.features}
                  isPopular={plan.isPopular}
                  gradient={plan.gradient}
                  isFree={plan.isFree}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Plan Comparison
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Detailed breakdown of membership features across all tiers
            </p>
          </motion.div>

          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-700 font-semibold min-w-[250px]">
                      Features
                    </th>
                    <th className="px-6 py-4 text-center text-gray-700 font-semibold">
                      Basic
                    </th>
                    <th className="px-6 py-4 text-center text-gray-700 font-semibold">
                      Premium
                    </th>
                    <th className="px-6 py-4 text-center text-gray-700 font-semibold">
                      Elite
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisonFeatures.map((feature, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-gray-700">
                        {feature.name}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {typeof feature.basic === 'boolean' ? (
                          feature.basic ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-gray-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-600">{feature.basic}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {typeof feature.premium === 'boolean' ? (
                          feature.premium ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-gray-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-600">{feature.premium}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {typeof feature.elite === 'boolean' ? (
                          feature.elite ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-gray-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-600">{feature.elite}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Member Experiences
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Hear from our community about their fitness journeys
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Premium Member",
                testimonial: "The perfect balance of quality and affordability. Transformed my fitness routine completely!",
                rating: 5
              },
              {
                name: "Michael Chen",
                role: "Elite Member",
                testimonial: "Worth every penny. The unlimited training sessions helped me achieve my goals faster.",
                rating: 5
              },
              {
                name: "Emma Wilson",
                role: "Basic Member",
                testimonial: "Great free option with all the essentials. Perfect for starting my fitness journey!",
                rating: 4
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TestimonialCard image={''} memberSince={''} {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container px-4 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start Your Transformation Today
            </h2>
            <div className="flex justify-center gap-4">
              <button className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                Get Started
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Membership;