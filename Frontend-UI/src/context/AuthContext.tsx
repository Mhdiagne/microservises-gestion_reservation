import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { toast } from 'sonner';

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'ADMIN' | 'MANAGER' | 'EMPLOYEE';
  department: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: {
    email: string;
    password: string;
    name: string;
    role: string;
    department: string;
  }) => Promise<void>;
  logout: () => void;
  loading: boolean;
 
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.post('/auth/validate', {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setUser(response.data.data);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        localStorage.removeItem('token');
        setUser(null);
        navigate('/connexion'); 
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);



  const login = async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);

    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token);
      setUser(response.data.data.user);
      navigate('/espace-entreprise'); // <-- Bon chemin
    } else {
      throw new Error(response.data.message);
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    name: string;
    role: string;
    department: string;
  }) => {
    const response = await api.post('/auth/register', userData);

    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token);
      setUser(response.data.data.user);
      navigate('/espace-entreprise'); // <-- Bon chemin
    } else {
      throw new Error(response.data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Vous avez été déconnecté avec succès.');
    navigate('/connexion'); // <-- Bon chemin
  };

  
  const value: AuthContextType = {
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      loading: false
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
