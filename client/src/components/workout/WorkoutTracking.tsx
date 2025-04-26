import React, { useState, useEffect } from 'react';
import { ChevronLeft, Check, X, Clock, Flame, ChevronRight, Pause, Play } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

interface Exercise {
  name: string;
  sets: Array<{
    set: number;
    weight: string;
    reps: string;
    completed: boolean;
  }>;
}

interface Workout {
  id: number;
  title: string;
  exercises: Exercise[];
}

interface WorkoutTrackingProps {
  workouts: Array<{
    id: number;
    name: string;
    exercises: Array<{
      name: string;
      sets: number;
      reps: number;
    }>;
  }>;
  onComplete: (id: number, duration: string) => void;
}

const WorkoutTracking: React.FC<WorkoutTrackingProps> = ({ workouts, onComplete }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [workoutComplete, setWorkoutComplete] = useState(false);

  useEffect(() => {
    const foundWorkout = workouts.find(w => w.id === parseInt(id || '0'));
    if (foundWorkout) {
      setWorkout({
        id: foundWorkout.id,
        title: foundWorkout.name,
        exercises: foundWorkout.exercises.map(exercise => ({
          name: exercise.name,
          sets: Array.from({ length: exercise.sets }, (_, i) => ({
            set: i + 1,
            weight: '',
            reps: '',
            completed: false
          }))
        }))
      });
    } else {
      navigate('/workouts');
    }
  }, [id, workouts, navigate]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleSetComplete = (exerciseIndex: number, setIndex: number) => {
    if (!workout) return;
    
    const updatedWorkout = { ...workout };
    updatedWorkout.exercises[exerciseIndex].sets[setIndex].completed = true;
    setWorkout(updatedWorkout);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const handleNextExercise = () => {
    if (!workout) return;
    
    if (currentExercise < workout.exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
    } else {
      onComplete(workout.id, formatTime(timer));
      setWorkoutComplete(true);
    }
  };

  const handlePreviousExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(prev => prev - 1);
    }
  };

  if (workoutComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="bg-green-100 p-4 rounded-full inline-block mb-6">
            <Check className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Workout Complete!</h1>
          <p className="text-gray-600 mb-6">
            Great job completing your {workout?.title} workout in {formatTime(timer)}.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('/workouts/history')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all"
            >
              View Workout History
            </button>
            <button
              onClick={() => navigate('/workouts')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Back to Workouts
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading workout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate(`/workouts/${id}`)}
            className="flex items-center text-blue-600 hover:text-blue-800 bg-transparent border-none"
          >
            <ChevronLeft className="mr-1" /> Back
          </button>
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleTimer}
              className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
            >
              {isRunning ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              <Clock size={16} />
              <span>{formatTime(timer)}</span>
            </div>
          </div>
        </div>

        {/* Workout Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{workout.title}</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <span>Exercise {currentExercise + 1} of {workout.exercises.length}</span>
          </div>
        </div>

        {/* Current Exercise */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-100">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4">
            <h2 className="font-semibold text-lg">
              {workout.exercises[currentExercise].name}
            </h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {workout.exercises[currentExercise].sets.map((set, setIndex) => (
                <div 
                  key={setIndex} 
                  className={`p-4 rounded-lg border ${set.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Set {set.set}</span>
                    {set.completed ? (
                      <span className="text-green-600 flex items-center">
                        <Check className="mr-1" size={16} /> Completed
                      </span>
                    ) : (
                      <button 
                        onClick={() => handleSetComplete(currentExercise, setIndex)}
                        className="text-blue-600 hover:text-blue-800 bg-transparent border-none"
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Weight (kg)</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="0"
                        disabled={set.completed}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Reps</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="0"
                        disabled={set.completed}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button 
            className={`px-6 py-3 rounded-lg flex items-center gap-2 ${currentExercise === 0 ? 'bg-gray-200 text-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            disabled={currentExercise === 0}
            onClick={handlePreviousExercise}
          >
            <ChevronLeft size={16} /> Previous
          </button>
          <button 
            className={`px-6 py-3 rounded-lg flex items-center gap-2 ${currentExercise === workout.exercises.length - 1 ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            onClick={handleNextExercise}
          >
            {currentExercise === workout.exercises.length - 1 ? 'Finish Workout' : 'Next Exercise'}
            {currentExercise < workout.exercises.length - 1 && <ChevronRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutTracking;