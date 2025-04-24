import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter } from 'lucide-react';

interface TrainerCardProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  specialties: string[];
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

const TrainerCard = ({
  name,
  role,
  image,
  bio,
  specialties,
  socialLinks,
}: TrainerCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card overflow-hidden"
    >
      <div className="h-64 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-primary-600 font-medium mb-3">{role}</p>
        
        <p className="text-gray-600 mb-4">{bio}</p>
        
        <div className="mb-4">
          <p className="font-semibold mb-2">Specialties:</p>
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
        
        {socialLinks && (
          <div className="flex space-x-3 mt-4">
            {socialLinks.instagram && (
              <a 
                href={socialLinks.instagram}
                className="text-gray-600 hover:text-primary-600 transition-colors"
                aria-label={`${name}'s Instagram`}
              >
                <Instagram className="w-5 h-5" />
              </a>
            )}
            {socialLinks.facebook && (
              <a 
                href={socialLinks.facebook}
                className="text-gray-600 hover:text-primary-600 transition-colors"
                aria-label={`${name}'s Facebook`}
              >
                <Facebook className="w-5 h-5" />
              </a>
            )}
            {socialLinks.twitter && (
              <a 
                href={socialLinks.twitter}
                className="text-gray-600 hover:text-primary-600 transition-colors"
                aria-label={`${name}'s Twitter`}
              >
                <Twitter className="w-5 h-5" />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TrainerCard;