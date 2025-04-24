import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  Tag, 
  Star, 
  ChevronLeft, 
  Phone,
  Globe,
  Share2,
  Calendar
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import SlotBooking from '../components/gym/SlotBooking';
import QRPass from '../components/gym/QRPass';
import { mockGyms } from '../data/mockData';
import { Booking, Gym } from '../types';

const GymDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [gym, setGym] = useState<Gym | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (id) {
      const foundGym = mockGyms.find(g => g.id === id);
      setGym(foundGym || null);
    }
  }, [id]);

  if (!gym) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h3 className="text-xl font-medium text-gray-900 mb-2">Gym not found</h3>
            <p className="text-gray-600 mb-4">
              The gym you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/gyms">
              <Button variant="outline">Back to Gyms</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const bookSlot = async (slotId: string): Promise<Booking | null> => {
    // Mock booking creation for guest users
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newBooking: Booking = {
      id: Math.random().toString(36).substring(2, 15),
      gymId: gym.id,
      slotId,
      date: gym.slots.find(s => s.id === slotId)?.date || new Date().toISOString(),
      status: 'confirmed',
      userId: ''
    };
    
    setBooking(newBooking);
    return newBooking;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link to="/gyms" className="flex items-center text-blue-600 hover:text-blue-800">
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>Back to Gyms</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gym Image and Basic Info */}
            <Card padding="none" className="overflow-hidden">
              <div className="relative">
                <div className={`w-full h-64 md:h-96 bg-gray-200 transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
                  <img 
                    src={gym.image} 
                    alt={gym.name} 
                    className="w-full h-full object-cover"
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <div className="animate-pulse flex space-x-4">
                      <div className="rounded-full bg-gray-300 h-12 w-12"></div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{gym.name}</h1>
                    <div className="flex items-center mt-2 text-gray-600">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{gym.location.address}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                      <Star className="h-5 w-5 text-yellow-500 fill-current mr-1" />
                      <span className="font-medium">{gym.rating}</span>
                      <span className="text-gray-500 ml-1">/5</span>
                    </div>
                    
                    <div className="mt-2">
                      <Badge variant="success">Available for all members</Badge>
                    </div>
                  </div>
                </div>
                
                <p className="mt-4 text-gray-700">{gym.description}</p>
                
                <div className="mt-6 flex flex-wrap gap-2">
                  {gym.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            {/* Hours and Details */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    Hours
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>5:00 AM - 10:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday</span>
                      <span>7:00 AM - 8:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday</span>
                      <span>8:00 AM - 6:00 PM</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-gray-500" />
                    Pricing
                  </h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Daily Pass</span>
                      <span className="font-medium">${gym.price}/day</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Pass</span>
                      <span className="font-medium">${gym.price * 10}/month</span>
                    </div>
                    <div className="mt-4">
                      <Button size="sm" variant="outline" className="w-full">
                        View Membership Options
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 flex flex-wrap gap-3">
                <Button variant="outline" size="sm" leftIcon={<Phone size={16} />}>
                  Contact Gym
                </Button>
                <Button variant="outline" size="sm" leftIcon={<Globe size={16} />}>
                  Visit Website
                </Button>
                <Button variant="outline" size="sm" leftIcon={<Share2 size={16} />}>
                  Share
                </Button>
              </div>
            </Card>

            {/* Booking Section */}
            {!showQR && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Book a Slot</h2>
                <SlotBooking 
                  gymId={gym.id} 
                  slots={gym.slots}
                  onBookSlot={bookSlot}
                />
              </div>
            )}

            {/* QR Code Pass */}
            {booking && showQR && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Gym Pass</h2>
                <QRPass booking={booking} gym={gym} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Card */}
            <Card>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Get Started
              </h3>
              
              <div>
                <p className="text-gray-600 mb-6">
                  Book your workout session now or purchase a membership.
                </p>
                
                {booking ? (
                  <div className="space-y-3">
                    <Button
                      fullWidth
                      variant={showQR ? 'outline' : 'primary'}
                      leftIcon={<Calendar size={16} />}
                      onClick={() => setShowQR(false)}
                    >
                      Book Another Slot
                    </Button>
                    <Button
                      fullWidth
                      variant={showQR ? 'primary' : 'outline'}
                      onClick={() => setShowQR(true)}
                    >
                      View My QR Pass
                    </Button>
                  </div>
                ) : (
                  <Button
                    fullWidth
                    leftIcon={<Calendar size={16} />}
                  >
                    Book Now
                  </Button>
                )}
              </div>
            </Card>

            {/* Map Preview */}
            <Card>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Location</h3>
              <div className="bg-gray-200 h-48 rounded-md mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-blue-100">
                  <MapPin className="h-8 w-8 text-blue-500" />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-2">{gym.location.address}</p>
              <Button fullWidth variant="outline" size="sm">
                Get Directions
              </Button>
            </Card>

            {/* Related Gyms */}
            <Card>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Similar Gyms Nearby</h3>
              <div className="space-y-4">
                {mockGyms
                  .filter(g => g.id !== gym.id)
                  .slice(0, 2)
                  .map(relatedGym => (
                    <Link 
                      key={relatedGym.id} 
                      to={`/gyms/${relatedGym.id}`}
                      className="flex items-start space-x-3 group"
                    >
                      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={relatedGym.image} 
                          alt={relatedGym.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 group-hover:text-blue-600">
                          {relatedGym.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {relatedGym.location.address.split(',')[0]}
                        </p>
                        <div className="flex items-center mt-1 text-sm">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="ml-1 text-gray-700">{relatedGym.rating}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymDetailPage;