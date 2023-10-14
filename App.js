import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Navigation from './src/navigation'
import { UsersProvider } from './src/context/UsersContext';

export default function App() {
  return (
    <UsersProvider>
      <SafeAreaView style={styles.container}>
        <Navigation />
      </SafeAreaView>
    </UsersProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
