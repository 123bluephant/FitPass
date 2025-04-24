import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Dumbbell, User } from 'lucide-react';
import Card from '../ui/Card';
import { Booking, Gym } from '../../types';

interface QRPassProps {
  booking: Booking;
  gym: Gym;
}

const QRPass: React.FC<QRPassProps> = ({ booking, gym }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  
  useEffect(() => {
    // Generate QR code URL using a public API
    // In a real app, you'd generate this server-side
    const qrData = `FitPass Gym Access - ID:${booking.id} - Gym:${gym.name} - Date:${booking.date}`;
    const encodedData = encodeURIComponent(qrData);
    setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedData}`);
  }, [booking, gym]);

  const slot = gym.slots.find(slot => slot.id === booking.slotId);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Dumbbell className="h-6 w-6 mr-2" />
              <h2 className="text-xl font-bold">FitPass</h2>
            </div>
            <div className="text-sm opacity-80">#{booking.id.substring(0, 8)}</div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-center mb-5">
            {qrCodeUrl ? (
              <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-200">
                <img 
                  src={qrCodeUrl} 
                  alt="Gym Access QR Code" 
                  className="h-52 w-52 object-contain"
                />
              </div>
            ) : (
              <div className="h-52 w-52 flex items-center justify-center bg-gray-100 rounded">
                Loading QR Code...
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <div className="flex items-center text-gray-800">
                <Dumbbell className="h-5 w-5 mr-2 text-blue-600" />
                <span className="font-medium">Gym</span>
              </div>
              <div className="text-gray-700">{gym.name}</div>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <div className="flex items-center text-gray-800">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                <span className="font-medium">Member ID</span>
              </div>
              <div className="text-gray-700">{booking.userId.substring(0, 8)}</div>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <div className="flex items-center text-gray-800">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                <span className="font-medium">Date</span>
              </div>
              <div className="text-gray-700">{formatDate(booking.date)}</div>
            </div>
            
            {slot && (
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <div className="flex items-center text-gray-800">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  <span className="font-medium">Time</span>
                </div>
                <div className="text-gray-700">
                  {slot.startTime} - {slot.endTime}
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Present this QR code at the gym reception for entry</p>
            <p className="mt-1">Status: <span className="text-green-600 font-medium">Active</span></p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default QRPass;