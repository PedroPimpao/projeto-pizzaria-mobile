import { colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

function RootLayoutNav() {
  const { loading, signed } = useAuth();

  // Não renderiza nada enquanto está carregando
  if (loading) {
    return null;
  }

  // Define a rota inicial baseada no estado de autenticação
  const initialRoute = signed ? '(authenticated)/dashboard' : 'login';

  return (
    <>
      <StatusBar style="light" backgroundColor={colors.background} />
      <Stack screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="(authenticated)" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
