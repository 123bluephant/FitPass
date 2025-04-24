import React from 'react';
import { Navigate } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  CreditCard, 
  Package, 
  Calendar, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { gymCategories } from '../data/mockData';

const ProfilePage: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const getCategoryColor = (category?: string) => {
    if (category === 'Basic') return 'bg-blue-100 text-blue-800';
    if (category === 'Premium') return 'bg-purple-100 text-purple-800';
    if (category === 'Elite') return 'bg-orange-100 text-orange-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div>
            <Card className="mb-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <User className="h-12 w-12 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  {user.name || 'FitPass User'}
                </h2>
                <p className="text-gray-600 mt-1">{user.phone}</p>
                
                {user.gymCategory && (
                  <div className="mt-3 flex justify-center">
                    <Badge
                      variant="primary"
                      className={getCategoryColor(user.gymCategory)}
                    >
                      {user.gymCategory} Membership
                    </Badge>
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={logout}
                  leftIcon={<LogOut size={16} />}
                >
                  Logout
                </Button>
              </div>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="divide-y divide-gray-200">
                <ProfileNavItem
                  icon={<User size={18} />}
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
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="px-4 py-2 bg-gray-50 rounded border border-gray-200">
                    {user.name || 'Not set'}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="px-4 py-2 bg-gray-50 rounded border border-gray-200">
                    {user.phone}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="px-4 py-2 bg-gray-50 rounded border border-gray-200">
                    {user.email || 'Not set'}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Home Location</label>
                  <div className="px-4 py-2 bg-gray-50 rounded border border-gray-200 flex items-center">
                    <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                    {user.homeLocation?.address || 'Not set'}
                  </div>
                </div>
              </div>
            </Card>

            {/* Membership */}
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Membership</h2>
                <Badge
                  variant="success"
                >
                  Active
                </Badge>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <div className={`h-12 w-12 rounded-md flex items-center justify-center ${
                    user.gymCategory === 'Basic' ? 'bg-blue-100 text-blue-600' :
                    user.gymCategory === 'Premium' ? 'bg-purple-100 text-purple-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    <CreditCard className="h-6 w-6" />
                  </div>
                  
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {user.gymCategory || 'Basic'} Membership
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Next billing: June 15, 2025
                    </p>
                    <div className="mt-2">
                      <span className="text-lg font-bold text-blue-600">
                        ${user.gymCategory === 'Basic' ? '29.99' : 
                          user.gymCategory === 'Premium' ? '59.99' : '99.99'}
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
                    className={`
                      border rounded-lg p-4 
                      ${user.gymCategory === category 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'border-gray-200'}
                    `}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{category}</h4>
                      {user.gymCategory === category && (
                        <Badge variant="primary" size="sm">Current</Badge>
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-2">
                      {category === 'Basic' && 'Access to standard gyms'}
                      {category === 'Premium' && 'Access to premium facilities'}
                      {category === 'Elite' && 'Unlimited access to all gyms'}
                    </div>
                    
                    <div className="font-bold text-blue-600 mb-3">
                      ${category === 'Basic' ? '29.99' : 
                        category === 'Premium' ? '59.99' : '99.99'}
                      <span className="text-sm font-normal text-gray-600">/mo</span>
                    </div>
                    
                    {user.gymCategory !== category && (
                      <Button variant="outline" size="sm" fullWidth>
                        {user.gymCategory && 
                         gymCategories.indexOf(category) > gymCategories.indexOf(user.gymCategory) 
                          ? 'Upgrade' 
                          : 'Switch Plan'}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                <p className="font-medium mb-1">Need help with your membership?</p>
                <p>Contact our support team at support@fitpass.com or call 1-800-FIT-PASS.</p>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              
              <div className="space-y-6">
                <div className="relative pl-8 pb-6">
                  <div className="absolute top-0 left-0 h-full w-px bg-gray-200"></div>
                  <div className="absolute top-0 left-0 h-4 w-4 rounded-full bg-blue-600 -ml-2"></div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">Gym Visit</h3>
                      <p className="text-sm text-gray-600">FitZone Gym</p>
                    </div>
                    <span className="text-sm text-gray-500">Today</span>
                  </div>
                </div>
                
                <div className="relative pl-8 pb-6">
                  <div className="absolute top-0 left-0 h-full w-px bg-gray-200"></div>
                  <div className="absolute top-0 left-0 h-4 w-4 rounded-full bg-green-600 -ml-2"></div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">Order Placed</h3>
                      <p className="text-sm text-gray-600">Premium Protein Shake</p>
                    </div>
                    <span className="text-sm text-gray-500">Yesterday</span>
                  </div>
                </div>
                
                <div className="relative pl-8">
                  <div className="absolute top-0 left-0 h-full w-px bg-gray-200"></div>
                  <div className="absolute top-0 left-0 h-4 w-4 rounded-full bg-purple-600 -ml-2"></div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">Slot Booked</h3>
                      <p className="text-sm text-gray-600">Yoga Bliss Studio - Evening Class</p>
                    </div>
                    <span className="text-sm text-gray-500">May 28, 2025</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline" size="sm">View All Activity</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileNavItem: React.FC<{
  icon: React.ReactNode;
  text: string;
  isActive?: boolean;
  onClick?: () => void;
}> = ({ icon, text, isActive = false, onClick }) => {
  return (
    <button
      className={`w-full px-4 py-3 flex items-center text-left ${
        isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      <span className={isActive ? 'font-medium' : ''}>{text}</span>
    </button>
  );
};

export default ProfilePage;