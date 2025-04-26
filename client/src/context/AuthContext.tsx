import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, signInWithGoogle as firebaseGoogleSignIn } from '../firebase';

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  needsOnboarding: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  completeOnboarding: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  needsOnboarding: false,
  login: async () => {},
  logout: () => {},
  signup: async () => {},
  signInWithGoogle: async () => {},
  completeOnboarding: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const { token } = await response.json();
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
    setNeedsOnboarding(true);
    setNeedsOnboarding(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

   const signup = async (email: string, password: string, name: string) => {
    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, username:name }),
    });

    if (!response.ok) {
      throw new Error('Signup failed');
    }

    const { token } = await response.json();
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
    setNeedsOnboarding(true);
    setNeedsOnboarding(true);
  };

  const signInWithGoogle = async () => {
    try {
      const user = await firebaseGoogleSignIn();
      const response = await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: await user.getIdToken() }),
      });
  
      if (!response.ok) {
        throw new Error('Google authentication failed');
      }
  
      const { token } = await response.json();
      localStorage.setItem('authToken', token);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  const completeOnboarding = () => {
    setNeedsOnboarding(false);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isLoading, 
      needsOnboarding,
      login, 
      logout, 
      signup,
      signInWithGoogle,
      completeOnboarding
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};