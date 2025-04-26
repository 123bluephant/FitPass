import React from 'react';
import { Dumbbell, Search, Filter, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const WorkoutLibrary = () => {
  const categories = [
    { id: 1, name: 'Strength Training', count: 24 },
    { id: 2, name: 'HIIT', count: 18 },
    { id: 3, name: 'Yoga', count: 15 },
    { id: 4, name: 'Cardio', count: 12 },
    { id: 5, name: 'Beginner Programs', count: 20 },
    { id: 6, name: 'Advanced Programs', count: 16 }
  ];

  const popularWorkouts = [
    {
      id: 1,
      title: '4-Week Strength Builder',
      category: 'Strength Training',
      duration: '45-60 mins',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80'
    },
    {
      id: 2,
      title: 'Fat Burn HIIT Challenge',
      category: 'HIIT',
      duration: '20-30 mins',
      level: 'Advanced',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    },
    {
      id: 3,
      title: 'Morning Yoga Flow',
      category: 'Yoga',
      duration: '30-45 mins',
      level: 'All Levels',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Workout Library
            </span>
          </h1>
          <p className="text-gray-600">Browse our collection of professional workout programs</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search workouts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <Filter size={18} /> Filters
          </button>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(category => (
              <Link 
                key={category.id} 
                to={`/workouts/category/${category.id}`}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} programs</p>
                </div>
                <ChevronRight className="text-gray-400" />
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Workouts */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Popular Workouts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularWorkouts.map(workout => (
              <div key={workout.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all border border-gray-100">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={workout.image} 
                    alt={workout.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-900">{workout.title}</h3>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {workout.category}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>{workout.duration}</span>
                    <span>{workout.level}</span>
                  </div>
                  <Link 
                    to={`/workouts/${workout.id}`}
                    className="block w-full py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-center rounded-lg transition-all"
                  >
                    View Program
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutLibrary;