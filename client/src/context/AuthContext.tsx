import React, { createContext, useState, useContext, useEffect } from 'react';
import { signInWithGoogle as firebaseGoogleSignIn } from '../firebase';

// Define User type
type User = {
  [x: string]: any;
  id: string;
  email: string;
  name: string;
  // Add other user properties you get from your backend
};

type AuthContextType = {
  user: User | null;
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
  user: null,
  isAuthenticated: false,
  isLoading: true,
<<<<<<< HEAD
  login: async () => { },
  logout: () => { },
  signup: async () => { },
  signInWithGoogle: async () => { },
=======
  needsOnboarding: false,
  login: async () => {},
  logout: () => {},
  signup: async () => {},
  signInWithGoogle: async () => {},
  completeOnboarding: () => {},
>>>>>>> 9aeb743d5d6375eb97cffb1ce803134c289ae6d4
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          // Fetch user data when token exists
          const userData = await fetchUserData(token);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Failed to validate token:', error);
          logout();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const fetchUserData = async (token: string): Promise<User> => {
    const response = await fetch('http://localhost:5000/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return response.json();
  };

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

    const { token, user } = await response.json();
    localStorage.setItem('authToken', token);
    setUser(user);
    setIsAuthenticated(true);
    setNeedsOnboarding(true);
    setNeedsOnboarding(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  const signup = async (email: string, password: string, name: string) => {
    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, username: name }),
    });

    if (!response.ok) {
      throw new Error('Signup failed');
    }

    const { token, user } = await response.json();
    localStorage.setItem('authToken', token);
    setUser(user);
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

      const { token, user: userData } = await response.json();
      localStorage.setItem('authToken', token);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  const completeOnboarding = () => {
    setNeedsOnboarding(false);
  };

  return (
<<<<<<< HEAD
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        signup,
        signInWithGoogle
      }}
    >
=======
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
>>>>>>> 9aeb743d5d6375eb97cffb1ce803134c289ae6d4
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