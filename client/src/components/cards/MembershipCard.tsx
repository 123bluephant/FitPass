import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface MembershipCardProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
  gradient?: string;
}

const MembershipCard = ({
  title,
  price,
  period,
  features,
  isPopular = false,
  gradient = 'from-primary-500 to-secondary-600',
}: MembershipCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`card relative overflow-hidden ${
        isPopular ? 'border-2 border-primary-500' : ''
      }`}
    >
      {isPopular && (
        <div className={`absolute top-0 right-0 bg-gradient-to-r ${gradient} text-white text-xs font-semibold px-3 py-1 rounded-bl-lg`}>
          Most Popular
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="mb-6">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-gray-600">/{period}</span>
        </div>
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-accent-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <button 
          className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-all hover:shadow-lg ${
            isPopular 
              ? `bg-gradient-to-r ${gradient} hover:shadow-primary-300/50` 
              : 'bg-gray-800 hover:bg-gray-900 hover:shadow-gray-300/30'
          }`}
        >
          Get Started
        </button>
      </div>
    </motion.div>
  );
};

export default MembershipCard;