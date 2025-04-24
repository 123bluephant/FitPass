import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  image: string;
  rating: number;
  testimonial: string;
  memberSince: string;
}

const TestimonialCard = ({
  name,
  image,
  rating,
  testimonial,
  memberSince,
}: TestimonialCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card p-6"
    >
      <div className="flex items-center mb-4">
        <img 
          src={image} 
          alt={name} 
          className="w-14 h-14 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="font-bold">{name}</h3>
          <p className="text-gray-500 text-sm">Member since {memberSince}</p>
        </div>
      </div>
      
      <div className="flex mb-4">
        {[...Array(5)].map((_, index) => (
          <Star 
            key={index}
            className={`w-4 h-4 ${
              index < rating 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      
      <p className="text-gray-700 italic">{testimonial}</p>
    </motion.div>
  );
};

export default TestimonialCard;