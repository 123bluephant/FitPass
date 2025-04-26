import React from 'react';
import { Dumbbell, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WorkoutCategory = () => {
  const navigate = useNavigate();
  
  const category = {
    id: 1,
    name: 'Strength Training',
    description: 'Build muscle and increase strength with these structured programs focusing on compound lifts and progressive overload.'
  };

  const workouts = [
    {
      id: 1,
      title: '4-Week Strength Builder',
      duration: '45-60 mins',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80'
    },
    {
      id: 2,
      title: 'Powerlifting Fundamentals',
      duration: '60-75 mins',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    },
    {
      id: 3,
      title: 'Beginner Strength Program',
      duration: '30-45 mins',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/workouts/library')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 bg-transparent border-none cursor-pointer"
        >
          <ChevronLeft className="mr-1" /> Back to Library
        </button>

        {/* Category Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg">
            <Dumbbell className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{category.name}</h1>
            <p className="text-gray-600">{category.description}</p>
          </div>
        </div>

        {/* Workouts List */}
        <div className="space-y-6">
          {workouts.map(workout => (
            <button
              key={workout.id}
              onClick={() => navigate(`/workouts/${workout.id}`)}
              className="block bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all border border-gray-100 w-full text-left"
            >
              <div className="flex">
                <div className="w-1/3">
                  <img 
                    src={workout.image} 
                    alt={workout.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-2/3 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{workout.title}</h2>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{workout.duration}</span>
                    <span>{workout.level}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutCategory;