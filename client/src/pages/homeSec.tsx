import React from 'react';
import { Dumbbell, ShoppingBag, ArrowRight } from 'lucide-react';

const HomeSections = () => {
  // Sample workout data
  const workouts = [
    {
      id: 1,
      title: 'Full Body Workout',
      duration: '30 mins',
      intensity: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    },
    {
      id: 2,
      title: 'HIIT Training',
      duration: '20 mins',
      intensity: 'Advanced',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    },
    {
      id: 3,
      title: 'Yoga Flow',
      duration: '45 mins',
      intensity: 'Beginner',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    }
  ];

  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Premium Dumbbell Set',
      price: '$89.99',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80'
    },
    {
      id: 2,
      name: 'Resistance Bands',
      price: '$24.99',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1595079835353-aaf9c6c9ce1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    },
    {
      id: 3,
      name: 'Foam Roller',
      price: '$19.99',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Workout Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center">
            <Dumbbell className="mr-2 text-blue-600" size={24} />
            Recommended Workouts
          </h2>
          <button className="text-blue-600 hover:text-blue-800 flex items-center">
            View All <ArrowRight className="ml-1" size={18} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <div key={workout.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src={workout.image} 
                  alt={workout.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{workout.title}</h3>
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>{workout.duration}</span>
                  <span>{workout.intensity}</span>
                </div>
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300">
                  Start Workout
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center">
            <ShoppingBag className="mr-2 text-blue-600" size={24} />
            Featured Products
          </h2>
          <button className="text-blue-600 hover:text-blue-800 flex items-center">
            View All <ArrowRight className="ml-1" size={18} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-blue-600">{product.price}</span>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    ⭐ {product.rating}
                  </span>
                </div>
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeSections;