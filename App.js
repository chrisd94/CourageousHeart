import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container_top}>
      <View style={styles.container_pink}>
        <Text>Open up App.js start to working on your app!</Text>
        <StatusBar style="auto" />
      </View>
      <View style={styles.container_white}>
        <Text>Open up App.js start to working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </View>
  
  );
}

const styles = StyleSheet.create({
  container_white: {
    width: '97%',
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 50,
  },
  container_pink: {
    width: '100%',
    flex: 1,
    backgroundColor: '#ECDEEA',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 50,
  },
  container_top: {
    width: '100%',
    flex: 1,
    backgroundColor: '#ECDEEA',
    alignItems: 'left',
    justifyContent: 'center',
  },
});
