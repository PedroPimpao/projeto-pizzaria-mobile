import { token_key, user_key } from '@/constants/keys';
import api from '@/services/api';
import { LoginResponse, User } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextData {
  user: User | null;
  signed: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadData = async () => {
      await loadStorageData();
    };
    loadData();
  }, []);

  const loadStorageData = async () => {
    try {
      const storedToken = await AsyncStorage.getItem(token_key);
      const storedUser = await AsyncStorage.getItem(user_key);

      if (storedToken && storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post<LoginResponse>('/session', {
        email: email,
        password: password,
      });
      console.log(response.data);
      const { token, ...userData } = response.data;

      await AsyncStorage.setItem(token_key, token);
      await AsyncStorage.setItem(user_key, JSON.stringify(userData));
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    await AsyncStorage.multiRemove([token_key, user_key]);
    setUser(null);
  };

  return (
    <AuthContext
      value={{
        user,
        signed: !!user,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Contexto não foi encontrado');
  }
  return context;
};
