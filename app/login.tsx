import Button from '@/components/Button';
import Input from '@/components/Input';
import Logo from '@/components/logo';
import { colors, spacing } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useRouter } from 'expo-router'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter()

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Atenção!', 'Preencha os dados corretamente');
      return;
    }
    try {
      setLoading(true);
      await signIn(email, password);
      setEmail('')
      setPassword('')
      router.replace('/(authenticated)/dashboard')
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Erro ao fazer o login');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (email: string) => {
    setEmail(email);
  };

  const handlePasswordChange = (password: string) => {
    setPassword(password);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: 'height' })}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
      >
        <Logo />
        <View style={styles.formContainer}>
          <Input
            label="Email"
            placeholder="Digite seu email"
            keyboardType="email-address"
            onChangeText={handleEmailChange}
            value={email}
          />
          <Input
            label="Senha"
            placeholder="Digite sua senha"
            secureTextEntry={true}
            onChangeText={handlePasswordChange}
            value={password}
          />
          <Button title="Entrar" onPress={handleLogin} loading={loading} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scrollContent: {
    justifyContent: 'center',
    flexGrow: 1,
    height: '100%',
    paddingHorizontal: spacing.xl,
  },
  formContainer: {
    gap: spacing.md,
  },
});
