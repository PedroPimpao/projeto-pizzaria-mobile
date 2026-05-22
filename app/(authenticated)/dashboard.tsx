import Button from '@/components/Button';
import Input from '@/components/Input';
import Logo from '@/components/logo';
import { borderRadius, colors, fontSize, spacing } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/services/api';
import { Order } from '@/types';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Dashboard() {
  const { signOut } = useAuth();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [tableNumber, setTableNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOpenTable = async () => {
    if (!tableNumber) {
      Alert.alert('Atenção', 'Digite um número de mesa válido');
      setTableNumber('');
      return;
    }

    const tableNum = parseInt(tableNumber);
    if (isNaN(tableNum) || tableNum < 0) {
      Alert.alert('Atenção', 'Digite um número de mesa válido');
      setTableNumber('');
      return;
    }

    try {
      setLoading(true);

      const response = await api.post<Order>('/order', {
        table: tableNum,
      });
      console.log(response.data);
      Alert.alert(
        'Mesa aberta',
        `Mesa de número ${tableNumber} aberta com sucesso!`,
      );
      const { table, id } = response.data;
      router.push({
        pathname: '/(authenticated)/order',
        params: { table: table.toString(), order_id: id },
      });
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Falha ao abrir mesa, tente mais tarde');
    } finally {
      setTableNumber('');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={colors.background} />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.select({ ios: 'padding', android: 'height' })}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.header, { paddingTop: insets.top + 24 }]}>
            <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
              <Text style={styles.signOutText}>Sair</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <Logo />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.title}>Novo pedido</Text>
            <Input
              placeholder="Numero da mesa..."
              style={styles.input}
              value={tableNumber}
              onChangeText={setTableNumber}
              keyboardType="decimal-pad"
            />
            <Button
              title="Abrir mesa"
              onPress={handleOpenTable}
              loading={loading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  signOutButton: {
    backgroundColor: colors.red,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
  },
  signOutText: {
    color: colors.primary,
    fontSize: fontSize.md,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  title: {
    color: colors.primary,
    fontSize: fontSize.xl,
    fontWeight: '400',
    marginHorizontal: 'auto',
  },
  input: {},
  fieldContainer: {
    flex: 1,
    padding: spacing.lg,
    flexDirection: 'column',
    gap: spacing.lg,
  },
});
