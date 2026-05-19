import { Alert } from 'react-native';

interface signInProps {
  email: string;
  password: string;
}

interface signUpProps {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const handleSignIn = ({ email, password }: signInProps) => {
  Alert.alert('Login', `Bem vindo, ${email}`);
  const data = {
    email,
    password,
  };
  console.log(`Dados do login: `, data);
};

export const handleSignUp = ({
  username,
  email,
  password,
  confirmPassword,
}: signUpProps) => {
  Alert.alert('Cadastro', `Bem vindo, ${email}`);
  const data = {
    username,
    email,
    password,
    confirmPassword,
  };
  console.log(`Dados do cadastro: `, data);
};
