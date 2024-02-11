import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';


export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECDEEA',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
