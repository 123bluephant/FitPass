import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiEdit, FiUser, FiCalendar, FiMapPin, FiTarget } from 'react-icons/fi';

interface OnboardingData {
  name: string;
  age: number;
  gender: string;
  location: string;
  fitnessGoals: string[];
  userId: {
    email: string;
    username?: string;
  };
}

const ProfilePage: React.FC = () => {
  const { isAuthenticated, isLoading, needsOnboarding } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<OnboardingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5000/api/onboarding', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setProfileData(response.data.data);
      } catch (err) {
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchProfileData();
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (needsOnboarding) {
    navigate('/onboarding');
    return null;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8"
      >
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Profile</h1>
          <button
            onClick={() => navigate('/onboarding')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <FiEdit className="w-5 h-5" />
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Information Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <FiUser className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                <p className="text-gray-600">Basic details about you</p>
              </div>
            </div>

            <div className="space-y-4 pl-14">
              <div>
                <label className="text-sm text-gray-500">Full Name</label>
                <p className="text-gray-800 font-medium">{profileData?.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Age</label>
                <p className="text-gray-800 font-medium">{profileData?.age}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Gender</label>
                <p className="text-gray-800 font-medium capitalize">{profileData?.gender}</p>
              </div>
            </div>
          </div>

          {/* Account Details Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <FiUser className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Account Details</h2>
                <p className="text-gray-600">Login information</p>
              </div>
            </div>

            <div className="space-y-4 pl-14">
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p className="text-gray-800 font-medium">{profileData?.userId.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Username</label>
                <p className="text-gray-800 font-medium">
                  {profileData?.userId.username || 'Not set'}
                </p>
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <FiMapPin className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Location</h2>
                <p className="text-gray-600">Where you're working out from</p>
              </div>
            </div>

            <div className="pl-14">
              <p className="text-gray-800 font-medium">{profileData?.location}</p>
            </div>
          </div>

          {/* Fitness Goals Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <FiTarget className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Fitness Goals</h2>
                <p className="text-gray-600">Your fitness objectives</p>
              </div>
            </div>

            <div className="pl-14">
              <div className="flex flex-wrap gap-2">
                {profileData?.fitnessGoals.map((goal, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {goal}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;