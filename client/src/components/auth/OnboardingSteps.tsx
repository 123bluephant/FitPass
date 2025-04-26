import React, { useState } from 'react';
import { MapPin, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { gymCategories } from '../../data/mockData';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';

const OnboardingSteps: React.FC = () => {
  const { user, setGymCategory, setHomeLocation } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setError('');
  };

  const handleCategorySubmit = () => {
    if (!selectedCategory) {
      setError('Please select a gym category');
      return;
    }
    
    setGymCategory(selectedCategory);
    setStep(2);
  };

  const handleLocationSubmit = () => {
    if (!address.trim()) {
      setError('Please enter your address');
      return;
    }
    
    // In a real app, you would geocode the address to get lat/lng
    // For this example, we'll use dummy coordinates
    setHomeLocation(37.7749, -122.4194, address);
    navigate('/gyms');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container mx-auto px-4 max-w-2xl">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className={`h-1 w-16 md:w-32 ${step >= 1 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
        <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
          step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
        }`}>
          1
        </div>
        <div className={`h-1 w-16 md:w-32 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
        <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
          step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
        }`}>
          2
        </div>
        <div className={`h-1 w-16 md:w-32 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
      </div>

      <Card className="w-full">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-6">Select Gym Category</h2>
            <p className="text-gray-600 text-center mb-6">
              Choose the gym category that suits your fitness needs
            </p>
            
            {error && <p className="text-red-600 text-center mb-4">{error}</p>}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {gymCategories.map((category) => (
                <div
                  key={category}
                  className={`
                    border rounded-lg p-4 cursor-pointer transition-all
                    ${selectedCategory === category 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-400'}
                  `}
                  onClick={() => handleCategorySelect(category)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{category}</h3>
                    {selectedCategory === category && (
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  
                  <div className="mt-2 text-sm text-gray-600">
                    {category === 'Basic' && 'Access to standard equipment at affordable prices'}
                    {category === 'Premium' && 'Enhanced features like classes and trainer access'}
                    {category === 'Elite' && 'Full access to all premium gyms and amenities'}
                  </div>
                  
                  <div className="mt-3 font-semibold">
                    {category === 'Basic' && '$29.99/month'}
                    {category === 'Premium' && '$59.99/month'}
                    {category === 'Elite' && '$99.99/month'}
                  </div>
                </div>
              ))}
            </div>
            
            <Button fullWidth onClick={handleCategorySubmit}>
              Continue
            </Button>
          </div>
        )}
        
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-6">Set Your Location</h2>
            <p className="text-gray-600 text-center mb-6">
              Add your home or work address to find gyms near you
            </p>
            
            {error && <p className="text-red-600 text-center mb-4">{error}</p>}
            
            <div className="space-y-4 mb-6">
              <Input
                label="Your Address"
                placeholder="Enter your full address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
                leftIcon={<MapPin size={16} />}
              />
              
              <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-600">
                <p className="font-medium mb-1">Why we need your location:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Find gyms near you</li>
                  <li>Calculate distance and travel time</li>
                  <li>Personalize gym recommendations</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              <Button fullWidth onClick={handleLocationSubmit}>
                Complete Setup
              </Button>
              <Button variant="ghost" onClick={() => setStep(1)}>
                Back to Categories
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default OnboardingSteps;