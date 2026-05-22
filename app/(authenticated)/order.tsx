import Loading from '@/components/Loading';
import { borderRadius, colors, fontSize, spacing } from '@/constants/theme';
import api from '@/services/api';
import { Category } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Order = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { order_id, table } = useLocalSearchParams<{
    order_id: string;
    table: string;
  }>();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadinCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    loadCategories();
    const loadDataCategories = async () => {
      await loadCategories;
    };
    loadDataCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await api.get<Category[]>('/category');
      console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCategories(false);
    }
  };

  if (loadinCategories) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 24 }]}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Pagina Order - Mesa {table}</Text>
          <Pressable style={styles.closeButton} onPress={() => {router.back()}}>
            <Ionicons name="trash" size={24} color={colors.primary} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.primary,
    fontSize: fontSize.lg,
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: colors.red,
    padding: spacing.sm,
    borderRadius: borderRadius.md
  },
});
export default Order;
