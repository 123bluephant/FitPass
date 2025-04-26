import React from 'react';
import { ChevronLeft, Calendar, Flame, Award, Clock, Activity, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WorkoutHistory = () => {
  const workouts = [
    {
      id: 1,
      date: '2023-06-15',
      name: 'Full Body Strength',
      duration: '52 mins',
      calories: '420',
      exercises: 8,
      personalRecord: true
    },
    {
      id: 2,
      date: '2023-06-13',
      name: 'Upper Body Focus',
      duration: '45 mins',
      calories: '380',
      exercises: 6,
      personalRecord: false
    },
    {
      id: 3,
      date: '2023-06-10',
      name: 'HIIT Cardio',
      duration: '30 mins',
      calories: '450',
      exercises: 12,
      personalRecord: false
    }
  ];
  const navigate = useNavigate();

  const stats = {
    totalWorkouts: 24,
    totalHours: 18.5,
    caloriesBurned: 9800,
    personalRecords: 5,
    streak: 7
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate('/workouts')}
            className="flex items-center text-blue-600 hover:text-blue-800 bg-transparent border-none"
          >
            <ChevronLeft className="mr-1" /> Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Workout History</h1>
          <div></div> {/* Empty div for spacing */}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Total Workouts</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalWorkouts}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Total Hours</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalHours}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Calories</p>
            <p className="text-2xl font-bold text-gray-900">{stats.caloriesBurned.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">PRs</p>
            <p className="text-2xl font-bold text-gray-900">{stats.personalRecords}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm">Day Streak</p>
            <p className="text-2xl font-bold text-gray-900">{stats.streak}</p>
          </div>
        </div>

        {/* Calendar View Placeholder */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">June 2023</h2>
            <div className="flex gap-2">
              <button className="p-2 bg-gray-100 rounded-lg">
                <ChevronLeft size={16} />
              </button>
              <button className="p-2 bg-gray-100 rounded-lg">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
              <div key={day} className="text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
            {Array(35).fill(0).map((_, i) => (
              <div 
                key={i} 
                className={`p-2 rounded-full ${i === 14 ? 'bg-blue-100 text-blue-600' : 'text-gray-700'}`}
              >
                {i < 5 || i > 25 ? '' : i - 4}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Workouts */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Workouts</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          {workouts.map(workout => (
            <div key={workout.id} className="border-b border-gray-100 last:border-b-0">
              <div className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="text-gray-400" size={16} />
                      <span className="text-sm text-gray-500">{workout.date}</span>
                      {workout.personalRecord && (
                        <span className="flex items-center text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          <Award className="mr-1" size={12} /> PR
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{workout.name}</h3>
                  </div>
                  <button 
                    onClick={() => navigate(`/workouts/history/${workout.id}`)}
                    className="text-blue-600 hover:text-blue-800 text-sm bg-transparent border-none"
                  >
                    View Details
                  </button>
                </div>
                
                <div className="flex gap-4 mt-3">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock size={14} /> {workout.duration}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Flame size={14} /> {workout.calories} cal
                  </div>
                  <div className="text-sm text-gray-600">
                    {workout.exercises} exercises
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-6 text-center">
          <button 
            onClick={() => navigate('/workouts')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            View All Workouts
          </button>
        </div>

        {/* Progress Chart Placeholder */}
        <div className="mt-12 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Monthly Progress</h2>
            <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
              <option>Last 3 Months</option>
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <Activity className="mx-auto h-12 w-12 text-gray-400 mb-2" />
              <p className="text-gray-500">Workout progress chart</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutHistory;