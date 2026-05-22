import Button from '@/components/Button';
import Input from '@/components/Input';
import Logo from '@/components/logo';
import { borderRadius, colors, fontSize, spacing } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { StatusBar } from 'expo-status-bar';
import {
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
            <TouchableOpacity style={styles.signOutButton}>
              <Text style={styles.signOutText}>Sair</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <Logo />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.title}>Novo pedido</Text>
            <Input placeholder="Numero da mesa..." style={styles.input} />
            <Button title="Abrir mesa" onPress={() => {}} />
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
    marginHorizontal: 'auto'
  },
  input: {},
  fieldContainer: {
    flex: 1,
    padding: spacing.lg,
    flexDirection: 'column',
    gap: spacing.lg,
  },
});
