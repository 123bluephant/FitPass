import React from 'react';
import { ChevronLeft, Calendar, Flame, Award, Check, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const WorkoutHistoryDetail = () => {
  const workout = {
    id: 1,
    date: '2023-06-15',
    name: 'Full Body Strength',
    duration: '52 mins',
    calories: '420',
    personalRecord: true,
    exercises: [
      {
        name: 'Squats',
        sets: [
          { weight: '100kg', reps: 8, completed: true },
          { weight: '100kg', reps: 8, completed: true },
          { weight: '105kg', reps: 6, completed: true, pr: true }
        ]
      },
      {
        name: 'Bench Press',
        sets: [
          { weight: '80kg', reps: 8, completed: true },
          { weight: '80kg', reps: 8, completed: true },
          { weight: '85kg', reps: 6, completed: true }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/workouts/history" className="flex items-center text-blue-600 hover:text-blue-800">
            <ChevronLeft className="mr-1" /> Back to History
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Workout Details</h1>
          <div></div> {/* Empty div for spacing */}
        </div>

        {/* Workout Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{workout.name}</h2>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={16} />
                <span>{workout.date}</span>
              </div>
            </div>
            {workout.personalRecord && (
              <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                <Award size={16} /> Personal Record
              </span>
            )}
          </div>

          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Clock className="text-blue-600" size={18} />
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">{workout.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="text-blue-600" size={18} />
              <div>
                <p className="text-sm text-gray-500">Calories</p>
                <p className="font-medium">{workout.calories}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Exercises */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-4 bg-gray-50 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Exercises</h3>
          </div>
          
          {workout.exercises.map((exercise, index) => (
            <div key={index} className="border-b border-gray-100 last:border-b-0">
              <div className="p-4">
                <h4 className="font-medium text-gray-900 mb-3">{exercise.name}</h4>
                
                <div className="space-y-3">
                  {exercise.sets.map((set, setIndex) => (
                    <div 
                      key={setIndex} 
                      className={`p-3 rounded-lg ${set.pr ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'}`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">Set {setIndex + 1}</span>
                        {set.completed && (
                          <span className="text-green-600 flex items-center text-sm">
                            <Check className="mr-1" size={14} /> Completed
                          </span>
                        )}
                        {set.pr && (
                          <span className="text-yellow-600 flex items-center text-sm">
                            <Award className="mr-1" size={14} /> PR
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>{set.weight}</span>
                        <span>{set.reps} reps</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutHistoryDetail;