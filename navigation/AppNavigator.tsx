import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import { TouchableOpacity, View, StyleSheet, Image, Text } from 'react-native';
import DiaryScreen from '../screens/DiaryScreen';
import ChatsScreen from '../screens/ChatsScreen';
import ProfilScreen from '../screens/ProfilScreen';
import { useIsFocused } from '@react-navigation/native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

//Bottom Navigation Bar
const AppNavigator: React.FC = () => {
    return(
        <Tab.Navigator 
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#ECDEEA',
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    height: 88,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarIcon: ({ focused }) => {
                    let iconName: string = '../assets/icons/home_solid.png';

                    if (route.name === 'Home') {
                        if (focused) {
                            return <View><Image source={require('../assets/icons/home_solid.png')} resizeMode='contain' style={{width: 30, height: 30, tintColor: '#374957'}}/></View>
                        } else {
                            return <View><Image source={require('../assets/icons/home.png')} resizeMode='contain' style={{width: 30, height: 30, tintColor: '#374957'}}/></View>
                        }
                    }
                    if (route.name === 'Explore') {
                        if (focused) {
                            return <View><Image source={require('../assets/icons/apps_solid.png')} resizeMode='contain' style={{width: 30, height: 30, tintColor: '#374957'}}/></View>
                        } else {
                            return <View><Image source={require('../assets/icons/apps.png')} resizeMode='contain' style={{width: 30, height: 30, tintColor: '#374957'}}/></View>
                        }
                    }
                    if (route.name === 'Diary') {
                        if (focused) {
                            return <View><Image source={require('../assets/icons/book_solid.png')} resizeMode='contain' style={{width: 30, height: 30, tintColor: '#374957'}}/></View>
                        } else {
                            return <View><Image source={require('../assets/icons/book.png')} resizeMode='contain' style={{width: 30, height: 30, tintColor: '#374957'}}/></View>
                        }
                    }
                    if (route.name === 'Chats') {
                        if (focused) {
                            return <View><Image source={require('../assets/icons/chats_solid.png')} resizeMode='contain' style={{width: 30, height: 30, tintColor: '#374957'}}/></View>
                        } else {
                            return <View><Image source={require('../assets/icons/chats.png')} resizeMode='contain' style={{width: 30, height: 30, tintColor: '#374957'}}/></View>
                        }
                    }
                    if (route.name === 'Profil') {
                        if (focused) {
                            return <View><Image source={require('../assets/icons/user_solid.png')} resizeMode='contain' style={{width: 30, height: 30, tintColor: '#374957'}}/></View>
                        } else {
                            return <View><Image source={require('../assets/icons/user.png')} resizeMode='contain' style={{width: 30, height: 30, tintColor: '#374957'}}/></View>
                        }
                    }

                },
                tabBarButton: (props) => (<TabButton {...props} label={route.name.toUpperCase()}/>),             
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen}
            />
            <Tab.Screen name="Explore" component={ExploreScreen}
            />
            <Tab.Screen name="Diary" component={DiaryScreen}
            />
            <Tab.Screen name="Chats" component={ChatsScreen}
            />
            <Tab.Screen name="Profil" component={ProfilScreen}
            />
        </Tab.Navigator>
    )
}

interface TabBarButtonProps extends BottomTabBarButtonProps {
    label: string
}

const TabButton: React.FC<TabBarButtonProps> = ({children, onPress, label}) => {
    return <TouchableOpacity
        onPress={onPress}
        activeOpacity={100}
        style={{
            margin: 3.5,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}>
        <View style={{
            width: 65,
            height: 50,
            backgroundColor: useIsFocused() ? '#fff': '#ECDEEA',
            borderRadius: 35,
        }}>
            {children}
        </View>
        <Text style={{fontSize: 11, marginTop: 4 }}>{label}</Text>
    </TouchableOpacity>;
}

export default AppNavigator