import React from 'react';
import { MapPin, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Gym } from '../../types';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

interface GymCardProps {
  gym: Gym;
}

const GymCard: React.FC<GymCardProps> = ({ gym }) => {
  return (
    <Card hoverable className="h-full flex flex-col">
      <div className="relative">
        <img 
          src={gym.image} 
          alt={gym.name} 
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </div>
      
      <div className="flex-1 p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-900">{gym.name}</h3>
          <div className="flex items-center text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-sm font-medium">{gym.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center mt-2 text-gray-500 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{gym.location.address}</span>
        </div>
        
        <p className="mt-2 text-gray-600 text-sm line-clamp-2">{gym.description}</p>
        
        <div className="mt-3 flex flex-wrap gap-2">
          {gym.amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="secondary" size="sm">
              {amenity}
            </Badge>
          ))}
          {gym.amenities.length > 3 && (
            <Badge variant="secondary" size="sm">
              +{gym.amenities.length - 3}
            </Badge>
          )}
        </div>

        <div className="mt-4 flex justify-between items-center border-t border-gray-100 pt-3">
          <div>
            <span className="text-lg font-bold text-gray-900">${gym.price}</span>
            <span className="text-sm text-gray-500">/month</span>
          </div>
          <Link 
            to={`/gyms/${gym.id}`} 
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <span className="text-sm font-medium">View Details</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default GymCard;