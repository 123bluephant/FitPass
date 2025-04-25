// components/about/TeamMember.tsx
import { motion } from 'framer-motion';

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export const TeamMember: React.FC<TeamMemberProps> = ({ name, role, bio, image }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
    >
      <div className="relative group">
        <div className="overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        <div className="p-6 text-center">
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 blur opacity-25 group-hover:opacity-40 transition-opacity" />
            <h3 className="text-xl font-bold text-gray-900 relative">{name}</h3>
          </div>
          
          <p className="mt-2 text-blue-600 font-medium">{role}</p>
          <div className="my-4 h-px bg-gray-200 w-3/4 mx-auto" />
          <p className="text-gray-600 text-sm leading-relaxed">{bio}</p>
        </div>
      </div>
    </motion.div>
  );
};