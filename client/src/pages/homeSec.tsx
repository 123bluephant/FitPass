import React from 'react';
import { Dumbbell, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50">



      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Workout Section */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
            <div className="mb-4 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg mr-3">
                  <Dumbbell className="text-white" size={24} />
                </span>
                Recommended Workouts
              </h2>
              <p className="text-gray-500 mt-2">Tailored workouts for your fitness level</p>
            </div>
            <button
            onClick={() => navigate("/Workout") }
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium group">
              View All
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                <ArrowRight size={18} />
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workouts.map((workout) => (
              <div
                key={workout.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={workout.image}
                    alt={workout.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <span className="text-white font-medium">{workout.intensity}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 text-gray-900">{workout.title}</h3>
                  <div className="flex justify-between text-gray-600 mb-4">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {workout.duration}
                    </span>
                  </div>
                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg">
                    Start Workout
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
            <div className="mb-4 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg mr-3">
                  <ShoppingBag className="text-white" size={24} />
                </span>
                Featured Products
              </h2>
              <p className="text-gray-500 mt-2">Quality equipment for your fitness journey</p>
            </div>
            <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium group">
              View All
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                <ArrowRight size={18} />
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm flex items-center">
                    <span className="text-yellow-500 mr-1">⭐</span>
                    <span className="font-medium text-gray-800">{product.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 text-gray-900">{product.name}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {product.price}
                    </span>
                  </div>
                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeSections;