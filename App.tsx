import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from './navigation/TabNavigator';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import i18next from "i18next";
import * as Localization from "expo-localization";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import InitialStack from "./components/InitialStack";

type RootStackParamList = {
  Landing: undefined;
  Home: undefined;
  Login: undefined;
  SignUpProfil: undefined;
  SignUpAccount: undefined;
  TabNavigator: undefined;
  SignUp: undefined;
  InitialStack: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();


i18next.changeLanguage(Localization.getLocales()[0].languageCode!)


export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        console.log('user', user);
        if (user.emailVerified) {
          setUser(user)
        }
      }
    });
  }, [])

  return (
    <SafeAreaView style={styles.safeContainer}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="InitialStack" screenOptions={{ headerShown: false, animation: 'none'}}>
          {!user ? (
              <Stack.Screen name="InitialStack" component={InitialStack}/>
          ) : (
              <Stack.Screen name="TabNavigator" component={TabNavigator}/>
          )}
        </Stack.Navigator>
        <StatusBar hidden={true}/>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
      safeContainer: {
        flex: 1,
        backgroundColor: 'white'
      }
})