import { useState } from 'react';
import { motion } from 'framer-motion';
import MembershipCard from '../components/cards/MembershipCard';
import TestimonialCard from '../components/cards/TestimonialCard';
import { CheckCircle, X } from 'lucide-react';

const Membership = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const toggleBillingPeriod = () => {
    setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly');
  };

  const monthlyPlans = [
    {
      title: 'Basic',
      price: '$49',
      period: 'month',
      features: [
        'Access to main gym area',
        'Basic fitness assessment',
        'Standard gym equipment',
        'Locker room access',
        'Online workout tracking',
      ],
      isPopular: false,
      gradient: 'from-gray-600 to-gray-800',
    },
    {
      title: 'Premium',
      price: '$79',
      period: 'month',
      features: [
        'All Basic features',
        '3 sessions with a personal trainer',
        'Access to all group classes',
        'Nutrition consultation',
        'Access to pool and sauna',
        'Fitness app premium access',
      ],
      isPopular: true,
      gradient: 'from-primary-600 to-secondary-700',
    },
    {
      title: 'Elite',
      price: '$129',
      period: 'month',
      features: [
        'All Premium features',
        'Unlimited personal training',
        'Exclusive members-only hours',
        'Quarterly fitness assessments',
        'Recovery room access',
        'Guest passes (2 per month)',
        'Priority class booking',
      ],
      isPopular: false,
      gradient: 'from-accent-600 to-secondary-700',
    },
  ];

  const annualPlans = [
    {
      title: 'Basic',
      price: '$39',
      period: 'month',
      features: [
        'Access to main gym area',
        'Basic fitness assessment',
        'Standard gym equipment',
        'Locker room access',
        'Online workout tracking',
        'Two months free',
      ],
      isPopular: false,
      gradient: 'from-gray-600 to-gray-800',
    },
    {
      title: 'Premium',
      price: '$69',
      period: 'month',
      features: [
        'All Basic features',
        '3 sessions with a personal trainer',
        'Access to all group classes',
        'Nutrition consultation',
        'Access to pool and sauna',
        'Fitness app premium access',
        'Two months free',
      ],
      isPopular: true,
      gradient: 'from-primary-600 to-secondary-700',
    },
    {
      title: 'Elite',
      price: '$109',
      period: 'month',
      features: [
        'All Premium features',
        'Unlimited personal training',
        'Exclusive members-only hours',
        'Quarterly fitness assessments',
        'Recovery room access',
        'Guest passes (2 per month)',
        'Priority class booking',
        'Two months free',
      ],
      isPopular: false,
      gradient: 'from-accent-600 to-secondary-700',
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
      basic: 'Additional fee',
      premium: '3 sessions/month',
      elite: 'Unlimited',
    },
    {
      name: 'Nutrition Consultation',
      basic: false,
      premium: true,
      elite: true,
    },
    {
      name: 'Pool & Sauna',
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
      premium: false,
      elite: '2 per month',
    },
    {
      name: 'Priority Booking',
      basic: false,
      premium: false,
      elite: true,
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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

      {/* Pricing Toggle */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
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
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Plan Comparison
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Detailed breakdown of features across all membership tiers
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-xl overflow-hidden"
          >
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
                      {/* Keep cell content exactly the same */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Success Stories
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Hear from our members about their fitness transformations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                image: "/testimonials/sarah.jpg",
                text: "FitPass transformed my fitness journey. The premium membership gave me access to amazing trainers and classes!",
                plan: "Premium Member"
              },
              {
                name: "Mike Chen",
                image: "/testimonials/mike.jpg",
                text: "The Elite membership is worth every penny. Unlimited PT sessions helped me reach my goals faster.",
                plan: "Elite Member"
              },
              {
                name: "Emily Rodriguez",
                image: "/testimonials/emily.jpg",
                text: "Great value with the Basic plan. All the essential equipment I need for my workouts.",
                plan: "Basic Member"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TestimonialCard rating={0} testimonial={''} memberSince={''} {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Get answers to common membership questions
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "Can I freeze my membership?",
                answer: "Yes, you can freeze your membership for up to 3 months per year with valid reason like medical conditions or extended travel."
              },
              {
                question: "What's included in the free consultation?",
                answer: "The free consultation includes a facility tour, fitness assessment, and discussion with a trainer about your goals and the best membership plan for you."
              },
              {
                question: "Are there any signup fees?",
                answer: "No, we don't charge any signup or initiation fees. You only pay for your chosen membership plan."
              },
              {
                question: "Can I cancel my membership anytime?",
                answer: "Yes, you can cancel your membership with 30 days notice. Annual memberships may be subject to an early termination fee."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-gray-50 rounded-xl border border-gray-200"
              >
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
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
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start Your Transformation Today
            </h2>
            <div className="flex justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-50 transition-colors shadow-xl flex items-center gap-2">
                <span>Schedule Free Consultation</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Membership;