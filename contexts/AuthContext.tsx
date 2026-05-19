import { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextData {
  signed: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    Alert.alert('Login', `Bem vindo, ${email}`);
      const data = {
        email,
        password,
      };
      console.log(`Dados do login: `, data);
  };

  return (
    <AuthContext
      value={{
        signed,
        loading,
        signIn,
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
