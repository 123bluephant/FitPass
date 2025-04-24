import React, { useState } from 'react';
import { Calendar, Clock, Users, Check } from 'lucide-react';
import { Slot, Booking } from '../../types';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface SlotBookingProps {
  gymId: string;
  slots: Slot[];
  onBookSlot: (slotId: string) => Promise<Booking | null>;
}

const SlotBooking: React.FC<SlotBookingProps> = ({ gymId, slots, onBookSlot }) => {
  const [selectedDate, setSelectedDate] = useState<string>(slots[0]?.date || '');
  const [isLoading, setIsLoading] = useState(false);
  const [bookedSlotId, setBookedSlotId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dateOptions: string[] = [...new Set(slots.map(slot => slot.date))];
  
  const filteredSlots = slots.filter(slot => slot.date === selectedDate);

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(e.target.value);
    setError(null);
  };

  const handleBookSlot = async (slotId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const booking = await onBookSlot(slotId);
      if (booking) {
        setBookedSlotId(slotId);
      } else {
        setError('Failed to book slot. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getAvailabilityColor = (slot: Slot) => {
    const availabilityPercentage = (slot.booked / slot.capacity) * 100;
    if (availabilityPercentage < 50) return 'bg-green-500';
    if (availabilityPercentage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (slots.length === 0) {
    return (
      <Card className="text-center p-6">
        <h3 className="text-lg font-medium text-gray-900">No Slots Available</h3>
        <p className="text-gray-600 mt-2">
          There are currently no available slots for this gym. Please check back later.
        </p>
      </Card>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2 md:mb-0">Available Slots</h3>
        
        <div className="w-full md:w-auto">
          <div className="flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-gray-500" />
            <select
              value={selectedDate}
              onChange={handleDateChange}
              className="form-select rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {dateOptions.map(date => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                  })}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSlots.map(slot => (
          <Card key={slot.id} className="border border-gray-200">
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center text-gray-900">
                    <Clock className="mr-2 h-4 w-4" />
                    <span className="font-medium">
                      {slot.startTime} - {slot.endTime}
                    </span>
                  </div>
                  
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <Users className="mr-1 h-4 w-4" />
                    <span>
                      {slot.capacity - slot.booked} spots left of {slot.capacity}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="flex items-center mb-1">
                    <span className={`h-2 w-2 rounded-full ${getAvailabilityColor(slot)} mr-1`}></span>
                    <span className="text-xs text-gray-500">
                      {slot.booked >= slot.capacity
                        ? 'Full'
                        : slot.booked >= slot.capacity * 0.8
                        ? 'Almost Full'
                        : 'Available'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-2">
                {bookedSlotId === slot.id ? (
                  <Button
                    variant="ghost"
                    className="w-full bg-green-50 text-green-600 border border-green-200"
                    leftIcon={<Check className="h-4 w-4" />}
                    disabled
                  >
                    Booked Successfully
                  </Button>
                ) : (
                  <Button
                    variant={slot.booked >= slot.capacity ? 'outline' : 'primary'}
                    className="w-full"
                    disabled={slot.booked >= slot.capacity || isLoading}
                    isLoading={isLoading && !bookedSlotId}
                    onClick={() => handleBookSlot(slot.id)}
                  >
                    {slot.booked >= slot.capacity ? 'Fully Booked' : 'Book Slot'}
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SlotBooking;