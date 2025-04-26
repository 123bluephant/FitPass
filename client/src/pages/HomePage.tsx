import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Search, CreditCard, Map, ArrowRight, Phone, Mail, MessageSquare } from 'lucide-react';
import Button from '../components/ui/Button';
import HomeSections from './homeSec';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Dumbbell className="h-8 w-8 text-white" />,
      title: 'Access to 1000+ Gyms',
      description: 'One membership, unlimited access to gyms across the country.'
    },
    {
      icon: <Search className="h-8 w-8 text-white" />,
      title: 'Find Gyms Nearby',
      description: 'Easily discover the perfect gym based on your location and preferences.'
    },
    {
      icon: <CreditCard className="h-8 w-8 text-white" />,
      title: 'Flexible Subscriptions',
      description: 'Choose from Basic, Premium, or Elite plans to suit your fitness goals.'
    },
    {
      icon: <Map className="h-8 w-8 text-white" />,
      title: 'Book in Advance',
      description: 'Reserve your slot ahead of time to ensure you never miss a workout.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-24 md:py-32 overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-blue-800/90"></div>
        
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
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Your Fitness Journey, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                Simplified
              </span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Access thousands of gyms nationwide with a single membership. 
              Book your workouts, track your progress, and shop for fitness essentials all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/gyms">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
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
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">FitPass</span>?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Our platform makes fitness accessible and convenient for everyone, with flexible options that fit your lifestyle.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-600 to-blue-700 text-white"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">
                {feature.title}
              </h3>
              <p className="text-blue-100 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Home Sections Component */}
      <HomeSections />

      {/* App CTA Section */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-12 bg-gradient-to-br from-blue-600 to-blue-700">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to transform your fitness journey?
                </h2>
                <p className="text-blue-100 text-lg mb-8">
                  Join thousands of users who have simplified their workout routine with FitPass. 
                  Start exploring gyms and fitness products today.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/gyms">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 font-semibold"
                      rightIcon={<ArrowRight size={16} />}
                    >
                      Explore Gyms
                    </Button>
                  </Link>
                  <Link to="/marketplace">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-white text-white hover:bg-white hover:bg-opacity-10 font-semibold"
                    >
                      Shop Products
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="lg:w-1/2 p-12 bg-gradient-to-br from-blue-700 to-blue-800 flex items-center justify-center">
                <div className="text-center max-w-md">
                  <div className="bg-white/10 p-6 rounded-full inline-block mb-6 backdrop-blur-sm">
                    <Dumbbell className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">Download Our App</h3>
                  <p className="text-blue-100 mb-6">Get the FitPass mobile app for on-the-go access</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button 
                      variant="outline" 
                      className="border-white text-white hover:bg-white hover:bg-opacity-10"
                    >
                      App Store
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-white text-white hover:bg-white hover:bg-opacity-10"
                    >
                      Google Play
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA Section */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-12 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
                <p className="text-blue-100 mb-8">
                  Our team is here to answer your questions and help you get started on your fitness journey.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-white/10 p-3 rounded-full mr-4 backdrop-blur-sm">
                      <Phone className="h-5 w-5" />
                    </div>
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-white/10 p-3 rounded-full mr-4 backdrop-blur-sm">
                      <Mail className="h-5 w-5" />
                    </div>
                    <span>support@fitpass.com</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-white/10 p-3 rounded-full mr-4 backdrop-blur-sm">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <span>Live Chat Support</span>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 p-12 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h3>
                <p className="text-gray-600 mb-6">
                  Have questions about our membership plans or need assistance? 
                  Reach out to our support team anytime.
                </p>
                <Link to="/contact">
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    rightIcon={<ArrowRight size={16} />}
                  >
                    Contact Our Team
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;