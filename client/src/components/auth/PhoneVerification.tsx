// components/auth/PhoneVerification.tsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';

const PhoneVerification: React.FC = () => {
  const { login } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'phone') {
      setStep('otp');
    } else {
      login();
    }
  };

  return (
    <div className="bg-white py-8 px-4 shadow-sm rounded-lg border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 'phone' ? (
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
        ) : (
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
        )}

        <Button type="submit" fullWidth>
          {step === 'phone' ? 'Send Verification Code' : 'Verify Code'}
        </Button>
      </form>
    </div>
  );
};

export default PhoneVerification;