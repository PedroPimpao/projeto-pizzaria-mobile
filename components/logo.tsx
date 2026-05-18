import { colors, fontSize, spacing } from '@/constants/theme';
import { StyleSheet, Text, View } from 'react-native';

const Logo = () => {
  return (
    <View style={styles.logoContainer}>
      <Text style={styles.logoText}>
        Sujeito<Text style={styles.logoBrand}>Pizzaria</Text>
      </Text>
      <Text style={styles.logoSubtitle}>Garçom App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  logoBrand: {
    color: colors.brand,
  },
  logoSubtitle: {
    color: colors.primary,
    fontSize: fontSize.lg,
  },
});
export default Logo;
