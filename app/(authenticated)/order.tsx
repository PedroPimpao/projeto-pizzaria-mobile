import Button from '@/components/Button';
import Loading from '@/components/Loading';
import { OrderItem } from '@/components/OrderItem';
import { QuantityControl } from '@/components/QuantityControl';
import Select from '@/components/Select';
import { borderRadius, colors, fontSize, spacing } from '@/constants/theme';
import api from '@/services/api';
import { Category, Item, Product } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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

  const [quantity, setQuantity] = useState(1);

  const [loadingAddItem, setLoadingAddItem] = useState(false);

  const [items, setItems] = useState<Item[]>([]);

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

      console.log(response.data);
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleAddItem = async () => {
    try {
      setLoadingAddItem(true);

      const response = await api.post<Item>('/order/add', {
        order_id: order_id,
        product_id: selectedProduct,
        amount: quantity,
      });

      console.log(response.data);
      setItems([...items, response.data]);

      setSelectedCategory('');
      setSelectedProduct('');
      setQuantity(1);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingAddItem(false);
    }
  };

  const handleRemoveItem = async (item_id: string) => {
    try {
      await api.delete('/order/remove', {
        params: { item_id: item_id },
      });

      const updateditems = items.filter(item => item.id !== item_id);
      setItems(updateditems);

      Alert.alert('Item removido', 'Seu item foi removido da mesa!');
    } catch (err) {
      console.log(err);
      Alert.alert('Atenção', 'Erro ao remover item da mesa.');
    }
  };

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

        {selectedProduct && (
          <View style={styles.quantitySection}>
            <Text style={styles.quantityLabel}>Quantidade</Text>
            <QuantityControl
              quantity={quantity}
              onIncrement={() => setQuantity(quantity => quantity + 1)}
              onDecrement={() => {
                if (quantity <= 1) {
                  setQuantity(1);
                  return;
                }

                setQuantity(quantity => quantity - 1);
              }}
            />
          </View>
        )}

        {selectedProduct && (
          <Button
            title="Adicionar"
            onPress={handleAddItem}
            variant="secondary"
          />
        )}

        {items.length > 0 && (
          <View style={styles.itemsSection}>
            <Text style={styles.itemsTitle}>Itens adicionados</Text>
            {items.map(item => (
              <OrderItem
                item={item}
                key={item.id}
                onRemove={handleRemoveItem}
              />
            ))}
          </View>
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
    gap: 14,
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  quantityLabel: {
    color: colors.primary,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
  },
  itemsSection: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  itemsTitle: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: fontSize.lg,
  },
});
export default Order;
