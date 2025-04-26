import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface MembershipCardProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
  gradient?: string;
  isFree?: boolean;
}

const MembershipCard = ({
  title,
  price,
  period,
  features,
  isPopular = false,
  gradient = 'from-primary-600 to-secondary-700',
  isFree = false,
}: MembershipCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${
        isPopular ? 'border-3 border-blue-500' : 'border border-gray-200'
      }`}
    >
      {isPopular && (
        <div className={`absolute top-4 -right-4 bg-gradient-to-r ${gradient} text-white text-sm font-bold px-4 py-1 rotate-45 shadow-md`}>
          Popular
        </div>
      )}
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>
        <div className="mb-6">
          <span className="text-5xl font-extrabold text-gray-900">{price}</span>
          <span className="text-lg text-gray-600">/{period}</span>
        </div>
        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-lg">{feature}</span>
            </li>
          ))}
        </ul>
        <button 
          className={`w-full py-4 px-6 rounded-xl font-bold transition-all duration-300 ${
            isFree
              ? `bg-gradient-to-r ${gradient} text-white hover:shadow-lg hover:shadow-gray-600/30`
              : isPopular 
                ? `bg-gradient-to-r ${gradient} text-white hover:shadow-lg hover:shadow-blue-400/30`
                : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-md'
          }`}
        >
          {isFree ? 'Join Free' : 'Join Now'}
        </button>
      </div>
    </motion.div>
  );
};

export default MembershipCard;