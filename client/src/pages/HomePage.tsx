import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Search, CreditCard, Map, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import HomeSections from './homeSec';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Dumbbell className="h-8 w-8 text-blue-600" />,
      title: 'Access to 1000+ Gyms',
      description: 'One membership, unlimited access to gyms across the country.'
    },
    {
      icon: <Search className="h-8 w-8 text-blue-600" />,
      title: 'Find Gyms Nearby',
      description: 'Easily discover the perfect gym based on your location and preferences.'
    },
    {
      icon: <CreditCard className="h-8 w-8 text-blue-600" />,
      title: 'Flexible Subscriptions',
      description: 'Choose from Basic, Premium, or Elite plans to suit your fitness goals.'
    },
    {
      icon: <Map className="h-8 w-8 text-blue-600" />,
      title: 'Book in Advance',
      description: 'Reserve your slot ahead of time to ensure you never miss a workout.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-20 mb-12 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white" 
                style={{
                  width: `${Math.random() * 20 + 5}px`,
                  height: `${Math.random() * 20 + 5}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.1
                }}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Your Fitness Journey, <br />
              <span className="text-orange-400">Simplified</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl">
              Access thousands of gyms nationwide with a single membership. 
              Book your workouts, track your progress, and shop for fitness essentials all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/gyms">
                <Button size="lg">
                  Find Gyms Near You
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:bg-opacity-10">
                  Browse Fitness Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose FitPass?</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Our platform makes fitness accessible and convenient for everyone, with flexible options that fit your lifestyle.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <HomeSections />

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="bg-blue-600 rounded-2xl overflow-hidden shadow-xl">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready to transform your fitness journey?
                </h2>
                <p className="text-blue-100 mb-8">
                  Join thousands of users who have simplified their workout routine with FitPass. 
                  Start exploring gyms and fitness products today.
                </p>
                
                <Link to="/gyms">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="font-semibold"
                    rightIcon={<ArrowRight size={16} />}
                  >
                    Explore Gyms
                  </Button>
                </Link>
              </div>
              
              <div className="md:w-1/2 bg-blue-700 p-8 md:p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-white/10 p-6 rounded-lg inline-block mb-4">
                    <Dumbbell className="h-16 w-16 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Download Our App</h3>
                  <p className="text-blue-100 mb-4">Get the FitPass mobile app for on-the-go access</p>
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:bg-opacity-10">
                      App Store
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:bg-opacity-10">
                      Google Play
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;