import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from './navigation/TabNavigator';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import LandingScreen from "./screens/LandingScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import i18next from "i18next";
import * as Localization from "expo-localization";
import ProfilDataScreen from "./screens/registration/ProfilDataScreen";

type RootStackParamList = {
  Landing: undefined;
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  TabNavigator: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();


i18next.changeLanguage(Localization.getLocales()[0].languageCode!)


export default function App() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false, animation: 'none'}}>
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="SignUp" component={ProfilDataScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
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