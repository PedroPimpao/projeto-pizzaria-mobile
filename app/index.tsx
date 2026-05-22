import { colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function Index() {
  const { signed } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(signed){
        router.replace('/(authenticated)/dashboard')
    } else{
        router.replace('/login')
    }
  }, [signed]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={colors.brand} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
