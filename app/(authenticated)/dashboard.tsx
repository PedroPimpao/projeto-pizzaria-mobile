import { useAuth } from '@/contexts/AuthContext';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Dashboard() {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text>Dashboard Teste</Text>
      <Button title="Sair" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    color: '#FFF',
    height: '100%',
  },
});
