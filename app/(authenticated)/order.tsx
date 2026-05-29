import Loading from '@/components/Loading';
import Select from '@/components/Select';
import { borderRadius, colors, fontSize, spacing } from '@/constants/theme';
import api from '@/services/api';
import { Category, Product } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Order = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { order_id, table } = useLocalSearchParams<{
    order_id: string;
    table: string;
  }>();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');

  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);


  useEffect(() => {
    loadCategories();
    const loadDataCategories = async () => {
      await loadCategories;
    };
    loadDataCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      loadProducts(selectedCategory);
    } else {
      setProducts([]);
      setSelectedCategory('');
    }
  }, [selectedCategory]);

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

  const loadProducts = async (categoryId: string) => {
    try {
      setLoadingProducts(true);

      const response = await api.get<Product[]>('/category/products', {
        params: { category_id: categoryId },
      });

      console.log(response.data)
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingProducts(false);
    }
  }


  if (loadingCategories) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 24 }]}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Pagina Order - Mesa {table}</Text>
          <Pressable
            style={styles.closeButton}
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons name="trash" size={24} color={colors.primary} />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.scrollContent}>
        <Select
          label="Categorias"
          placeholder="Selecione a categoria..."
          options={categories.map(cat => ({
            label: cat.name,
            value: cat.id,
          }))}
          selectedValue={selectedCategory}
          onValueChange={setSelectedCategory}
        />

        {loadingProducts ? (
          <ActivityIndicator size="small" color={colors.brand} />
        ) : (
          selectedCategory && (
            <Select
              placeholder="Selecione um produto..."
              options={products.map(product => ({
                label: product.name,
                value: product.id,
              }))}
              selectedValue={selectedProduct}
              onValueChange={setSelectedProduct}
            />
          )
        )}
      </ScrollView>
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
    borderRadius: borderRadius.md,
  },
  scrollContent: {
    padding: spacing.lg,
    gap: 14
  },
});
export default Order;
