import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "../screens/LandingScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfilDataScreen from "../screens/registration/ProfilDataScreen";
import AccountDataScreen from "../screens/registration/AccountDataScreen";
import SignUpScreen from "../screens/SignUpScreen";

const Stack = createNativeStackNavigator(); 

function InitialStack() {
    return(
        <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false, animation: 'none'}}>
            <Stack.Screen name="Landing" component={LandingScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="SignUpProfil" component={ProfilDataScreen}/>
            <Stack.Screen name="SignUpAccount" component={AccountDataScreen} options={{contentStyle: {backgroundColor: 'white'}}}/>
            <Stack.Screen name="SignUp" component={SignUpScreen}/>
        </Stack.Navigator>
    );
}

export default InitialStack