import React, { useState } from 'react';
import { Dumbbell, Plus, Clock, Flame, X, ChevronDown, ChevronUp, Bookmark, History, Award, Calendar } from 'lucide-react';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import WorkoutTracking from '../components/workout/WorkoutTracking';
import WorkoutHistory from '../components/workout/WorkoutHistory';
import WorkoutLibrary from '../components/workout/WorkoutLib';
import WorkoutDetail from '../components/workout/WorkoutDetail';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
}

interface Workout {
  id: number;
  name: string;
  duration: string;
  calories: string;
  lastCompleted: string | null;
  exercises: Exercise[];
  expanded: boolean;
  favorite: boolean;
}

const WorkoutPage = () => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      id: 1,
      name: 'Full Body Circuit',
      duration: '45 mins',
      calories: '320',
      lastCompleted: '2023-06-15',
      exercises: [
        { name: 'Squats', sets: 3, reps: 12 },
        { name: 'Push-ups', sets: 3, reps: 15 },
        { name: 'Lunges', sets: 3, reps: 10 },
      ],
      expanded: false,
      favorite: true
    },
    {
      id: 2,
      name: 'HIIT Blast',
      duration: '30 mins',
      calories: '400',
      lastCompleted: '2023-06-10',
      exercises: [
        { name: 'Burpees', sets: 4, reps: 10 },
        { name: 'Jump Squats', sets: 3, reps: 15 },
        { name: 'Mountain Climbers', sets: 3, reps: 20 },
      ],
      expanded: false,
      favorite: false
    }
  ]);

  const [newWorkout, setNewWorkout] = useState({
    name: '',
    duration: '',
    calories: '',
    exercises: [{ name: '', sets: '', reps: '' }] as Array<{name: string, sets: string, reps: string}>
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const toggleExpand = (id: number) => {
    setWorkouts(workouts.map(workout => 
      workout.id === id ? { ...workout, expanded: !workout.expanded } : workout
    ));
  };

  const toggleFavorite = (id: number) => {
    setWorkouts(workouts.map(workout => 
      workout.id === id ? { ...workout, favorite: !workout.favorite } : workout
    ));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewWorkout({ ...newWorkout, [name]: value });
  };

  const handleExerciseChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedExercises = [...newWorkout.exercises];
    updatedExercises[index] = { ...updatedExercises[index], [name]: value };
    setNewWorkout({ ...newWorkout, exercises: updatedExercises });
  };

  const addExerciseField = () => {
    setNewWorkout({ 
      ...newWorkout, 
      exercises: [...newWorkout.exercises, { name: '', sets: '', reps: '' }]
    });
  };

  const removeExerciseField = (index: number) => {
    const updatedExercises = newWorkout.exercises.filter((_, i) => i !== index);
    setNewWorkout({ ...newWorkout, exercises: updatedExercises });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const workoutToAdd = {
      id: workouts.length > 0 ? Math.max(...workouts.map(w => w.id)) + 1 : 1,
      name: newWorkout.name,
      duration: newWorkout.duration,
      calories: newWorkout.calories,
      exercises: newWorkout.exercises.map(ex => ({
        name: ex.name,
        sets: Number(ex.sets),
        reps: Number(ex.reps)
      })),
      expanded: false,
      favorite: false,
      lastCompleted: null
    };
    setWorkouts([...workouts, workoutToAdd]);
    setNewWorkout({
      name: '',
      duration: '',
      calories: '',
      exercises: [{ name: '', sets: '', reps: '' }]
    });
    setShowAddForm(false);
  };

  const deleteWorkout = (id: number) => {
    setWorkouts(workouts.filter(workout => workout.id !== id));
  };

  const navigateToTracking = (id: number) => {
    navigate(`/workouts/track/${id}`);
  };

  const navigateToLibrary = () => {
    navigate('/workouts/library');
  };

  const navigateToHistory = () => {
    navigate('/workouts/history');
  };

  const navigateToWorkoutDetail = (id: number) => {
    navigate(`/workouts/${id}`);
  };

  const completeWorkout = (id: number, duration: string) => {
    setWorkouts(workouts.map(workout => 
      workout.id === id ? { 
        ...workout, 
        lastCompleted: new Date().toISOString().split('T')[0],
        duration: duration 
      } : workout
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Tabs */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Workouts
            </span>
          </h1>
          
          <div className="flex border-b border-gray-200 w-full sm:w-auto">
            <button
              onClick={() => navigate('/workouts')}
              className={`px-4 py-2 font-medium ${location.pathname === '/workouts' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              My Workouts
            </button>
            <button
              onClick={navigateToLibrary}
              className={`px-4 py-2 font-medium ${location.pathname.includes('/library') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Library
            </button>
            <button
              onClick={navigateToHistory}
              className={`px-4 py-2 font-medium ${location.pathname.includes('/history') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              History
            </button>
          </div>
        </div>

        <Routes>
          <Route path="/" element={
            <>
              {/* Action Bar */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{workouts.length} {workouts.length === 1 ? 'workout' : 'workouts'}</span>
                  <span className="text-gray-400">|</span>
                  <span>{workouts.filter(w => w.favorite).length} favorites</span>
                </div>
                <button 
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                >
                  <Plus size={18} /> Add Workout
                </button>
              </div>

              {/* Add Workout Form */}
              {showAddForm && (
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Create New Workout</h2>
                    <button 
                      onClick={() => setShowAddForm(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Workout Name</label>
                        <input
                          type="text"
                          name="name"
                          value={newWorkout.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                          placeholder="Morning Routine"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                        <input
                          type="text"
                          name="duration"
                          value={newWorkout.duration}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                          placeholder="30 mins"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Calories</label>
                        <input
                          type="text"
                          name="calories"
                          value={newWorkout.calories}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                          placeholder="250"
                        />
                      </div>
                    </div>

                    <h3 className="text-lg font-medium text-gray-900 mb-3">Exercises</h3>
                    
                    {newWorkout.exercises.map((exercise, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-end">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Exercise Name</label>
                          <input
                            type="text"
                            name="name"
                            value={exercise.name}
                            onChange={(e) => handleExerciseChange(index, e)}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                            placeholder="Squats"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Sets</label>
                          <input
                            type="number"
                            name="sets"
                            value={exercise.sets}
                            onChange={(e) => handleExerciseChange(index, e)}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                            placeholder="3"
                            min="1"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Reps</label>
                          <input
                            type="number"
                            name="reps"
                            value={exercise.reps}
                            onChange={(e) => handleExerciseChange(index, e)}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                            placeholder="12"
                            min="1"
                          />
                        </div>
                        <div>
                          {newWorkout.exercises.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeExerciseField(index)}
                              className="w-full py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-between mt-6">
                      <button
                        type="button"
                        onClick={addExerciseField}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                      >
                        <Plus size={16} /> Add Another Exercise
                      </button>
                      
                      <div className="space-x-3">
                        <button
                          type="button"
                          onClick={() => setShowAddForm(false)}
                          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                        >
                          Save Workout
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Workouts List */}
              <div className="space-y-4">
                {workouts.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
                    <Dumbbell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Workouts Yet</h3>
                    <p className="text-gray-600 mb-4">Create your first workout to get started</p>
                    <button 
                      onClick={() => setShowAddForm(true)}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                    >
                      <Plus size={16} /> Add Workout
                    </button>
                  </div>
                ) : (
                  workouts.map(workout => (
                    <div key={workout.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                      <div className="p-5">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <button 
                                onClick={() => toggleFavorite(workout.id)}
                                className={`${workout.favorite ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-500'}`}
                              >
                                <Bookmark size={18} />
                              </button>
                              {workout.lastCompleted && (
                                <span className="flex items-center gap-1 text-xs text-gray-500">
                                  <Calendar size={14} /> {workout.lastCompleted}
                                </span>
                              )}
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">{workout.name}</h2>
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => toggleExpand(workout.id)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              {workout.expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </button>
                            <button 
                              onClick={() => deleteWorkout(workout.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock size={16} /> {workout.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame size={16} /> {workout.calories} cal
                          </span>
                        </div>

                        <div className="mt-4 flex gap-2">
                          <button 
                            onClick={() => navigateToTracking(workout.id)}
                            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm hover:from-blue-700 hover:to-blue-800 transition-all"
                          >
                            Start Workout
                          </button>
                          <button 
                            onClick={() => navigateToWorkoutDetail(workout.id)}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                          >
                            View Details
                          </button>
                        </div>
                      </div>

                      {workout.expanded && (
                        <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
                          <h3 className="font-medium text-gray-900 mb-3">Exercises</h3>
                          <div className="space-y-3">
                            {workout.exercises.map((exercise, index) => (
                              <div key={index} className="grid grid-cols-3 gap-4 bg-white p-3 rounded-lg border border-gray-100">
                                <div>
                                  <p className="text-sm font-medium text-gray-700">Exercise</p>
                                  <p className="text-gray-900">{exercise.name}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-700">Sets</p>
                                  <p className="text-gray-900">{exercise.sets}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-700">Reps</p>
                                  <p className="text-gray-900">{exercise.reps}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </>
          } />
          <Route path="/track/:id" element={
            <WorkoutTracking 
              workouts={workouts} 
              onComplete={completeWorkout} 
            />
          } />
          <Route path="/history" element={<WorkoutHistory workouts={workouts} onComplete={completeWorkout} />} />
          <Route path="/library" element={<WorkoutLibrary />} />
          <Route path="/:id" element={<WorkoutDetail workouts={workouts} />} />
        </Routes>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Need Help With Your Workouts?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Our certified trainers can create personalized workout plans tailored to your goals and fitness level.
          </p>
          <Link 
            to="/contact" 
            className="inline-block px-6 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Contact a Trainer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPage;