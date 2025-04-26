import React from 'react';
import { ChevronLeft, Clock, Flame, Award, Bookmark, Share2, Calendar } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
}

interface WorkoutDetailProps {
  workouts: Array<{
    id: number;
    name: string;
    duration: string;
    calories: string;
    lastCompleted: string | null;
    exercises: Exercise[];
    favorite: boolean;
  }>;
}

const WorkoutDetail: React.FC<WorkoutDetailProps> = ({ workouts }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const workout = workouts.find(w => w.id === parseInt(id || '0'));

  if (!workout) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Workout Not Found</h1>
          <button 
            onClick={() => navigate('/workouts')}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg"
          >
            Back to Workouts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/workouts')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ChevronLeft className="mr-1" /> Back to Workouts
        </button>

        {/* Workout Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-100">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{workout.name}</h1>
                {workout.lastCompleted && (
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <Calendar size={16} />
                    <span>Last completed: {workout.lastCompleted}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button 
                  className={`p-2 ${workout.favorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
                >
                  <Bookmark />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-600">
                  <Share2 />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                <Clock className="text-blue-600" size={18} />
                <span className="text-gray-700">{workout.duration}</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                <Flame className="text-blue-600" size={18} />
                <span className="text-gray-700">{workout.calories} calories</span>
              </div>
            </div>

            <button 
              onClick={() => navigate(`/workouts/track/${workout.id}`)}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all"
            >
              Start This Workout
            </button>
          </div>
        </div>

        {/* Exercises */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Exercises</h2>
          </div>

          <div className="divide-y divide-gray-100">
            {workout.exercises.map((exercise, index) => (
              <div key={index} className="p-6">
                <h3 className="font-semibold text-lg text-gray-900 mb-3">{exercise.name}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Sets</p>
                    <p className="text-gray-900 font-medium">{exercise.sets}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Reps</p>
                    <p className="text-gray-900 font-medium">{exercise.reps}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetail;