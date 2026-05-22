import { StyleSheet, Text, View } from 'react-native';

const Order = () => {
  return (
    <View style={styles.container}>
      <Text>Pagina Order</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Order;
