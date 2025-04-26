import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  User as UserIcon,
  MapPin,
  CreditCard,
  Package,
  Calendar,
  Settings,
  LogOut,
  Badge
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiEdit, FiUser, FiCalendar, FiMapPin, FiTarget } from 'react-icons/fi';
import { div } from 'framer-motion/client';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { gymCategories } from '../data/mockData';

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

// Type definitions
type HomeLocation = {
  address?: string;
  city?: string;
  country?: string;
};

type UserType = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  gymCategory?: 'Basic' | 'Premium' | 'Elite';
  homeLocation?: HomeLocation;
};

type ProfileNavItemProps = {
  icon: React.ReactNode;
  text: string;
  isActive?: boolean;
  onClick?: () => void;
};

const ProfileNavItem: React.FC<ProfileNavItemProps> = ({
  icon,
  text,
  isActive = false,
  onClick
}) => {
  return (
    <button
      type="button"
      className={`w-full px-4 py-3 flex items-center text-left ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
        }`}
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      <span className={isActive ? 'font-medium' : ''}>{text}</span>
    </button>
  );
};

const ProfilePage: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const safeUser = user as UserType | null;

  if (!isAuthenticated || !safeUser) {
    return <Navigate to="/login" replace />;
  }

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'Basic':
        return 'bg-blue-100 text-blue-800';
      case 'Premium':
        return 'bg-purple-100 text-purple-800';
      case 'Elite':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMonthlyPrice = (category?: string) => {
    switch (category) {
      case 'Basic':
        return '29.99';
      case 'Premium':
        return '59.99';
      case 'Elite':
        return '99.99';
      default:
        return '29.99';
    }
  };
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<OnboardingData | null>(null);


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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div>
            <Card className="mb-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <UserIcon className="h-12 w-12 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  {safeUser.name || 'FitPass User'}
                </h2>
                <p className="text-gray-600 mt-1">
                  {safeUser.phone || 'No phone number provided'}
                </p>

                {safeUser.gymCategory && (
                  <div className="mt-3 flex justify-center">
                    <Badge

                      className={`${getCategoryColor(safeUser.gymCategory)} primary`}
                    >
                      {safeUser.gymCategory} Membership
                    </Badge>
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                <p className="text-gray-600">Basic details about you</p>
              </div>


              <div className="space-y-4 pl-14">
                <div>
                  <label className="text-sm text-gray-500">Full Name</label>
                  <p className="text-gray-800 font-medium">{profileData?.name}</p>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="divide-y divide-gray-200">
                <ProfileNavItem
                  icon={<UserIcon size={18} />}
                  text="Personal Information"
                  isActive={true}
                />
                <ProfileNavItem
                  icon={<CreditCard size={18} />}
                  text="Membership & Billing"
                />
                <ProfileNavItem
                  icon={<Package size={18} />}
                  text="Order History"
                />
                <ProfileNavItem
                  icon={<Calendar size={18} />}
                  text="Gym Bookings"
                />
                <ProfileNavItem
                  icon={<Settings size={18} />}
                  text="Account Settings"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Gender</label>
                <p className="text-gray-800 font-medium capitalize">{profileData?.gender}</p>
              </div>
            </Card >
          </div>
        </div>

        {/* Account Details Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <FiUser className="w-6 h-6 text-purple-600" />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="px-4 py-2 bg-gray-50 rounded border border-gray-200">
                  {safeUser.name || 'Not set'}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="px-4 py-2 bg-gray-50 rounded border border-gray-200">
                  {safeUser.phone || 'Not provided'}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="px-4 py-2 bg-gray-50 rounded border border-gray-200">
                  {safeUser.email || 'Not set'}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Home Location
                </label>
                <div className="px-4 py-2 bg-gray-50 rounded border border-gray-200 flex items-center">
                  <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                  {safeUser.homeLocation?.address || 'Not set'}
                </div>
              </div>
            </div>
          </div>

          {/* Membership */}
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Membership</h2>
              <span className="px-2 py-1 text-sm font-medium bg-green-100 text-green-800 rounded">Active</span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <div className={`h-12 w-12 rounded-md flex items-center justify-center ${safeUser.gymCategory === 'Basic' ? 'bg-blue-100 text-blue-600' :
                  safeUser.gymCategory === 'Premium' ? 'bg-purple-100 text-purple-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                  <CreditCard className="h-6 w-6" />
                </div>

                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {safeUser.gymCategory || 'Basic'} Membership
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Next billing: June 15, 2025
                  </p>
                  <div className="mt-2">
                    <span className="text-lg font-bold text-blue-600">
                      ${getMonthlyPrice(safeUser.gymCategory)}
                    </span>
                    <span className="text-gray-600">/month</span>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-medium text-gray-900 mb-3">Available Plans</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {gymCategories.map((category) => (
                <div
                  key={category}
                  className={`border rounded-lg p-4 ${safeUser.gymCategory === category
                    ? 'bg-blue-50 border-blue-200'
                    : 'border-gray-200'
                    }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{category}</h4>
                    {safeUser.gymCategory === category && (
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Current</span>
                    )}
                  </div>

                  <div className="text-sm text-gray-600 mb-2">
                    {category === 'Basic' && 'Access to standard gyms'}
                    {category === 'Premium' && 'Access to premium facilities'}
                    {category === 'Elite' && 'Unlimited access to all gyms'}
                  </div>

                  <div className="font-bold text-blue-600 mb-3">
                    ${getMonthlyPrice(category)}
                    <span className="text-sm font-normal text-gray-600">/mo</span>
                  </div>

                  {safeUser.gymCategory !== category && (
                    <Button variant="outline" size="sm" fullWidth>
                      {safeUser.gymCategory &&
                        gymCategories.indexOf(category) > gymCategories.indexOf(safeUser.gymCategory)
                        ? 'Upgrade'
                        : 'Switch Plan'}
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Location</h2>
              <p className="text-gray-600">Where you're working out from</p>
            </div>
          </Card>
        </div>

        <div className="pl-14">
          <p className="text-gray-800 font-medium">{profileData?.location}</p>


          {/* Recent Activity */}
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>

            <div className="space-y-6">
              <div className="relative pl-8 pb-6">
                <div className="absolute top-0 left-0 h-full w-px bg-gray-200" />
                <div className="absolute top-0 left-0 h-4 w-4 rounded-full bg-blue-600 -ml-2" />
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">Gym Visit</h3>
                    <p className="text-sm text-gray-600">FitZone Gym</p>
                  </div>
                  <span className="text-sm text-gray-500">Today</span>
                </div>
              </div>

              <div className="relative pl-8 pb-6">
                <div className="absolute top-0 left-0 h-full w-px bg-gray-200" />
                <div className="absolute top-0 left-0 h-4 w-4 rounded-full bg-green-600 -ml-2" />
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">Order Placed</h3>
                    <p className="text-sm text-gray-600">Premium Protein Shake</p>
                  </div>
                  <span className="text-sm text-gray-500">Yesterday</span>
                </div>
              </div>

              <div className="relative pl-8">
                <div className="absolute top-0 left-0 h-full w-px bg-gray-200" />
                <div className="absolute top-0 left-0 h-4 w-4 rounded-full bg-purple-600 -ml-2" />
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">Slot Booked</h3>
                    <p className="text-sm text-gray-600">Yoga Bliss Studio - Evening Class</p>
                  </div>
                  <span className="text-sm text-gray-500">May 28, 2025</span>
                </div>
              </div>
            </div>
          </Card>
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


      </motion.div >
    </div >
  );
};

export default ProfilePage;