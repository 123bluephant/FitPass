import { motion } from 'framer-motion';
import { Clock, Users } from 'lucide-react';

interface ClassCardProps {
  title: string;
  instructor: string;
  image: string;
  duration: string;
  capacity: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

const getLevelColor = (level: 'Beginner' | 'Intermediate' | 'Advanced') => {
  switch (level) {
    case 'Beginner':
      return 'bg-green-100 text-green-800';
    case 'Intermediate':
      return 'bg-blue-100 text-blue-800';
    case 'Advanced':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const ClassCard = ({
  title,
  instructor,
  image,
  duration,
  capacity,
  level,
}: ClassCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className={`absolute top-3 right-3 ${getLevelColor(level)} text-xs font-medium px-2 py-1 rounded-full`}>
          {level}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="text-primary-600 font-medium mb-3">with {instructor}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{duration}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-1" />
            <span className="text-sm">{capacity}</span>
          </div>
        </div>
        
        <button className="btn-primary w-full">
          Book Class
        </button>
      </div>
    </motion.div>
  );
};

export default ClassCard;